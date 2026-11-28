const CX = 756;
/** Low planetary horizon. */
const CY = 1100;
const VIEW_W = 1512;
const VIEW_H = 982;

type Ring = {
  r: number;
  /** Lit face near the apex. */
  lit: string;
  /** Body midtone — dark enough that a white rim can read. */
  body: string;
  /** Deep falloff toward the lower disc / outer edge. */
  deep: string;
  farBlur: number;
  farOp: number;
  nearBlur: number;
  nearOp: number;
  rimPeak: number;
  rimWidth: number;
  shadePeak: number;
};

/**
 * Light-mode Neuronest: stacked paper discs on #EDEDED with a center-bright
 * white rim light, soft shade falloff under the rim, and precise dual shadows.
 * Bodies stay a step below white so the rim catch-light is visible.
 */
const RINGS: Ring[] = [
  {
    r: 720,
    lit: "#F0F0F0",
    body: "#EDEDED",
    deep: "#EAEAEA",
    farBlur: 64,
    farOp: 0.02,
    nearBlur: 14,
    nearOp: 0.018,
    rimPeak: 0.85,
    rimWidth: 2.8,
    shadePeak: 0.07,
  },
  {
    r: 560,
    lit: "#F2F2F2",
    body: "#EFEFEF",
    deep: "#EBEBEB",
    farBlur: 50,
    farOp: 0.022,
    nearBlur: 12,
    nearOp: 0.02,
    rimPeak: 0.92,
    rimWidth: 2.5,
    shadePeak: 0.08,
  },
  {
    r: 405,
    lit: "#F5F5F5",
    body: "#F1F1F1",
    deep: "#EDEDED",
    farBlur: 36,
    farOp: 0.024,
    nearBlur: 10,
    nearOp: 0.022,
    rimPeak: 0.95,
    rimWidth: 2.2,
    shadePeak: 0.085,
  },
  {
    r: 250,
    lit: "#F8F8F8",
    body: "#F3F3F3",
    deep: "#EFEFEF",
    farBlur: 24,
    farOp: 0.024,
    nearBlur: 8,
    nearOp: 0.024,
    rimPeak: 0.8,
    rimWidth: 1.8,
    shadePeak: 0.07,
  },
]

/** Sparse orbiting accents along the lit horizon — opacity fade, constant width. */
const RIM_LIGHTS = [
  { r: 560, duration: 96, phase: -70, arcDeg: 9 },
  { r: 405, duration: 80, phase: -22, arcDeg: 10 },
  { r: 250, duration: 68, phase: -118, arcDeg: 11 },
] as const;

const LIGHT_HALF_WIDTH = 0.5;
const LIGHT_OUTWARD = 2.6;

const DUST: Array<{ x: number; y: number; r: number; o: number }> = [
  { x: 155, y: 72, r: 1.25, o: 0.11 },
  { x: 285, y: 125, r: 0.75, o: 0.075 },
  { x: 425, y: 58, r: 1.55, o: 0.1 },
  { x: 555, y: 148, r: 0.65, o: 0.065 },
  { x: 695, y: 44, r: 1.15, o: 0.12 },
  { x: 835, y: 112, r: 0.85, o: 0.075 },
  { x: 975, y: 66, r: 1.35, o: 0.11 },
  { x: 1115, y: 138, r: 0.7, o: 0.065 },
  { x: 1255, y: 84, r: 1.05, o: 0.09 },
  { x: 1380, y: 155, r: 0.7, o: 0.06 },
  { x: 215, y: 205, r: 0.95, o: 0.055 },
  { x: 495, y: 228, r: 0.55, o: 0.05 },
  { x: 915, y: 195, r: 0.9, o: 0.06 },
  { x: 1175, y: 235, r: 0.7, o: 0.045 },
  { x: 355, y: 285, r: 0.5, o: 0.04 },
  { x: 1045, y: 295, r: 0.7, o: 0.045 },
  { x: 635, y: 265, r: 0.45, o: 0.035 },
  { x: 1315, y: 250, r: 0.55, o: 0.04 },
  { x: 775, y: 185, r: 0.55, o: 0.045 },
  { x: 145, y: 255, r: 0.6, o: 0.035 },
  { x: 1450, y: 220, r: 0.5, o: 0.03 },
  { x: 60, y: 160, r: 0.8, o: 0.04 },
];

function polar(r: number, deg: number): [number, number] {
  const a = (deg * Math.PI) / 180;
  return [CX + r * Math.cos(a), CY + r * Math.sin(a)];
}

function arcPath(r: number, startDeg: number, endDeg: number): string {
  const [x1, y1] = polar(r, startDeg);
  const [x2, y2] = polar(r, endDeg);
  const delta = ((endDeg - startDeg) % 360 + 360) % 360;
  const large = delta > 180 ? 1 : 0;
  const sweep = endDeg > startDeg ? 1 : 0;
  return `M ${x1} ${y1} A ${r} ${r} 0 ${large} ${sweep} ${x2} ${y2}`;
}

