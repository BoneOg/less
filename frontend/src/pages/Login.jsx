import { useState } from 'react'
import InputField from '../components/InputField'
import PasswordField from '../components/PasswordField'
import OAuthButton from '../components/OAuthButton'

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // TODO: connect to Django backend
    console.log('Login submitted:', form)
  }

  return (
    <div className="min-h-screen flex">

      {/* ── LEFT PANEL: Branding ── */}
      <div className="flex w-1/2 items-center justify-center bg-[#264027]">
        <div className="text-center">
          <h1 className="text-7xl font-bold text-white tracking-widest">LESS</h1>
        </div>
      </div>

      {/* ── RIGHT PANEL: Form ── */}
      <div className="flex-1 flex flex-col items-center justify-center bg-white px-10 py-12">
        <div className="w-full max-w-sm">

          {/* Header */}
          <div className="text-center mb-7">
            <h2 className="text-3xl font-bold text-[#1a2e35]">Sign in Account</h2>
            <p className="text-sm text-gray-400 mt-2 leading-relaxed">
              Enter your credentials to access your account.
            </p>
          </div>

          {/* OAuth Buttons */}
          <div className="flex gap-3 mb-6">
            <OAuthButton
              provider="Google"
              icon="logos:google-icon"
              onClick={() => console.log('Google OAuth')}
            />
            <OAuthButton
              provider="Microsoft"
              icon="logos:microsoft-icon"
              onClick={() => console.log('Microsoft OAuth')}
            />
          </div>

          {/* Divider */}
          <div className="flex items-center gap-3 mb-6">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-xs text-gray-400 font-medium">or</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">

            <InputField
              label="Email"
              id="email"
              name="email"
              type="email"
              placeholder="eg. owner@restaurant.com"
              value={form.email}
              onChange={handleChange}
            />

            <PasswordField
              label="Password"
              id="password"
              name="password"
              placeholder="Enter your password"
              value={form.password}
              onChange={handleChange}
              hint="Must be at least 8 characters."
            />

            <div className="flex justify-end">
              <a href="#" className="text-xs text-gray-400 hover:text-[#264027] transition">
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-[#264027] hover:bg-[#1e3020] text-white font-bold text-sm rounded-xl transition-colors duration-200"
            >
              Sign In
            </button>
          </form>

          {/* Register link */}
          <p className="text-center text-sm text-gray-400 mt-6">
            Don't have an account?{' '}
            <a href="#" className="text-[#264027] font-bold hover:underline">
              Register
            </a>
          </p>

        </div>
      </div>

    </div>
  )
}
