function normalizeBase(input?: string | null): string {
  const raw = (input || '').trim()
  if (!raw) return 'http://localhost:8000'
  try {
    const u = new URL(raw)
    const host = (u.hostname || '').toLowerCase()
    const hasPort = !!u.port
    if ((host === 'localhost' || host === '127.0.0.1') && !hasPort) {
      u.port = '8000'
    }
    return u.toString().replace(/\/+$/, '')
  } catch {
    return 'http://localhost:8000'
  }
}

export const API_BASE = normalizeBase(process.env.NEXT_PUBLIC_API_BASE_URL)

export function getToken(): string | null {
  if (typeof window === 'undefined') return null
  return localStorage.getItem('token')
}

export async function fetchAdmin<T = unknown>(path: string, init: RequestInit = {}): Promise<T> {
  const token = getToken()
  const res = await fetch(`${API_BASE}${path}`, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...(init.headers || {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  })
  if (!res.ok) {
    throw new Error(String(res.status))
  }
  return (await res.json()) as T
}

export function absoluteAsset(url?: string | null): string {
  if (!url) return ''
  return url.startsWith('/') ? `${API_BASE}${url}` : url
}
