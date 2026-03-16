'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { API_BASE } from '@/utils/adminApi'

export default function AdminLoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)
  const [msg, setMsg] = useState('')
  const router = useRouter()

  useEffect(() => {
    const savedEmail = localStorage.getItem('admin_email')
    if (savedEmail) {
      setEmail(savedEmail)
      setRememberMe(true)
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const res = await fetch(`${API_BASE}/api/admin/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })
      if (!res.ok) {
        setMsg('Invalid credentials')
        return
      }
      const data = await res.json()
      if (!data.token) {
        setMsg('Login failed: Token not received')
        return
      }
      localStorage.setItem('token', data.token)
      if (rememberMe) {
        localStorage.setItem('admin_email', email)
      } else {
        localStorage.removeItem('admin_email')
      }
      router.push('/admin/dashboard')
    } catch (err) {
      console.error('Login error:', err)
      setMsg('Connection error: ' + (err as any).message)
    }
  }

  return (
    <main className='min-h-screen bg-darkmode flex items-center justify-center p-6'>
      <div className='w-full max-w-[420px] bg-gradient-to-b from-darklight/95 to-darkmode/95 p-8 rounded-2xl border border-dark_border/20 shadow-2xl'>
        <h2 className='text-white text-24 font-bold mb-2'>Admin Login</h2>
        <p className='text-muted/60 text-13 mb-6'>Access your dashboard to manage blogs</p>
        <form onSubmit={handleSubmit}>
          <div className='mb-4'>
            <input
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder='Email'
              className='w-full bg-darkmode border border-dark_border/20 text-white p-3 rounded-xl focus:border-primary outline-none'
              required
            />
          </div>
          <div className='mb-6'>
            <input
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder='Password'
              className='w-full bg-darkmode border border-dark_border/20 text-white p-3 rounded-xl focus:border-primary outline-none'
              required
            />
          </div>
          <div className='mb-6 flex items-center'>
            <input
              id='remember-me'
              type='checkbox'
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className='h-4 w-4 rounded border-dark_border/30 bg-darkmode text-primary focus:ring-primary focus:ring-offset-darkmode'
            />
            <label htmlFor='remember-me' className='ml-2 block text-14 text-muted/80 cursor-pointer'>
              Remember me
            </label>
          </div>
          <button
            type='submit'
            className='w-full bg-primary text-white font-bold p-3 rounded-xl hover:brightness-105 transition-all'>
            Login
          </button>
          {msg && <p className='mt-4 text-error text-14'>{msg}</p>}
        </form>
      </div>
    </main>
  )
}
