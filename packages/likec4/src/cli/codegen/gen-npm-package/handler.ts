import { type DiagramView, invariant } from '@likec4/core'
import { generateViewsDataDTs, generateViewsDataJs } from '@likec4/generators'
import { CompositeGeneratorNode, toString } from 'langium/generate'
import { existsSync } from 'node:fs'
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { dirname, relative, resolve } from 'node:path'
import { cwd as cwdFn } from 'node:process'
import k from 'picocolors'
import { pkgUpSync } from 'pkg-up'
import prompts from 'prompts'
import { isString } from 'remeda'
import { LanguageServices } from '../../../language-services'
import { createLikeC4Logger, startTimer } from '../../../logger'
import { writePackageJson } from './packageJson'

type HandlerParams = {
  /**
   * The directory where c4 files are located.
   */
  path: string
  useDotBin: boolean
  pkgName?: string | undefined
  pkgOutDir?: string | undefined
}

async function resolvePkgOutDir() {
  const cwd = cwdFn()
  let pkgOutDir = pkgUpSync()
  if (pkgOutDir) {
    pkgOutDir = resolve(dirname(pkgOutDir), '.likec4')
  } else {
    pkgOutDir = resolve(cwd, '.likec4')
  }
  const pkgJsonPath = resolve(pkgOutDir, 'package.json')
  if (existsSync(pkgJsonPath)) {
    return {
      pkgOutDir
    }
  }
  const cwdRelative = relative(cwd, pkgOutDir)
  if (existsSync(pkgOutDir)) {
    const response = await prompts({
      type: 'confirm',
      name: 'confirm',
      message: 'Use this path as output?\n - ' + cwdRelative
    })
    if (response.confirm === true) {
      return {
        pkgOutDir
      }
    }
    if (response.confirm !== false) {
      throw new Error(`unexpected response: ${response.confirm}`)
    }
  }
  const { outDir } = await prompts({
    type: 'text',
    name: 'outDir',
    initial: cwdRelative,
    message: 'Enter output path'
  })
  invariant(isString(outDir), 'expected string')
  return {
    pkgOutDir: outDir
  }
}

export async function handler({ path, useDotBin, ...outparams }: HandlerParams) {
  const cwd = cwdFn()
  const logger = createLikeC4Logger('c4:gen')
  const timer = startTimer(logger)

  const languageServices = await LanguageServices.get({ path, useDotBin })

  const diagrams = [...await languageServices.views.diagrams()]
  if (diagrams.length === 0) {
    logger.warn('no views found')
    process.exitCode = 1
    throw new Error('no views found')
  }

  let { pkgName, pkgOutDir } = outparams

  if (!pkgOutDir) {
    const found = await resolvePkgOutDir()
    pkgOutDir = found.pkgOutDir
  }

  pkgOutDir = resolve(cwd, pkgOutDir)
  if (!existsSync(pkgOutDir)) {
    logger.info(`${k.dim('mk package dir')} ${relative(cwd, pkgOutDir)}`)
    await mkdir(pkgOutDir, { recursive: true })
  } else {
    logger.info(`${k.dim('package dir')} ${relative(cwd, pkgOutDir)}`)
  }

  const pkgJsonPath = resolve(pkgOutDir, 'package.json')
  let isNewPackage = true
  if (existsSync(pkgJsonPath)) {
    isNewPackage = false
    logger.info(`${k.dim('found package.json')} ${relative(cwd, pkgJsonPath)}`)
    const pkgJsonString = await readFile(pkgJsonPath, { encoding: 'utf-8' })
    const pkgJson = JSON.parse(pkgJsonString)
    if (pkgName && pkgName !== pkgJson.name) {
      logger.warn(`${k.dim('package names are different')} ${pkgName} ${k.dim('!==')} ${pkgJson.name}`)
    } else {
      logger.info(`${k.dim('package name')} ${pkgJson.name}`)
    }
    pkgName = pkgJson.name
  }

  if (!pkgName) {
    const { name } = await prompts({
      type: 'text',
      name: 'name',
      initial: '@likec4/views',
      message: 'Enter the package name'
    })
    invariant(isString(name), 'expected string')
    pkgName = name
  }

  await writePackageJson({ pkgName, pkgJsonPath })
  logger.info(`${k.dim('wrote package.json')} ${relative(cwd, pkgJsonPath)}`)

  const viewsJs = resolve(pkgOutDir, 'views.js')
  await writeViewsJs(diagrams, viewsJs)
  logger.info(`${k.dim('write')} ${relative(cwd, viewsJs)}`)

  const viewsDts = resolve(pkgOutDir, 'views.d.ts')
  await writeViewsDTs(diagrams, viewsDts)
  logger.info(`${k.dim('write')} ${relative(cwd, viewsDts)}`)

  const index = generateIndex()

  const indexJs = resolve(pkgOutDir, 'index.js')
  await writeFile(indexJs, index.js)
  logger.info(`${k.dim('write')} ${relative(cwd, indexJs)}`)

  const indexDts = resolve(pkgOutDir, 'index.d.ts')
  await writeFile(indexDts, index.dts)
  logger.info(`${k.dim('write')} ${relative(cwd, indexDts)}`)

  let pkgUp = pkgUpSync()
  if (pkgUp && existsSync(pkgUp)) {
    const relativePkgUp = relative(cwd, pkgUp)
    logger.info(`${k.dim('found package.json')} ${pkgUp}`)
    const pkgJsonString = await readFile(pkgUp, { encoding: 'utf-8' })
    const pkgJson = JSON.parse(pkgJsonString)
    pkgJson.dependencies ??= {}

    const dependencyFilePath = 'file:' + relative(dirname(pkgUp), pkgOutDir) + '/'

    if (pkgJson.dependencies[pkgName]) {
      logger.info(`${k.dim(`existing dependency`)} "${pkgName}":"${pkgJson.dependencies[pkgName]}"`)
      if (pkgJson.dependencies[pkgName] !== dependencyFilePath) {
        logger.warn(`${k.dim('invalid dependency, should be')} "${pkgName}":"${dependencyFilePath}"`)
        const response = await prompts({
          type: 'confirm',
          name: 'confirm',
          message: `Do you want to change?`
        })
        if (response.confirm === true) {
          pkgJson.dependencies[pkgName] = dependencyFilePath
          await writeFile(pkgUp, JSON.stringify(pkgJson, null, 2))
        }
      }
    } else if (!pkgJson.dependencies[pkgName]) {
      const response = await prompts({
        type: 'confirm',
        name: 'confirm',
        message: `Add ${pkgName} as dependency to ${relativePkgUp}?`
      })
      if (response.confirm === true) {
        pkgJson.dependencies[pkgName] = dependencyFilePath
        await writeFile(pkgUp, JSON.stringify(pkgJson, null, 2))
      }
    }
  } else {
    logger.warn(`no package.json found`)
    logger.info(`To use generated package, add dependency:\n

  "${pkgName}": "file:${pkgOutDir}"

  or

  "${pkgName}": "link:${pkgOutDir}"

`)
  }

  if (isNewPackage) {
    logger.info(`depends on your node package manager, but most probably you need:

  $ cd ${pkgOutDir}
  $ npm install

`)
  }

  timer.stopAndLog()
}

