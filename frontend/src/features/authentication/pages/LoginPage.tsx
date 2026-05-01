import { useState, ChangeEvent, FormEvent } from 'react'
import { Icon } from '@iconify/react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import InputField from '../components/InputField'
import PasswordField from '../components/PasswordField'
import OAuthButton from '../components/OAuthButton'

export default function LoginPage() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [form, setForm] = useState({ email: '', password: '' })
  const [showErrorModal, setShowErrorModal] = useState(false)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    try {
      await login(form)
      navigate('/dashboard')
    } catch (err: any) {
      const errorMsg = err.response?.data?.detail || err.message || ''
      if (errorMsg.includes('Account not found')) {
        setShowErrorModal(true)
      } else {
        alert('Invalid credentials')
      }
    }
  }

  return (
    <div className="min-h-screen flex bg-surface overflow-hidden">
      {/* Error Modal */}
      {showErrorModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-surface w-full max-w-md rounded-[3rem] p-10 shadow-2xl animate-in zoom-in-95 duration-300 border border-outline-variant">
            <div className="w-20 h-20 bg-primary-container rounded-3xl flex items-center justify-center mb-8 mx-auto">
              <Icon icon="solar:user-plus-bold-duotone" className="text-4xl text-on-primary-container" />
            </div>
            <h3 className="text-2xl font-black text-on-surface text-center mb-4 tracking-tight">Account Not Found</h3>
            <p className="text-on-surface-variant text-center mb-10 leading-relaxed font-medium text-sm px-4">
              We couldn't find an account with that email address. Would you like to create a new one instead?
            </p>
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => setShowErrorModal(false)}
                className="py-4 px-6 bg-surface-container-low text-on-surface-variant font-bold rounded-2xl hover:bg-surface-container transition-all active:scale-95 text-xs uppercase tracking-widest"
              >
                Try Again
              </button>
              <button
                onClick={() => navigate('/register')}
                className="py-4 px-6 bg-primary text-on-primary font-bold rounded-2xl hover:opacity-90 shadow-lg shadow-primary/20 transition-all active:scale-95 text-xs uppercase tracking-widest"
              >
                Register Now
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Left Branding Section */}
      <div className="hidden lg:flex w-[55%] bg-background p-16 flex-col justify-between relative overflow-hidden border-r border-outline-variant">
        <div className="animate-in fade-in slide-in-from-left-8 duration-1000">
          <div className="text-xl font-bold tracking-tighter text-on-surface">less.</div>
        </div>

        <div className="relative z-10 animate-in fade-in zoom-in duration-1000 delay-200">
          <h1 className="text-[180px] font-black text-primary leading-none tracking-[-0.08em] opacity-80 mix-blend-multiply">
            less<span className="text-primary-container">.</span>
          </h1>
        </div>

        <div className="text-[11px] font-bold text-on-surface-variant uppercase tracking-[0.2em] animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-500">
          @2026 less.
        </div>

        {/* Decorative elements */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[radial-gradient(circle_at_center,rgba(139,168,136,0.08)_0%,transparent_70%)] pointer-events-none"></div>
      </div>

      {/* Right Form Section */}
      <div className="flex-1 flex flex-col bg-surface relative min-h-screen">
        {/* Mobile Header (Back button) */}
        <div className="p-8 lg:p-12">
          <button 
            onClick={() => navigate('/')}
            className="w-12 h-12 flex items-center justify-center rounded-full hover:bg-surface-container-low transition-all active:scale-90 group"
          >
            <span className="material-symbols-outlined text-on-surface-variant group-hover:text-primary transition-colors">arrow_back</span>
          </button>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center px-8 sm:px-16 lg:px-24 pb-20">
          <div className="w-full max-w-[420px] animate-in fade-in slide-in-from-bottom-8 duration-1000">
            <div className="mb-12">
              <h2 className="text-[40px] font-black text-on-surface tracking-tight leading-tight mb-4">
                Welcome back.
              </h2>
              <p className="text-on-surface-variant font-medium tracking-tight">
                Simplify your workspace and find your focus.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <InputField
                label="Email address"
                id="email"
                name="email"
                type="email"
                placeholder="Email address"
                value={form.email}
                onChange={handleChange}
              />

              <div className="space-y-3">
                <PasswordField
                  label="Password"
                  id="password"
                  name="password"
                  placeholder="Password"
                  value={form.password}
                  onChange={handleChange}
                />
                <div className="flex justify-end">
                  <button 
                    type="button"
                    className="text-[11px] font-black text-on-surface-variant uppercase tracking-widest hover:text-primary transition-colors"
                  >
                    Forgot Password?
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-5 bg-primary hover:bg-[#3d533c] text-on-primary font-bold rounded-2xl transition-all duration-300 shadow-xl shadow-primary/10 hover:shadow-primary/20 active:scale-[0.98] mt-4"
              >
                Login
              </button>
            </form>

            <div className="mt-12">
              <div className="flex items-center gap-4 mb-8">
                <div className="flex-1 h-px bg-outline-variant" />
                <span className="text-[10px] font-black text-on-surface-variant uppercase tracking-[0.2em]">Sign in with</span>
                <div className="flex-1 h-px bg-outline-variant" />
              </div>

              <div className="flex gap-4">
                <OAuthButton provider="" icon="logos:google-icon" onClick={() => {}} />
                <OAuthButton provider="" icon="logos:apple" onClick={() => {}} />
                <OAuthButton provider="" icon="logos:microsoft-icon" onClick={() => {}} />
              </div>
            </div>

            <p className="text-center text-sm text-on-surface-variant font-medium mt-16">
              New to less?{' '}
              <button
                type="button"
                onClick={() => navigate('/register')}
                className="text-primary font-bold hover:underline underline-offset-4"
              >
                Sign up
              </button>
            </p>
          </div>
        </div>

        {/* Bottom Footer Links */}
        <div className="p-8 lg:p-12 flex justify-center gap-8 border-t border-outline-variant/30">
          <button className="text-[10px] font-black text-on-surface-variant uppercase tracking-[0.2em] hover:text-primary transition-colors">privacy</button>
          <button className="text-[10px] font-black text-on-surface-variant uppercase tracking-[0.2em] hover:text-primary transition-colors">terms</button>
          <button className="text-[10px] font-black text-on-surface-variant uppercase tracking-[0.2em] hover:text-primary transition-colors">contact</button>
        </div>
      </div>
    </div>
  )
}
