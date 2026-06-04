export default function LogoHero({ fill = '#ffffff', style, ...props }) {
  return (
    <svg
      viewBox="0 600 3000 800"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Lumense"
      role="img"
      style={{ fillRule: 'evenodd', clipRule: 'evenodd', display: 'block', ...style }}
      {...props}
    >
      <g transform="matrix(1.425188,0,0,1.425188,-775.537198,-464.737352)">
        <g transform="matrix(0.621821,0,0,0.621821,50.666073,519.411647)">
          <path
            fill={fill}
            d="M1300,693L1300,444L1549,444L1549,693L1300,693ZM802,942L802,444L1051,444L1051,693L1300,693L1300,942L1549,942L1549,1191L1051,1191L1051,942L802,942Z"
          />
        </g>
        <g transform="matrix(7.25319,0,0,7.25319,-8406.19993,-5776.475757)">
          <text
            x="1322.688"
            y="955.401"
            fill={fill}
            style={{ fontFamily: "'Outfit', sans-serif", fontWeight: 600, fontSize: '50px' }}
          >
            Lumense
          </text>
        </g>
      </g>
    </svg>
  )
}
