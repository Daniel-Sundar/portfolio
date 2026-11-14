/**
 * Static stand-in for the 3D scene. Shown on phones, when WebGL2 is missing,
 * when reduced motion is requested, and while the 3D chunk loads.
 */
export function HeroStatic() {
  return (
    <div
      aria-hidden="true"
      className="absolute top-[14%] right-[-18%] aspect-square w-[min(92vw,640px)] md:top-[10%] md:right-[2%]"
    >
      <div
        className="absolute inset-[6%] rounded-full opacity-90"
        style={{
          background:
            'conic-gradient(from 210deg, var(--accent-deep), var(--accent) 22%, color-mix(in srgb, var(--accent) 35%, #000) 48%, var(--accent) 70%, var(--accent-deep))',
          WebkitMask: 'radial-gradient(closest-side, transparent 79%, #000 80%)',
          mask: 'radial-gradient(closest-side, transparent 79%, #000 80%)',
          transform: 'rotateX(58deg) rotateZ(-18deg)',
        }}
      />
      <div
        className="absolute inset-[18%] rounded-full border-[3px]"
        style={{
          borderColor: 'var(--panel-strong)',
          transform: 'rotateX(70deg) rotateY(24deg)',
        }}
      />
      <div
        className="absolute top-[30%] left-[30%] size-[40%] rounded-full"
        style={{
          background:
            'radial-gradient(circle at 32% 28%, color-mix(in srgb, var(--ink) 55%, var(--panel-strong)), var(--panel-strong) 38%, var(--panel) 62%, #050806 100%)',
          boxShadow: '0 40px 80px -20px rgb(0 0 0 / 0.6)',
        }}
      />
      <div
        className="absolute top-[16%] left-[14%] size-[9%] rounded-full"
        style={{
          background:
            'radial-gradient(circle at 30% 30%, color-mix(in srgb, var(--accent) 60%, #fff), var(--accent) 45%, var(--accent-deep))',
        }}
      />
      <div
        className="absolute right-[12%] bottom-[20%] size-[6%] rounded-full"
        style={{
          background:
            'radial-gradient(circle at 30% 30%, color-mix(in srgb, var(--panel-strong) 50%, #fff), var(--panel-strong) 50%, var(--panel))',
        }}
      />
    </div>
  )
}
