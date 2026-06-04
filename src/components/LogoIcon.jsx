export default function LogoIcon({ fill = '#ffffff', style, ...props }) {
  return (
    <svg
      viewBox="900 400 1200 1200"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Lumense"
      role="img"
      style={{ fillRule: 'evenodd', clipRule: 'evenodd', display: 'block', ...style }}
      {...props}
    >
      <g transform="matrix(1.451138,0,0,1.451138,-205.812584,-186.305221)">
        <path
          fill={fill}
          d="M1300,693L1300,444L1549,444L1549,693L1300,693ZM802,942L802,444L1051,444L1051,693L1300,693L1300,942L1549,942L1549,1191L1051,1191L1051,942L802,942Z"
        />
      </g>
    </svg>
  )
}
