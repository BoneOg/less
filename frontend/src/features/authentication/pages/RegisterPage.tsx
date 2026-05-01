import { useState, ChangeEvent, FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import InputField from '../components/InputField'
import PasswordField from '../components/PasswordField'
import OAuthButton from '../components/OAuthButton'

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

  // Simple password strength logic
  const hasCapital = /[A-Z]/.test(form.password)
  const hasNumber = /[0-9]/.test(form.password)
  const hasSymbol = /[^A-Za-z0-9]/.test(form.password)
  const hasLength = form.password.length >= 8

  return (
    <div className="min-h-screen flex bg-surface overflow-hidden">
      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/10 backdrop-blur-md animate-in fade-in duration-500">
          <div className="bg-white w-full max-w-[400px] rounded-[2.5rem] p-12 shadow-2xl animate-in zoom-in-95 duration-500 flex flex-col items-center text-center border border-outline-variant/30">
            <div className="w-20 h-20 bg-primary/5 rounded-full flex items-center justify-center mb-8">
              <span className="material-symbols-outlined text-[40px] text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>
                check_circle
              </span>
            </div>
            <h3 className="text-2xl font-bold text-on-surface mb-2 tracking-tight">Registration Successful</h3>
            <p className="text-on-surface-variant font-medium">Welcome to a simpler workflow.</p>
          </div>
        </div>
      )}
      {/* Floating Branding for Mobile */}
      <div className="fixed top-8 left-8 lg:hidden z-50">
        <div className="text-2xl font-bold lowercase text-on-surface tracking-tighter">
          less.
        </div>
      </div>

      {/* Left Side: Brand Imagery */}
      <section className="relative hidden lg:flex lg:w-1/2 h-screen overflow-hidden bg-surface-container">
        <div className="absolute inset-0 w-full h-full bg-[#E5E7E1]/30 flex items-center justify-center p-20">
          <div className="bg-[#F2F1EC] w-full max-w-lg aspect-square rounded-[4rem] flex items-center justify-center shadow-inner relative overflow-hidden">
             <div className="text-[120px] font-black text-primary/20 leading-none tracking-tighter select-none">less.</div>
             <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"></div>
          </div>
        </div>
        {/* Branding Overlay */}
        <div className="relative z-10 flex flex-col justify-between w-full h-full p-12">
          <div className="space-y-6">
            <div className="text-2xl font-bold lowercase text-on-surface tracking-tighter">
              less.
            </div>
            <p className="text-on-surface-variant font-medium max-w-xs leading-relaxed">
              The path to essentialism begins with a single, intentional step. Simplify your workflow.
            </p>
          </div>
          <div className="text-sm text-on-surface-variant opacity-60 font-medium">
            @2026 less.
          </div>
        </div>
      </section>

      {/* Right Side: Register Form Container */}
      <section className="w-full lg:w-1/2 h-screen flex flex-col bg-surface relative overflow-y-auto custom-scrollbar">
        {/* Top Navigation */}
        <div className="px-8 md:px-12 py-8 flex items-center">
          <button 
            onClick={() => navigate('/login')}
            className="p-2 -ml-2 rounded-full hover:bg-surface-container-high transition-colors text-on-surface group"
          >
            <span className="material-symbols-outlined group-hover:scale-110 transition-transform">arrow_back</span>
          </button>
        </div>

        {/* Form Content */}
        <div className="flex-grow flex items-center justify-center px-8 py-12">
          <div className="w-full max-w-[460px] space-y-10">
            {/* Heading Group */}
            <div className="space-y-4 text-center">
              <h1 className="text-[40px] font-bold text-on-surface tracking-tight">Create an account</h1>
              <p className="text-on-surface-variant font-medium">
                Join the movement toward focus.
              </p>
            </div>

            {/* OAuth Section (At top as per image) */}
            <div className="flex flex-row gap-4 w-full">
              <OAuthButton provider="" icon="logos:google-icon" onClick={() => {}} />
              <OAuthButton provider="" icon="logos:apple" onClick={() => {}} />
              <OAuthButton provider="" icon="logos:microsoft-icon" onClick={() => {}} />
            </div>

            <div className="relative flex items-center py-2">
              <div className="flex-grow border-t border-outline-variant"></div>
              <span className="flex-shrink mx-4 text-[10px] font-black text-on-surface-variant uppercase tracking-[0.2em]">or register with email</span>
              <div className="flex-grow border-t border-outline-variant"></div>
            </div>

            {/* Main Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-on-surface-variant ml-1">First Name</label>
                  <InputField
                    label="First Name"
                    id="first_name"
                    name="first_name"
                    placeholder="Jane"
                    value={form.first_name}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-on-surface-variant ml-1">Last Name</label>
                  <InputField
                    label="Last Name"
                    id="last_name"
                    name="last_name"
                    placeholder="Doe"
                    value={form.last_name}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-on-surface-variant ml-1">Email</label>
                <InputField
                  label="Email"
                  id="email"
                  name="email"
                  type="email"
                  placeholder="jane@example.com"
                  value={form.email}
                  onChange={handleChange}
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-on-surface-variant ml-1">Password</label>
                <PasswordField
                  label="Password"
                  id="password"
                  name="password"
                  placeholder="••••••••"
                  value={form.password}
                  onChange={handleChange}
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-on-surface-variant ml-1">Confirm Password</label>
                <PasswordField
                  label="Confirm Password"
                  id="confirm_password"
                  name="confirm_password"
                  placeholder="••••••••"
                  value={form.confirm_password}
                  onChange={handleChange}
                />
              </div>

              {/* Password Strength Indicator */}
              <div className="space-y-4 pt-2">
                <div className="flex gap-2 h-1.5">
                  <div className={`flex-1 rounded-full transition-all duration-500 ${hasLength ? 'bg-primary/40' : 'bg-outline-variant'}`} />
                  <div className={`flex-1 rounded-full transition-all duration-500 ${hasCapital ? 'bg-primary/60' : 'bg-outline-variant'}`} />
                  <div className={`flex-1 rounded-full transition-all duration-500 ${hasNumber ? 'bg-primary/80' : 'bg-outline-variant'}`} />
                  <div className={`flex-1 rounded-full transition-all duration-500 ${hasSymbol ? 'bg-primary' : 'bg-outline-variant'}`} />
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-y-3 gap-x-2 px-1">
                  <div className="flex items-center gap-1.5">
                    <span 
                      className={`material-symbols-outlined text-[14px] ${hasLength ? 'text-primary' : 'text-outline-variant/60'}`}
                      style={{ fontVariationSettings: `'FILL' ${hasLength ? 1 : 0}` }}
                    >
                      {hasLength ? 'check_circle' : 'circle'}
                    </span>
                    <span className={`text-[10px] font-medium  tracking-tight ${hasLength ? 'text-on-surface' : 'text-on-surface-variant/50'}`}>8 Chars</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span 
                      className={`material-symbols-outlined text-[14px] ${hasCapital ? 'text-primary' : 'text-outline-variant/60'}`}
                      style={{ fontVariationSettings: `'FILL' ${hasCapital ? 1 : 0}` }}
                    >
                      {hasCapital ? 'check_circle' : 'circle'}
                    </span>
                    <span className={`text-[10px] font-medium  tracking-tight ${hasCapital ? 'text-on-surface' : 'text-on-surface-variant/50'}`}>1 Capital</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span 
                      className={`material-symbols-outlined text-[14px] ${hasNumber ? 'text-primary' : 'text-outline-variant/60'}`}
                      style={{ fontVariationSettings: `'FILL' ${hasNumber ? 1 : 0}` }}
                    >
                      {hasNumber ? 'check_circle' : 'circle'}
                    </span>
                    <span className={`text-[10px] font-medium tracking-tight ${hasNumber ? 'text-on-surface' : 'text-on-surface-variant/50'}`}>1 Number</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span 
                      className={`material-symbols-outlined text-[14px] ${hasSymbol ? 'text-primary' : 'text-outline-variant/60'}`}
                      style={{ fontVariationSettings: `'FILL' ${hasSymbol ? 1 : 0}` }}
                    >
                      {hasSymbol ? 'check_circle' : 'circle'}
                    </span>
                    <span className={`text-[10px] font-medium tracking-tight ${hasSymbol ? 'text-on-surface' : 'text-on-surface-variant/50'}`}>1 Symbol</span>
                  </div>
                </div>
              </div>

              <button 
                type="submit"
                className="w-full bg-[#4A6549] hover:bg-[#3d533c] transition-all duration-300 text-white font-bold text-lg py-4 rounded-xl shadow-lg shadow-primary/10 active:scale-[0.98] mt-6"
              >
                Create Account
              </button>
            </form>

            <div className="text-center text-sm text-on-surface-variant">
              Already have an account?{' '}
              <button 
                onClick={() => navigate('/login')}
                className="text-primary font-bold hover:underline underline-offset-4"
              >
                Log In
              </button>
            </div>
          </div>
        </div>

        {/* Footer Section */}
        <footer className="w-full py-8 px-12 mt-auto">
          <div className="flex justify-center gap-8 border-t border-outline-variant/30 pt-8">
            <button className="text-xs font-bold text-on-surface-variant hover:text-on-surface transition-colors uppercase tracking-widest">privacy</button>
            <button className="text-xs font-bold text-on-surface-variant hover:text-on-surface transition-colors uppercase tracking-widest">terms</button>
            <button className="text-xs font-bold text-on-surface-variant hover:text-on-surface transition-colors uppercase tracking-widest">contact</button>
          </div>
        </footer>
      </section>
    </div>
  )
}
