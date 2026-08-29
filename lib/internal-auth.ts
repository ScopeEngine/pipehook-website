import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

function unauthorized() {
  return new NextResponse('Authentication required', {
    status: 401,
    headers: { 'WWW-Authenticate': 'Basic realm="PipeHook intern"' },
  })
}

function passwordsMatch(provided: string, expected: string) {
  if (provided.length !== expected.length) return false
  let mismatch = 0
  for (let i = 0; i < expected.length; i += 1) {
    mismatch |= provided.charCodeAt(i) ^ expected.charCodeAt(i)
  }
  return mismatch === 0
}

export function requireInternalAuth(request: NextRequest) {
  const expected = process.env.INTERNAL_ADMIN_PASSWORD
  if (!expected) {
    return new NextResponse('INTERNAL_ADMIN_PASSWORD is not configured', { status: 500 })
  }

  const header = request.headers.get('authorization')
  if (!header?.startsWith('Basic ')) return unauthorized()

  const decoded = atob(header.slice(6))
  const separator = decoded.indexOf(':')
  const password = separator === -1 ? decoded : decoded.slice(separator + 1)

  if (!passwordsMatch(password, expected)) return unauthorized()
  return null
}
