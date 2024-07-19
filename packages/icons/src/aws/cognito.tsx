import type { SVGProps } from 'react'
const SvgCognito = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80" {...props}>
    <defs>
      <linearGradient id="a" x1="0%" x2="100%" y1="100%" y2="0%">
        <stop offset="0%" stopColor="#BD0816" />
        <stop offset="100%" stopColor="#FF5252" />
      </linearGradient>
    </defs>
    <g fill="none" fillRule="evenodd">
      <path fill="url(#a)" d="M0 0h80v80H0z" />
      <path
        fill="#FFF"
        d="M16.964 35.808h12.905v-1.983H16.964zM61.376 50.23l1.403 1.402-7.372 7.36a.994.994 0 0 1-1.403 0l-3.71-3.702L51.7 53.89l3.006 3.001zm4.568 5.463a9.44 9.44 0 0 1-2.197 5.015 9.55 9.55 0 0 1-3.143 2.406 9.37 9.37 0 0 1-5.158.833 9.4 9.4 0 0 1-4.706-1.966 9.43 9.43 0 0 1-3.518-8.573 9.47 9.47 0 0 1 5.058-7.282 9.34 9.34 0 0 1 5.441-.972 9.43 9.43 0 0 1 7.26 5.088 9.45 9.45 0 0 1 .963 5.45m.806-6.35a11.406 11.406 0 0 0-15.381-4.978 11.45 11.45 0 0 0-6.118 8.805 11.4 11.4 0 0 0 4.254 10.364A11.38 11.38 0 0 0 56.592 66c1.68 0 3.338-.37 4.864-1.094a11.5 11.5 0 0 0 3.801-2.91 11.4 11.4 0 0 0 2.659-6.064 11.4 11.4 0 0 0-1.166-6.588m-39.86-7.588h3.972v-1.983H26.89zm-9.926 0h7.941v-1.983h-7.941zm-.858-25.773h44.402c1.17 0 2.12 1.156 2.12 2.578v7.334H59.65V20.94a.99.99 0 0 0-.993-.991H35.825a.99.99 0 0 0-.993.99v4.957H13.985v-7.334c0-1.398.972-2.578 2.12-2.578m31.15 9.625c2.305 0 4.18 1.853 4.18 4.131a4.11 4.11 0 0 1-2.163 3.608 4.25 4.25 0 0 1-4.043 0 4.11 4.11 0 0 1-2.154-3.608c0-2.278 1.874-4.131 4.18-4.131m-33.27 21.5v-19.23h20.846v16.851c0 .549.444.992.993.992h10.378v-1.983h-8.291a9.02 9.02 0 0 1 6.522-8.488c1.755.82 3.85.828 5.633-.001a9.1 9.1 0 0 1 5.226 4.005l1.699-1.027a11.1 11.1 0 0 0-5.147-4.432 6.05 6.05 0 0 0 1.577-4.056c0-3.37-2.767-6.114-6.166-6.114s-6.166 2.743-6.166 6.114c0 1.518.578 2.944 1.564 4.045a11 11 0 0 0-5.836 5.789V21.93h20.847v15.86h1.985v-9.912h2.978l.001 14.869h1.986l-.001-24.186c0-2.515-1.842-4.561-4.106-4.561H16.106C13.84 14 12 16.046 12 18.56v28.548c0 2.515 1.841 4.56 4.106 4.56h26.668v-1.982H16.106c-1.149 0-2.12-1.18-2.12-2.578"
      />
    </g>
  </svg>
)
export default SvgCognito