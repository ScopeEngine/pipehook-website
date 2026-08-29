export function slugifyCompanyName(name: string) {
  const slug = name
    .trim()
    .toLowerCase()
    .replace(/[åä]/g, 'a')
    .replace(/ö/g, 'o')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

  return slug || 'foretag'
}

export async function uniqueLeadSlug(base: string, existing: string[]) {
  const taken = new Set(existing)
  if (!taken.has(base)) return base

  let n = 2
  while (taken.has(`${base}-${n}`)) n += 1
  return `${base}-${n}`
}

export function parseLoomVideoId(value: string): { id: string } | { error: string } {
  const trimmed = value.trim()
  if (!trimmed) return { error: 'Ange Loom-videons ID.' }

  if (/^https?:\/\//i.test(trimmed) || trimmed.includes('/')) {
    return { error: 'Klistra bara in ID:t efter /share/ — inte hela Loom-länken.' }
  }

  if (!/^[a-zA-Z0-9]+$/.test(trimmed)) {
    return { error: 'Loom-ID:t får bara innehålla bokstäver och siffror.' }
  }

  return { id: trimmed }
}

export function parseAccentColor(value: string): { color: string | null } | { error: string } {
  const trimmed = value.trim()
  if (!trimmed) return { color: null }
  if (!/^#([0-9a-fA-F]{6})$/.test(trimmed)) {
    return { error: 'Accentfärg ska vara hex, t.ex. #1785f8, eller lämnas tom.' }
  }
  return { color: trimmed.toLowerCase() }
}
