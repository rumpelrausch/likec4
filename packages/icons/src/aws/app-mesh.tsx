import type { SVGProps } from 'react'
const SvgAppMesh = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80" {...props}>
    <defs>
      <linearGradient id="a" x1="0%" x2="100%" y1="100%" y2="0%">
        <stop offset="0%" stopColor="#4D27A8" />
        <stop offset="100%" stopColor="#A166FF" />
      </linearGradient>
    </defs>
    <g fill="none" fillRule="evenodd">
      <path fill="url(#a)" d="M0 0h80v80H0z" />
      <path
        fill="#FFF"
        d="M40.703 16.88a1.103 1.103 0 1 1 0-1.56v.002c.208.208.323.485.323.779s-.115.572-.323.78m2.323-.78c0-.828-.323-1.607-.909-2.193a3.107 3.107 0 0 0-4.387 0 3.08 3.08 0 0 0-.909 2.194c0 .129.022.254.037.38l-5.237 2.88.965 1.752 5.138-2.826.006.008c.605.605 1.4.907 2.194.907s1.589-.302 2.193-.906q.012-.015.023-.03l6.332 3.496.966-1.751-6.446-3.558c.013-.117.034-.232.034-.352m17.498 37.933a1.13 1.13 0 0 1-1.558-.001 1.097 1.097 0 0 1 0-1.558c.208-.208.484-.323.779-.323s.571.115.779.323a1.096 1.096 0 0 1 0 1.559m1.414-2.974a2.9 2.9 0 0 0-.987-.644V47.02h-2v3.27c-.519.13-1.01.378-1.399.768a3.08 3.08 0 0 0-.91 2.195c0 .375.075.736.202 1.078l-6.182 3.108.898 1.787 6.6-3.318a3.074 3.074 0 0 0 3.778-.462c.586-.586.91-1.365.91-2.194 0-.83-.324-1.607-.91-2.193zm-42.615 3.056a1.1 1.1 0 0 1-.323-.78 1.1 1.1 0 0 1 1.102-1.101c.295 0 .572.114.78.322s.323.485.323.78-.115.57-.323.779a1.13 1.13 0 0 1-1.559 0m3.882-.78c0-.828-.323-1.607-.909-2.193a3 3 0 0 0-1.345-.753V47.02h-2v3.454a2.95 2.95 0 0 0-1.042.667A3.08 3.08 0 0 0 17 53.336c0 .829.323 1.608.909 2.193a3.08 3.08 0 0 0 3.782.46l5.141 2.553.889-1.791-4.716-2.342c.126-.34.2-.7.2-1.073m35.746-10.314h2v-5h-2zm-40 0h2v-5h-2zm21.752 21.644a1.103 1.103 0 1 1 0-1.56c.208.209.323.486.323.78s-.115.572-.323.78m6.385-5.43-4.946 2.487q-.012-.016-.025-.03v-.001a3.1 3.1 0 0 0-1.166-.722V54.02h-2v6.932a3.1 3.1 0 0 0-1.221.738q-.008.011-.017.022l-6.409-3.183-.889 1.79 6.442 3.2c-.014.12-.036.24-.036.365 0 .829.323 1.609.909 2.194.605.605 1.4.907 2.194.907s1.589-.302 2.193-.906a3.09 3.09 0 0 0 .909-2.195c0-.12-.021-.234-.034-.351l4.994-2.511zm12.657-32.842c.282 0 .564.107.779.322a1.097 1.097 0 0 1 0 1.56 1.13 1.13 0 0 1-1.558-.001 1.096 1.096 0 0 1 0-1.56c.215-.214.497-.321.779-.321m-8.03 7.337 6.504-3.548q.346.197.732.3v3.539h2v-3.668a3.1 3.1 0 0 0 1.897-2.858c0-.83-.324-1.608-.91-2.194V25.3a3.1 3.1 0 0 0-3.763-.468l-5.235-2.89-.966 1.752 4.879 2.693a3.1 3.1 0 0 0-.211 1.108c0 .4.08.786.223 1.147l-6.107 3.332zm-11.012 6.749a1.13 1.13 0 0 1-1.559 0 1.1 1.1 0 0 1-.323-.78c0-.294.115-.57.323-.78.208-.207.485-.322.78-.322s.571.115.779.323.323.485.323.779-.115.572-.323.78m.773-3.441a3.22 3.22 0 0 0-3.105 0l-6.478-3.534-.957 1.755 6.097 3.327a3.08 3.08 0 0 0 .697 3.307c.347.348.768.59 1.221.739v7.389h2v-7.405a3.1 3.1 0 0 0 1.166-.722 3.09 3.09 0 0 0 .697-3.308l5.389-2.94-.957-1.756zM19.323 26.715c.215-.215.497-.322.779-.322s.565.107.78.322a1.1 1.1 0 0 1 0 1.56 1.13 1.13 0 0 1-1.559-.001 1.1 1.1 0 0 1-.323-.78c0-.294.115-.571.323-.78m8.794-5.426-6.442 3.544a3.1 3.1 0 0 0-3.766.467A3.09 3.09 0 0 0 17 27.495c0 .829.323 1.608.909 2.194.302.302.656.53 1.042.685v3.647h2v-3.556q.355-.1.678-.284l5.796 3.163.957-1.756-5.4-2.946c.144-.361.223-.747.223-1.147 0-.385-.076-.758-.21-1.107l6.085-3.347z"
      />
    </g>
  </svg>
)
export default SvgAppMesh