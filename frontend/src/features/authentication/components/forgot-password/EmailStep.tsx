import { ChangeEvent, FormEvent } from 'react'
import InputField from '../InputField'

interface EmailStepProps {
  email: string;
  setEmail: (email: string) => void;
  onSubmit: (e: FormEvent) => void;
  onReturnToLogin: () => void;
}

export default function EmailStep({ email, setEmail, onSubmit, onReturnToLogin }: EmailStepProps) {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000">
      <div className="mb-12">
        <h1 className="text-[40px] font-black text-on-surface tracking-tight leading-tight mb-4">
          Forgot password
        </h1>
        <p className="text-on-surface-variant font-medium tracking-tight leading-relaxed max-w-sm">
          Enter your email address and we'll send you a link to reset your password.
        </p>
      </div>

      <form onSubmit={onSubmit} className="space-y-8">
        <InputField
          label="Email address"
          id="email"
          name="email"
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
        />

        <button
          type="submit"
          className="w-full py-5 bg-[#4A6549] hover:bg-[#3d533c] text-white font-bold rounded-2xl transition-all duration-300 shadow-xl shadow-primary/10 hover:shadow-primary/20 active:scale-[0.98]"
        >
          Send reset link
        </button>
      </form>

      <div className="mt-12 text-center">
        <button
          type="button"
          onClick={onReturnToLogin}
          className="text-[#4A6549] text-sm font-bold hover:underline underline-offset-4 transition-all"
        >
          Return to login
        </button>
      </div>
    </div>
  )
}