function buildRimLightPath(
  r: number,
  arcDeg: number,
  halfWidth: number,
  outward: number,
  steps = 32,
): { d: string; headX: number; headY: number; tailX: number; tailY: number } {
  const pathR = r + outward;
  const outer: Array<[number, number]> = [];
  const inner: Array<[number, number]> = [];
  const toRad = (deg: number) => (deg * Math.PI) / 180;

  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const ang = toRad(-t * arcDeg);
    const cos = Math.cos(ang);
    const sin = Math.sin(ang);
    outer.push([
      CX + (pathR + halfWidth) * cos,
      CY + (pathR + halfWidth) * sin,
    ]);
    inner.push([
      CX + (pathR - halfWidth) * cos,
      CY + (pathR - halfWidth) * sin,
    ]);
  }

  let d = `M ${outer[0][0]} ${outer[0][1]}`;
  for (let i = 1; i < outer.length; i++) d += ` L ${outer[i][0]} ${outer[i][1]}`;
  for (let i = inner.length - 1; i >= 0; i--) d += ` L ${inner[i][0]} ${inner[i][1]}`;
  d += " Z";

  const tailAng = toRad(-arcDeg);
  return {
    d,
    headX: CX + pathR,
    headY: CY,
    tailX: CX + pathR * Math.cos(tailAng),
    tailY: CY + pathR * Math.sin(tailAng),
  };
}

function shadowOnlyFilter(
  id: string,
  r: number,
  blur: number,
  opacity: number,
  dy: number,
) {
  const pad = blur * 3.2 + Math.abs(dy) + 16;
  return (
    <filter
      id={id}
      x={CX - r - pad}
      y={CY - r - pad}
      width={r * 2 + pad * 2}
      height={r * 2 + pad * 2}
      filterUnits="userSpaceOnUse"
      colorInterpolationFilters="sRGB"
    >
      <feFlood floodOpacity="0" result="bg" />
      <feColorMatrix
        in="SourceAlpha"
        type="matrix"
        values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 127 0"
        result="hard"
      />
      <feOffset dy={dy} in="hard" />
      <feGaussianBlur stdDeviation={blur} result="blurred" />
      {/* Cool desaturated slate-blue ambient — very soft, no gray stair steps. */}
      <feColorMatrix
        type="matrix"
        values={`0 0 0 0 0.22  0 0 0 0 0.28  0 0 0 0 0.38  0 0 0 ${opacity} 0`}
        result="shadow"
      />
      <feMerge>
        <feMergeNode in="bg" />
        <feMergeNode in="shadow" />
      </feMerge>
    </filter>
  );
}

/** Horizontal opacity envelope: peak at center, dies at the sides. */
function centerFadeStops(
  id: string,
  color: string,
  peak: number,
  spread = 0.98,
) {
  return (
    <linearGradient
      id={id}
      gradientUnits="userSpaceOnUse"
      x1={CX - spread * 720}
      y1={0}
      x2={CX + spread * 720}
      y2={0}
    >
      <stop offset="0" stopColor={color} stopOpacity="0" />
      <stop offset="0.1" stopColor={color} stopOpacity={peak * 0.05} />
      <stop offset="0.22" stopColor={color} stopOpacity={peak * 0.22} />
      <stop offset="0.35" stopColor={color} stopOpacity={peak * 0.55} />
      <stop offset="0.45" stopColor={color} stopOpacity={peak * 0.88} />
      <stop offset="0.5" stopColor={color} stopOpacity={peak} />
      <stop offset="0.55" stopColor={color} stopOpacity={peak * 0.88} />
      <stop offset="0.65" stopColor={color} stopOpacity={peak * 0.55} />
      <stop offset="0.78" stopColor={color} stopOpacity={peak * 0.22} />
      <stop offset="0.9" stopColor={color} stopOpacity={peak * 0.05} />
      <stop offset="1" stopColor={color} stopOpacity="0" />
    </linearGradient>
  );
}

