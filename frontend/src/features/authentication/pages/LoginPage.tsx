import { useState, ChangeEvent, FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import InputField from '../components/InputField'
import PasswordField from '../components/PasswordField'
import OAuthButton from '../components/OAuthButton'
import AuthLayout from '../components/AuthLayout'
import AuthModal from '../components/AuthModal'

import AuthBranding from '../components/AuthBranding'

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
    <AuthLayout 
      leftContent={<AuthBranding />} 
      backTo="/"
      topRightContent={
        <button
          onClick={() => navigate('/test')}
          className="px-6 py-2 bg-surface-container-high hover:bg-primary/10 text-on-surface-variant hover:text-primary font-black text-[10px] uppercase tracking-[0.2em] rounded-full transition-all active:scale-95 border border-outline-variant/30"
        >
          Test Design
        </button>
      }
    >
      <AuthModal 
        isOpen={showErrorModal}
        type="error"
        title="Account Not Found"
        message="We couldn't find an account with that email address. Would you like to create a new one instead?"
        actionLabel="Register Now"
        onAction={() => navigate('/register')}
        secondaryActionLabel="Try Again"
        onSecondaryAction={() => setShowErrorModal(false)}
      />

      <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000">
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
                onClick={() => navigate('/forgot-password')}
                className="text-[11px] font-black text-on-surface-variant uppercase tracking-widest hover:text-primary hover:underline underline-offset-4 transition-all"
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
    </AuthLayout>
  )
}
