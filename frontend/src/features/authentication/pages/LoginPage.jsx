import { useState } from 'react'
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

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await login(form)
      navigate('/dashboard')
    } catch (err) {
      const errorMsg = err.response?.data?.detail || err.message || ''
      if (errorMsg.includes('Account not found')) {
        setShowErrorModal(true)
      } else if (errorMsg.includes('Wrong password')) {
        alert('The password you entered is incorrect. Please try again.')
      } else {
        alert('Invalid credentials')
      }
    }
  }

  return (
    <div className="min-h-screen flex relative">
      {}
      {showErrorModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-md rounded-[2.5rem] p-10 shadow-2xl animate-in zoom-in-95 duration-300">
            <div className="w-20 h-20 bg-emerald-50 rounded-3xl flex items-center justify-center mb-8 mx-auto">
              <Icon icon="solar:user-plus-bold-duotone" className="text-4xl text-emerald-600" />
            </div>
            <h3 className="text-2xl font-black text-slate-900 text-center mb-4">Account Not Found</h3>
            <p className="text-slate-500 text-center mb-10 leading-relaxed font-medium">
              We couldn't find an account with that email address. Would you like to create a new one instead?
            </p>
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => setShowErrorModal(false)}
                className="py-4 px-6 bg-slate-50 text-slate-600 font-bold rounded-2xl hover:bg-slate-100 transition-all active:scale-95"
              >
                Try Again
              </button>
              <button
                onClick={() => navigate('/register')}
                className="py-4 px-6 bg-[#264027] text-white font-bold rounded-2xl hover:opacity-90 shadow-lg shadow-emerald-900/20 transition-all active:scale-95"
              >
                Register Now
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="flex w-1/2 items-center justify-center bg-[#264027]">
        <div className="text-center">
          <h1 className="text-7xl font-bold text-white tracking-widest">LESS</h1>
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center bg-white px-10 py-12">
        <div className="w-full max-w-sm">
          <div className="text-center mb-7">
            <h2 className="text-3xl font-bold text-[#1a2e35]">Sign in Account</h2>
            <p className="text-sm text-gray-400 mt-2 leading-relaxed">
              Enter your credentials to access your account.
            </p>
          </div>

          <div className="flex gap-3 mb-6">
            <OAuthButton provider="Google" icon="logos:google-icon" onClick={() => {}} />
            <OAuthButton provider="Microsoft" icon="logos:microsoft-icon" onClick={() => {}} />
          </div>

          <div className="flex items-center gap-3 mb-6">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-xs text-gray-400 font-medium">or</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <InputField
              label="Email"
              id="email"
              name="email"
              type="email"
              placeholder="eg. user@restaurant.com"
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

          <p className="text-center text-sm text-gray-400 mt-6">
            Don't have an account?{' '}
            <button
              type="button"
              onClick={() => navigate('/register')}
              className="text-[#264027] font-bold hover:underline"
            >
              Register
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}
