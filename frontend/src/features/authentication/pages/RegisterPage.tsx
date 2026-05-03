import { useState, ChangeEvent, FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import InputField from '../components/InputField'
import PasswordField from '../components/PasswordField'
import OAuthButton from '../components/OAuthButton'
import AuthLayout from '../components/AuthLayout'
import PasswordStrength from '../components/PasswordStrength'
import AuthModal from '../components/AuthModal'

import AuthBranding from '../components/AuthBranding'

export default function RegisterPage() {
  const navigate = useNavigate()
  const { register } = useAuth()
  const [form, setForm] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    confirm_password: '',
  })

  const [showSuccessModal, setShowSuccessModal] = useState(false)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (form.password !== form.confirm_password) {
      alert('Passwords do not match!')
      return
    }

    try {
      await register(form)
      setShowSuccessModal(true)
      setTimeout(() => {
        navigate('/login')
      }, 3000)
    } catch (err: any) {
      alert(err.response?.data?.email?.[0] || 'Registration failed. Please check your details.')
      console.error(err)
    }
  }

  return (
    <AuthLayout leftContent={<AuthBranding variant="minimal" description="The path to essentialism begins with a single, intentional step. Simplify your workflow." />} backTo="/login">
      <AuthModal 
        isOpen={showSuccessModal}
        type="success"
        title="Registration Successful"
        message="Welcome to a simpler workflow. You're being redirected to login."
      />

      {/* Heading Group */}
      <div className="space-y-2 text-center mb-8">
        <h1 className="text-[40px] font-bold text-on-surface tracking-tight">Create an account</h1>
        <p className="text-on-surface-variant font-medium">
          Join the movement toward focus.
        </p>
      </div>

      {/* OAuth Section */}
      <div className="flex flex-row gap-4 w-full mb-6">
        <OAuthButton provider="" icon="logos:google-icon" onClick={() => {}} />
        <OAuthButton provider="" icon="logos:apple" onClick={() => {}} />
        <OAuthButton provider="" icon="logos:microsoft-icon" onClick={() => {}} />
      </div>

      <div className="relative flex items-center py-2 mb-6">
        <div className="flex-grow border-t border-outline-variant"></div>
        <span className="flex-shrink mx-4 text-[10px] font-black text-on-surface-variant uppercase tracking-[0.2em]">or register with email</span>
        <div className="flex-grow border-t border-outline-variant"></div>
      </div>

      {/* Main Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <InputField
            label="First Name"
            id="first_name"
            name="first_name"
            placeholder="Jane"
            value={form.first_name}
            onChange={handleChange}
          />
          <InputField
            label="Last Name"
            id="last_name"
            name="last_name"
            placeholder="Doe"
            value={form.last_name}
            onChange={handleChange}
          />
        </div>

        <InputField
          label="Email"
          id="email"
          name="email"
          type="email"
          placeholder="jane@example.com"
          value={form.email}
          onChange={handleChange}
        />

        <PasswordField
          label="Password"
          id="password"
          name="password"
          placeholder="••••••••"
          value={form.password}
          onChange={handleChange}
        />

        <PasswordField
          label="Confirm Password"
          id="confirm_password"
          name="confirm_password"
          placeholder="••••••••"
          value={form.confirm_password}
          onChange={handleChange}
        />

        <PasswordStrength password={form.password} />

        <button 
          type="submit"
          className="w-full bg-[#4A6549] hover:bg-[#3d533c] transition-all duration-300 text-white font-bold text-lg py-4 rounded-xl shadow-lg shadow-primary/10 active:scale-[0.98] mt-2"
        >
          Create Account
        </button>
      </form>

      <div className="text-center text-sm text-on-surface-variant mt-8">
        Already have an account?{' '}
        <button 
          onClick={() => navigate('/login')}
          className="text-primary font-bold hover:underline underline-offset-4"
        >
          Log In
        </button>
      </div>
    </AuthLayout>
  )
}
