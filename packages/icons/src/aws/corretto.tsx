import type { SVGProps } from 'react'
const SvgCorretto = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80" {...props}>
    <defs>
      <linearGradient id="a" x1="0%" x2="100%" y1="100%" y2="0%">
        <stop offset="0%" stopColor="#2E27AD" />
        <stop offset="100%" stopColor="#527FFF" />
      </linearGradient>
    </defs>
    <g fill="none" fillRule="evenodd">
      <path fill="url(#a)" d="M0 0h80v80H0z" />
      <path
        fill="#FFF"
        d="M33.066 19h5v-5h-5zm-2 1v-7a1 1 0 0 1 1-1h7a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1h-7a1 1 0 0 1-1-1m14 5h5v-5h-5zm-2 1v-7a1 1 0 0 1 1-1h7a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1h-7a1 1 0 0 1-1-1m-12 4h5v-5h-5zm-2 1v-7a1 1 0 0 1 1-1h7a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1h-7a1 1 0 0 1-1-1m8 15h20v-2h-20zm-16.907 2h3.647a20.8 20.8 0 0 1-1.135-6.739v-7.197h-2.512c-3.454 0-6.159 3.048-6.159 6.939C14 44.861 16.762 48 20.159 48m0 2C15.66 50 12 45.964 12 41.003c0-4.929 3.66-8.939 8.159-8.939h2.512V30a1 1 0 0 1 1-1h3.395v2h-2.395v10.261c0 .933.091 1.843.222 2.739h9.173v2h-8.77c2.113 8.135 9.497 14.169 18.284 14.169 10.366 0 18.486-8.306 18.486-18.908v-1.282h-33.71v-2h33.71V31h-22v-2h23a1 1 0 0 1 1 1v11.261c0 11.724-8.999 20.908-20.486 20.908-8.408 0-15.652-4.998-18.969-12.169zM68 59.412c0 5.594-12.582 8.612-24.42 8.612s-24.421-3.018-24.421-8.612c0-1.508.975-3.708 5.624-5.628l.763 1.849c-2.788 1.151-4.387 2.529-4.387 3.779 0 3.128 9.208 6.612 22.421 6.612S66 62.54 66 59.412c0-1.25-1.599-2.628-4.387-3.779l.764-1.849c4.647 1.92 5.623 4.12 5.623 5.628"
      />
    </g>
  </svg>
)
export default SvgCorretto