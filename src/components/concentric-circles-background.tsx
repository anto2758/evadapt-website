const CX = 755.5;
const CY = 914.5;

/** Short solid black rim dashes that travel each circle edge. */
const RIM_DASHES = [
  { r: 517.5, duration: 52, phase: 0, arcDeg: 7.5 },
  { r: 517.5, duration: 52, phase: 180, arcDeg: 7.5 },
  { r: 399.5, duration: 38, phase: 42, arcDeg: 8.5 },
  { r: 399.5, duration: 38, phase: 222, arcDeg: 8.5 },
  { r: 276.5, duration: 29, phase: 95, arcDeg: 10 },
  { r: 153.5, duration: 22, phase: 160, arcDeg: 12 },
] as const;

const CONCENTRIC_CIRCLES_MARKUP = `
<g clip-path="url(#clip0_2003_21)">
<rect width="1512" height="982" fill="#EDEDED"/>
<g filter="url(#filter0_di_2003_21)">
<circle cx="755.5" cy="914.5" r="517.5" fill="url(#paint0_radial_2003_21)"/>
</g>
<g filter="url(#filter1_di_2003_21)">
<circle cx="755.5" cy="914.5" r="399.5" fill="url(#paint1_radial_2003_21)"/>
</g>
<g opacity="0.5" filter="url(#filter2_di_2003_21)">
<circle cx="755.5" cy="914.5" r="276.5" fill="url(#paint2_radial_2003_21)"/>
</g>
<g filter="url(#filter3_di_2003_21)">
<circle cx="755.5" cy="914.5" r="153.5" fill="url(#paint3_linear_2003_21)"/>
</g>
</g>
<defs>
<filter id="filter0_di_2003_21" x="188" y="347" width="1135" height="1135" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset/>
<feGaussianBlur stdDeviation="25"/>
<feComposite in2="hardAlpha" operator="out"/>
<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.01 0"/>
<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_2003_21"/>
<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_2003_21" result="shape"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset dx="1" dy="1"/>
<feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
<feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.85 0"/>
<feBlend mode="normal" in2="shape" result="effect2_innerShadow_2003_21"/>
</filter>
<filter id="filter1_di_2003_21" x="306" y="465" width="899" height="899" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset/>
<feGaussianBlur stdDeviation="25"/>
<feComposite in2="hardAlpha" operator="out"/>
<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.02 0"/>
<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_2003_21"/>
<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_2003_21" result="shape"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset dx="-1" dy="1"/>
<feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
<feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.85 0"/>
<feBlend mode="normal" in2="shape" result="effect2_innerShadow_2003_21"/>
</filter>
<filter id="filter2_di_2003_21" x="429" y="588" width="653" height="653" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset/>
<feGaussianBlur stdDeviation="25"/>
<feComposite in2="hardAlpha" operator="out"/>
<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.04 0"/>
<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_2003_21"/>
<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_2003_21" result="shape"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset dx="1" dy="1"/>
<feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
<feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"/>
<feBlend mode="normal" in2="shape" result="effect2_innerShadow_2003_21"/>
</filter>
<filter id="filter3_di_2003_21" x="552" y="711" width="407" height="407" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset/>
<feGaussianBlur stdDeviation="25"/>
<feComposite in2="hardAlpha" operator="out"/>
<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.04 0"/>
<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_2003_21"/>
<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_2003_21" result="shape"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset dx="-1" dy="1"/>
<feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
<feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.85 0"/>
<feBlend mode="normal" in2="shape" result="effect2_innerShadow_2003_21"/>
</filter>
<radialGradient id="paint0_radial_2003_21" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(755.5 914.5) rotate(90) scale(517.5)">
<stop stop-color="#F2F2F2"/>
<stop offset="1" stop-color="#F3F3F3"/>
</radialGradient>
<radialGradient id="paint1_radial_2003_21" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(755.5 914.5) rotate(90) scale(399.5)">
<stop stop-color="#F0F0F0"/>
<stop offset="1" stop-color="#F8F8F8"/>
</radialGradient>
<radialGradient id="paint2_radial_2003_21" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(755.5 914.5) rotate(90) scale(276.5)">
<stop stop-color="#F5F5F5"/>
<stop offset="1" stop-color="#FBFBFB"/>
</radialGradient>
<linearGradient id="paint3_linear_2003_21" x1="755.5" y1="772.545" x2="755.5" y2="976.926" gradientUnits="userSpaceOnUse">
<stop stop-color="#F7F7F7"/>
<stop offset="1" stop-color="white"/>
</linearGradient>
<clipPath id="clip0_2003_21">
<rect width="1512" height="982" fill="white"/>
</clipPath>
</defs>
`;

function RimDash({
  r,
  duration,
  phase,
  arcDeg,
}: {
  r: number;
  duration: number;
  phase: number;
  arcDeg: number;
}) {
  const circumference = 2 * Math.PI * r;
  const dashLen = (arcDeg / 360) * circumference;
  const gapLen = circumference - dashLen;
  // Offset so phase rotates the dash start around the rim (SVG circles start at 3 o'clock).
  const phaseOffset = ((phase % 360) / 360) * circumference;

  return (
    <circle
      cx={CX}
      cy={CY}
      r={r}
      fill="none"
      stroke="#000000"
      strokeWidth={1.25}
      strokeLinecap="butt"
      strokeDasharray={`${dashLen} ${gapLen}`}
      strokeDashoffset={phaseOffset}
    >
      <animate
        attributeName="stroke-dashoffset"
        from={String(phaseOffset)}
        to={String(phaseOffset - circumference)}
        dur={`${duration}s`}
        repeatCount="indefinite"
      />
    </circle>
  );
}

export function ConcentricCirclesBackground() {
  return (
    <>
      <svg
        width="1512"
        height="982"
        viewBox="0 0 1512 982"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMax slice"
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full"
      >
        <g dangerouslySetInnerHTML={{ __html: CONCENTRIC_CIRCLES_MARKUP }} />
        {RIM_DASHES.map((dash) => (
          <RimDash
            key={`${dash.r}-${dash.phase}`}
            r={dash.r}
            duration={dash.duration}
            phase={dash.phase}
            arcDeg={dash.arcDeg}
          />
        ))}
      </svg>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 paper-grain"
      />
    </>
  );
}