async function writeViewsJs(diagrams: DiagramView[], outfile: string) {
  const generatedSource = generateViewsDataJs([...diagrams])
  await writeFile(outfile, generatedSource)
}
async function writeViewsDTs(diagrams: DiagramView[], outfile: string) {
  const generatedSource = generateViewsDataDTs([...diagrams])
  await writeFile(outfile, generatedSource)
}

function generateIndex() {
  const js = new CompositeGeneratorNode().appendTemplate`
    /******************************************************************************
     * This file was generated
     * DO NOT EDIT MANUALLY!
     ******************************************************************************/
    /* prettier-ignore-start */
    /* eslint-disable */
    import { jsx, Fragment, jsxs } from "react/jsx-runtime";
    import { LikeC4Diagram, useInjectStyles, Styles } from "@likec4/diagram/bundle";
    import { LikeC4Views, isLikeC4ViewId } from "./views";
    function InjectStyles() {
        useInjectStyles();
        return null;
    }
    export function LikeC4View({ viewId, injectStyles = true, ...props }) {
        const view = LikeC4Views[viewId];
        if (!view) {
            throw new Error("Not found view: " + viewId);
        }
        return jsxs(Fragment, { children: [injectStyles === true && jsx(InjectStyles, {}), jsx(LikeC4Diagram, { view: view, ...props })] });
    }
    export { isLikeC4ViewId, LikeC4Views, LikeC4View, useInjectStyles, Styles };
    /* prettier-ignore-end */
  `

  const dts = new CompositeGeneratorNode().appendTemplate`
    /// <reference types="react" />
    import type { LikeC4DiagramProps } from "@likec4/diagram/bundle";
    import type { LikeC4ViewId } from "./views";

    export type LikeC4ViewProps = {
        viewId: LikeC4ViewId;
        /**
         * @default true
         */
        injectStyles?: boolean | undefined;
    } & Omit<LikeC4DiagramProps, "view">;
    export declare function LikeC4View({ viewId, injectStyles, ...props }: LikeC4ViewProps): JSX.Element;

    export * from "./views";
    export { useInjectStyles, Styles } from "@likec4/diagram/bundle";
    export type { LikeC4DiagramProps } from "@likec4/diagram/bundle";
  `
  return {
    js: toString(js),
    dts: toString(dts)
  }
}