function Disc({ ring, index }: { ring: Ring; index: number }) {
  const farId = `sh-far-${index}`;
  const nearId = `sh-near-${index}`;
  const fillId = `fill-${index}`;
  const rimGradId = `rim-g-${index}`;
  const shadeGradId = `shade-g-${index}`;
  const rimBlurId = `rim-b-${index}`;
  const shadeBlurId = `shade-b-${index}`;
  const rimStart = -174;
  const rimEnd = -6;

  return (
    <g>
      <defs>
        {shadowOnlyFilter(farId, ring.r, ring.farBlur, ring.farOp, 3)}
        {shadowOnlyFilter(nearId, ring.r, ring.nearBlur, ring.nearOp, 0.8)}

        <radialGradient
          id={fillId}
          gradientUnits="userSpaceOnUse"
          cx={CX}
          cy={CY - ring.r * 0.88}
          fx={CX}
          fy={CY - ring.r * 0.95}
          r={ring.r * 1.5}
        >
          <stop offset="0" stopColor={ring.lit} />
          <stop offset="0.2" stopColor={ring.lit} />
          <stop offset="0.5" stopColor={ring.body} />
          <stop offset="0.82" stopColor={ring.deep} />
          <stop offset="1" stopColor={ring.deep} />
        </radialGradient>

        {centerFadeStops(rimGradId, "#FFFFFF", ring.rimPeak, ring.r / 720)}
        {centerFadeStops(shadeGradId, "#5a6a7a", ring.shadePeak, ring.r / 720)}

        <filter
          id={rimBlurId}
          x={CX - ring.r - 80}
          y={CY - ring.r - 80}
          width={ring.r * 2 + 160}
          height={ring.r + 120}
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feGaussianBlur stdDeviation="3.8" />
        </filter>
        <filter
          id={shadeBlurId}
          x={CX - ring.r - 100}
          y={CY - ring.r - 100}
          width={ring.r * 2 + 200}
          height={ring.r + 160}
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feGaussianBlur stdDeviation="20" />
        </filter>
      </defs>

      <circle cx={CX} cy={CY} r={ring.r} fill="#000" filter={`url(#${farId})`} />
      <circle cx={CX} cy={CY} r={ring.r} fill="#000" filter={`url(#${nearId})`} />
      <circle cx={CX} cy={CY} r={ring.r} fill={`url(#${fillId})`} />

      {/* Soft cool shade under the rim — subtle volume, not a gray stair. */}
      <path
        d={arcPath(ring.r - 24, rimStart, rimEnd)}
        fill="none"
        stroke={`url(#${shadeGradId})`}
        strokeWidth={52}
        strokeLinecap="butt"
        filter={`url(#${shadeBlurId})`}
      />

      {/* Feathered bloom, then crisp constant-width hairline. */}
      <path
        d={arcPath(ring.r - 0.4, rimStart, rimEnd)}
        fill="none"
        stroke={`url(#${rimGradId})`}
        strokeWidth={ring.rimWidth * 5}
        strokeLinecap="butt"
        opacity={0.55}
        filter={`url(#${rimBlurId})`}
      />
      <path
        d={arcPath(ring.r - 0.25, rimStart, rimEnd)}
        fill="none"
        stroke={`url(#${rimGradId})`}
        strokeWidth={ring.rimWidth}
        strokeLinecap="butt"
      />
    </g>
  );
}

function RimLight({
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
  const gradId = `orbit-${r}-${phase}`.replace(".", "_");
  const { d, headX, headY, tailX, tailY } = buildRimLightPath(
    r,
    arcDeg,
    LIGHT_HALF_WIDTH,
    LIGHT_OUTWARD,
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
          <stop offset="0" stopColor="#141310" stopOpacity="0.58" />
          <stop offset="0.28" stopColor="#141310" stopOpacity="0.44" />
          <stop offset="0.62" stopColor="#141310" stopOpacity="0.15" />
          <stop offset="1" stopColor="#141310" stopOpacity="0" />
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
        width={VIEW_W}
        height={VIEW_H}
        viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMax slice"
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full"
      >
        <defs>
          <linearGradient id="field-wash" x1="0" y1="0" x2="0" y2={VIEW_H}>
            <stop offset="0" stopColor="#EAEAEA" />
            <stop offset="0.4" stopColor="#EDEDED" />
            <stop offset="1" stopColor="#EFEFEF" />
          </linearGradient>
          <filter
            id="dust-soft"
            x="-40%"
            y="-40%"
            width="180%"
            height="180%"
            colorInterpolationFilters="sRGB"
          >
            <feGaussianBlur stdDeviation="0.45" />
          </filter>
        </defs>

        <rect width={VIEW_W} height={VIEW_H} fill="url(#field-wash)" />

        <g filter="url(#dust-soft)">
          {DUST.map((d, i) => (
            <circle
              key={i}
              cx={d.x}
              cy={d.y}
              r={d.r}
              fill="#3a3732"
              fillOpacity={d.o}
            />
          ))}
        </g>

        {RINGS.map((ring, index) => (
          <Disc key={ring.r} ring={ring} index={index} />
        ))}

        {RIM_LIGHTS.map((light) => (
          <RimLight
            key={`${light.r}-${light.phase}`}
            r={light.r}
            duration={light.duration}
            phase={light.phase}
            arcDeg={light.arcDeg}
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
