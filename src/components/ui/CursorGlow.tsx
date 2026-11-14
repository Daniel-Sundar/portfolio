import { useTheme } from '../../context/ThemeContext'
import { useCapabilities } from '../../hooks/useCapabilities'
import GlowCursor from '../reactbits/GlowCursor'

/** Soft accent-coloured light that trails the cursor. Mouse devices only. */
export function CursorGlow() {
  const { colors, meta } = useTheme()
  const { finePointer, reducedMotion, webgl2, desktop } = useCapabilities()
  if (!finePointer || !desktop || reducedMotion || !webgl2) return null

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[45]">
      <GlowCursor
        color={colors.accent}
        secondaryColor={colors.accentDeep}
        intensity={0.55}
        trailWidth={7}
        linger={0.7}
        glow={1.6}
        hotspot={0.25}
        followSpeed={0.5}
        clickBurst={false}
        quality="low"
        theme={meta.mode}
        maxDevicePixelRatio={1}
      />
    </div>
  )
}
