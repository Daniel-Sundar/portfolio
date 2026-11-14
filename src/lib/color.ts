/** Parse #rgb / #rrggbb into 0-255 channels. Returns null for anything else. */
export function hexToRgb(hex: string): [number, number, number] | null {
  const m = hex.trim().match(/^#([0-9a-f]{3}|[0-9a-f]{6})$/i)
  if (!m) return null
  const h = m[1].length === 3 ? m[1].replace(/./g, c => c + c) : m[1]
  return [0, 2, 4].map(i => parseInt(h.slice(i, i + 2), 16)) as [number, number, number]
}

function luminance([r, g, b]: [number, number, number]): number {
  const lin = (v: number) => {
    const c = v / 255
    return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4
  }
  return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b)
}

/** WCAG contrast ratio between two hex colours, or null if either is not hex. */
export function contrastRatio(a: string, b: string): number | null {
  const ra = hexToRgb(a)
  const rb = hexToRgb(b)
  if (!ra || !rb) return null
  const [hi, lo] = [luminance(ra), luminance(rb)].sort((x, y) => y - x)
  return (hi + 0.05) / (lo + 0.05)
}
