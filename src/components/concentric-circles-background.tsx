const CX = 755.5;
const CY = 914.5;

/** Sparse black rim lights: constant width, opacity fade at the tail. */
const RIM_DASHES = [
  { r: 517.5, duration: 78, phase: 18, arcDeg: 5.5 },
  { r: 399.5, duration: 64, phase: 155, arcDeg: 6.5 },
  { r: 276.5, duration: 52, phase: 268, arcDeg: 7.5 },
] as const;

/** Half the stroke width in SVG units — constant along the dash. */
const HEAD_HALF_WIDTH = 0.45;
/** Nudge the dash centerline outside the rim so the head sits past the perimeter. */
const OUTWARD_OFFSET = 1.6;

/**
 * Stacked paper discs on #EDEDED: clearer value steps, soft contact shadows,
 * and a 1px white inset hairline on each rim (Figma ellipse treatment).
 */
const CONCENTRIC_CIRCLES_MARKUP = `
<g clip-path="url(#clip0_2003_21)">
<rect width="1512" height="982" fill="#EDEDED"/>
<g filter="url(#filter0_di_2003_21)">
<circle cx="755.5" cy="914.5" r="517.5" fill="url(#paint0_radial_2003_21)"/>
</g>
<g filter="url(#filter1_di_2003_21)">
<circle cx="755.5" cy="914.5" r="399.5" fill="url(#paint1_radial_2003_21)"/>
</g>
<g filter="url(#filter2_di_2003_21)">
<circle cx="755.5" cy="914.5" r="276.5" fill="url(#paint2_radial_2003_21)"/>
</g>
<g filter="url(#filter3_di_2003_21)">
<circle cx="755.5" cy="914.5" r="153.5" fill="url(#paint3_linear_2003_21)"/>
</g>
</g>
<defs>
<filter id="filter0_di_2003_21" x="208" y="367" width="1095" height="1095" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset dy="1"/>
<feGaussianBlur stdDeviation="14"/>
<feComposite in2="hardAlpha" operator="out"/>
<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.07 0"/>
<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_2003_21"/>
<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_2003_21" result="shape"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset dx="1" dy="1"/>
<feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
<feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.72 0"/>
<feBlend mode="normal" in2="shape" result="effect2_innerShadow_2003_21"/>
</filter>
<filter id="filter1_di_2003_21" x="328" y="487" width="855" height="855" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset dy="1"/>
<feGaussianBlur stdDeviation="12"/>
<feComposite in2="hardAlpha" operator="out"/>
<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.08 0"/>
<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_2003_21"/>
<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_2003_21" result="shape"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset dx="-1" dy="1"/>
<feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
<feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.72 0"/>
<feBlend mode="normal" in2="shape" result="effect2_innerShadow_2003_21"/>
</filter>
<filter id="filter2_di_2003_21" x="453" y="612" width="605" height="605" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset dy="1"/>
<feGaussianBlur stdDeviation="10"/>
<feComposite in2="hardAlpha" operator="out"/>
<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.09 0"/>
<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_2003_21"/>
<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_2003_21" result="shape"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset dx="1" dy="1"/>
<feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
<feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.78 0"/>
<feBlend mode="normal" in2="shape" result="effect2_innerShadow_2003_21"/>
</filter>
<filter id="filter3_di_2003_21" x="578" y="737" width="355" height="355" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
<feFlood flood-opacity="0" result="BackgroundImageFix"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset dy="1"/>
<feGaussianBlur stdDeviation="8"/>
<feComposite in2="hardAlpha" operator="out"/>
<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"/>
<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_2003_21"/>
<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_2003_21" result="shape"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset dx="-1" dy="1"/>
<feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
<feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.78 0"/>
<feBlend mode="normal" in2="shape" result="effect2_innerShadow_2003_21"/>
</filter>
<radialGradient id="paint0_radial_2003_21" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(755.5 914.5) rotate(90) scale(517.5)">
<stop stop-color="#F0F0F0"/>
<stop offset="0.82" stop-color="#F1F1F1"/>
<stop offset="1" stop-color="#EFEFEF"/>
</radialGradient>
<radialGradient id="paint1_radial_2003_21" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(755.5 914.5) rotate(90) scale(399.5)">
<stop stop-color="#F4F4F4"/>
<stop offset="0.78" stop-color="#F5F5F5"/>
<stop offset="1" stop-color="#F2F2F2"/>
</radialGradient>
<radialGradient id="paint2_radial_2003_21" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(755.5 914.5) rotate(90) scale(276.5)">
<stop stop-color="#F7F7F7"/>
<stop offset="0.75" stop-color="#F8F8F8"/>
<stop offset="1" stop-color="#F5F5F5"/>
</radialGradient>
<linearGradient id="paint3_linear_2003_21" x1="755.5" y1="761" x2="755.5" y2="1068" gradientUnits="userSpaceOnUse">
<stop stop-color="#FAFAFA"/>
<stop offset="1" stop-color="#FFFFFF"/>
</linearGradient>
<clipPath id="clip0_2003_21">
<rect width="1512" height="982" fill="white"/>
</clipPath>
</defs>
`;

