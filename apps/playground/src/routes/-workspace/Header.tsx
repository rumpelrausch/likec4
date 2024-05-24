import {
  Anchor,
  Box,
  Button,
  Divider,
  Group,
  Menu,
  MenuDivider,
  MenuDropdown,
  MenuItem,
  MenuLabel,
  MenuTarget,
  Popover,
  PopoverDropdown,
  PopoverTarget,
  Text,
  ThemeIcon,
  Title
} from '@mantine/core'
import { IconAlertCircle, IconChevronDown, IconShare } from '@tabler/icons-react'
import { Link, useLoaderData } from '@tanstack/react-router'
import { nanoid } from 'nanoid'
import { ColorSchemeToggle } from '../../components/ColorSchemeToggle'
import { Logo } from '../../components/Logo'
import { useWorkspaceState } from '../../state'

export function Header() {
  const { isCustom, title } = useLoaderData({
    from: '/w/$id'
  })
  const isModified = useWorkspaceState(s => s.isModified())

  const isShareable = isCustom || isModified
  return (
    <Group h="100%" px="md" justify="space-between" align="stretch">
      <Group gap={'lg'} align="center" visibleFrom="sm">
        <a href="https://likec4.dev/" target="_blank">
          <Logo
            style={{
              height: 20
            }} />
        </a>
        <Box fz={'sm'} fw={500} visibleFrom="md">{title}</Box>
      </Group>

      <Group h="100%" gap={4}>
        {isShareable && (
          <Popover position="bottom" withArrow shadow="md" closeOnClickOutside>
            <PopoverTarget>
              <Button
                visibleFrom="md"
                leftSection={<IconShare size={14} />}
                size="xs">
                Share
              </Button>
            </PopoverTarget>
            <PopoverDropdown p={'xs'}>
              <Group>
                <ThemeIcon color="orange" variant="light">
                  <IconAlertCircle size={14} />
                </ThemeIcon>
                <Text c="orange" size="sm">In progress...</Text>
              </Group>
            </PopoverDropdown>
          </Popover>
        )}
        <PlaygroundsMenu />
        <Button
          component="a"
          href="https://docs.likec4.dev/"
          target="_blank"
          variant="subtle"
          px={'xs'}
          size="xs"
          color="gray">
          Docs
        </Button>
        <Button
          component="a"
          href="https://github.com/likec4/likec4"
          target="_blank"
          variant="subtle"
          px={'xs'}
          size="xs"
          visibleFrom="md"
          color="gray">
          GitHub
        </Button>
        {import.meta.env.DEV && <ColorSchemeToggle />}

        {
          /* <ActionIcon
          component="a"
          href="https://github.com/likec4/likec4"
          target="_blank"
          variant="light"
          color="gray"
          radius={'sm'}
          size="md">
          <IconBrandGithubFilled size={16} />
        </ActionIcon> */
        }
      </Group>
    </Group>
  )
}

function PlaygroundsMenu() {
  return (
    <Menu shadow="md" width={160} trigger="click-hover" openDelay={200}>
      <MenuTarget>
        <Button
          variant="subtle"
          px={'xs'}
          size="xs"
          color="gray"
          rightSection={<IconChevronDown opacity={0.5} size={14} />}>
          Playgrounds
        </Button>
      </MenuTarget>

      <MenuDropdown>
        <MenuItem component={Link} to={'/w/$id/'} params={{ id: nanoid(6) }}>New blank...</MenuItem>
        <MenuDivider />
        <MenuLabel>Examples</MenuLabel>
        <MenuItem component={Link} to={'/w/$id/'} params={{ id: 'tutorial' }}>Tutorial</MenuItem>
        <MenuItem component={Link} to={'/w/$id/'} params={{ id: 'bigbank' }}>BigBank</MenuItem>
      </MenuDropdown>
    </Menu>
  )
}
