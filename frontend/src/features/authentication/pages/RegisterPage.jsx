import { useState } from 'react'
import InputField from '../components/InputField'
import PasswordField from '../components/PasswordField'
import OAuthButton from '../components/OAuthButton'

export default function RegisterPage() {
  const [form, setForm] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    confirm_password: '',
  })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (form.password !== form.confirm_password) {
      alert('Passwords do not match!')
      return
    }
    // TODO: connect to Django backend
    console.log('Register submitted:', form)
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
            <h2 className="text-3xl font-bold text-[#1a2e35]">Create Account</h2>
            <p className="text-sm text-gray-400 mt-2 leading-relaxed">
              Enter your details to get started.
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
          <form onSubmit={handleSubmit} className="space-y-4">

            {/* First & Last Name side by side */}
            <div className="flex gap-3">
              <InputField
                label="First Name"
                id="first_name"
                name="first_name"
                placeholder="eg. John"
                value={form.first_name}
                onChange={handleChange}
              />
              <InputField
                label="Last Name"
                id="last_name"
                name="last_name"
                placeholder="eg. Santos"
                value={form.last_name}
                onChange={handleChange}
              />
            </div>

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

            <PasswordField
              label="Confirm Password"
              id="confirm_password"
              name="confirm_password"
              placeholder="Re-enter your password"
              value={form.confirm_password}
              onChange={handleChange}
            />

            <button
              type="submit"
              className="w-full py-3.5 bg-[#264027] hover:bg-[#1e3020] text-white font-bold text-sm rounded-xl transition-colors duration-200 mt-2"
            >
              Create Account
            </button>
          </form>

          {/* Login link */}
          <p className="text-center text-sm text-gray-400 mt-6">
            Already have an account?{' '}
            <a href="#" className="text-[#264027] font-bold hover:underline">
              Sign In
            </a>
          </p>

        </div>
      </div>

    </div>
  )
}