/**
 * Constant-width black dash along a rim arc: flat butt at the leading tip,
 * opacity fades at the trailing end (no stroke-width taper). Centerline sits
 * slightly outside the rim so the head extends past the perimeter.
 */
function buildRimDash(
  r: number,
  arcDeg: number,
  halfWidth: number,
  outwardOffset: number,
  steps = 24,
): { d: string; headX: number; headY: number; tailX: number; tailY: number } {
  const toRad = (deg: number) => (deg * Math.PI) / 180;
  const pathR = r + outwardOffset;
  const outer: Array<[number, number]> = [];
  const inner: Array<[number, number]> = [];

  for (let i = 0; i <= steps; i++) {
    const t = i / steps; // 0 = head (solid), 1 = tail (faded)
    const ang = toRad(-t * arcDeg);
    const cos = Math.cos(ang);
    const sin = Math.sin(ang);
    outer.push([CX + (pathR + halfWidth) * cos, CY + (pathR + halfWidth) * sin]);
    inner.push([CX + (pathR - halfWidth) * cos, CY + (pathR - halfWidth) * sin]);
  }

  let d = `M ${outer[0][0]} ${outer[0][1]}`;
  for (let i = 1; i < outer.length; i++) {
    d += ` L ${outer[i][0]} ${outer[i][1]}`;
  }
  for (let i = inner.length - 1; i >= 0; i--) {
    d += ` L ${inner[i][0]} ${inner[i][1]}`;
  }
  d += " Z";

  const headX = CX + pathR;
  const headY = CY;
  const tailAng = toRad(-arcDeg);
  const tailX = CX + pathR * Math.cos(tailAng);
  const tailY = CY + pathR * Math.sin(tailAng);

  return { d, headX, headY, tailX, tailY };
}

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
  const gradId = `rim-fade-${r}-${phase}`.replace(".", "_");
  const { d, headX, headY, tailX, tailY } = buildRimDash(
    r,
    arcDeg,
    HEAD_HALF_WIDTH,
    OUTWARD_OFFSET,
  );

  return (
    <g transform={`rotate(${phase} ${CX} ${CY})`}>
      <animateTransform
        attributeName="transform"
        type="rotate"
        from={`${phase} ${CX} ${CY}`}
        to={`${phase + 360} ${CX} ${CY}`}
        dur={`${duration}s`}
        repeatCount="indefinite"
      />
      <defs>
        <linearGradient
          id={gradId}
          gradientUnits="userSpaceOnUse"
          x1={headX}
          y1={headY}
          x2={tailX}
          y2={tailY}
        >
          {/* Constant width; alpha fades only toward the trailing end. */}
          <stop offset="0" stopColor="#000000" stopOpacity="0.88" />
          <stop offset="0.4" stopColor="#000000" stopOpacity="0.72" />
          <stop offset="0.72" stopColor="#000000" stopOpacity="0.28" />
          <stop offset="1" stopColor="#000000" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={d} fill={`url(#${gradId})`} />
    </g>
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
