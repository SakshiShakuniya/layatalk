'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { API_BASE } from '@/utils/adminApi'

export default function AdminLogin() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [remember, setRemember] = useState(false)
  const [msg, setMsg] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem('adminRememberEmail')
    if (saved) {
      setEmail(saved)
      setRemember(true)
    }
  }, [])

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setMsg('')
    setLoading(true)
    try {
      const res = await fetch(`${API_BASE}/api/admin/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })
      if (!res.ok) {
        setMsg('Invalid credentials')
        setLoading(false)
        return
      }
      const data = await res.json()
      if (remember) {
        localStorage.setItem('adminRememberEmail', email)
      } else {
        localStorage.removeItem('adminRememberEmail')
      }
      localStorage.setItem('token', data.token)
      router.push('/admin/dashboard')
    } catch {
      setMsg('Unable to login')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className='min-h-screen grid place-items-center bg-darkmode text-white p-6'>
      <div className='w-[92%] max-w-[420px] rounded-2xl border border-[#123057] bg-linear-to-b from-[#0b1b3a]/95 to-[#081127]/95 p-7 shadow-[0_10px_30px_rgba(0,0,0,.35)]'>
        <h2 className='text-24 font-semibold mb-1'>Admin Login</h2>
        <p className='text-13 text-[#94a3b8] mb-3'>Access your dashboard to manage blogs</p>
        <form onSubmit={onSubmit}>
          <div className='mb-3'>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type='email'
              placeholder='Email'
              autoComplete='username'
              className='w-full rounded-xl border border-[#123057] bg-[#081127] text-white px-3 py-3 outline-none focus:border-[#3b82f6] focus:ring-4 focus:ring-[#3b82f6]/15'
              required
            />
          </div>
          <div className='mb-3'>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type='password'
              placeholder='Password'
              autoComplete='current-password'
              className='w-full rounded-xl border border-[#123057] bg-[#081127] text-white px-3 py-3 outline-none focus:border-[#3b82f6] focus:ring-4 focus:ring-[#3b82f6]/15'
              required
            />
          </div>
          <div className='mb-3 flex items-center gap-2'>
            <input
              id='remember'
              type='checkbox'
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
              className='h-4 w-4 rounded border-[#123057] bg-[#081127] accent-[#3b82f6]'
            />
            <label htmlFor='remember' className='text-14 text-[#94a3b8]'>Remember me</label>
          </div>
          <button
            type='submit'
            disabled={loading}
            className='w-full rounded-xl bg-linear-to-r from-[#3b82f6] to-[#60a5fa] text-darkmode font-semibold px-4 py-3 border border-[#3b82f6] hover:brightness-105 disabled:opacity-60'>
            {loading ? 'Logging in...' : 'Login'}
          </button>
          <div className='mt-3 text-[#60a5fa] text-14 min-h-[18px]'>{msg}</div>
        </form>
      </div>
    </main>
  )
}
