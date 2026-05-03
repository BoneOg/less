import { ChangeEvent, FormEvent, useState } from 'react'
import InputField from '../InputField'
import PasswordStrength from '../PasswordStrength'

interface ResetStepProps {
  newPassword: string;
  setNewPassword: (password: string) => void;
  confirmPassword: string;
  setConfirmPassword: (password: string) => void;
  onSubmit: (e: FormEvent) => void;
  onReturnToLogin: () => void;
}

export default function ResetStep({ 
  newPassword, 
  setNewPassword, 
  confirmPassword, 
  setConfirmPassword, 
  onSubmit, 
  onReturnToLogin 
}: ResetStepProps) {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000">
      <div className="mb-12">
        <h1 className="text-[40px] font-black text-on-surface tracking-tight leading-tight mb-4">
          Create new password
        </h1>
        <p className="text-on-surface-variant font-medium tracking-tight leading-relaxed max-w-sm">
          Enter your new password below.
        </p>
      </div>

      <form onSubmit={onSubmit} className="space-y-8">
        <div className="relative group">
          <InputField
            label="New Password"
            id="newPassword"
            name="newPassword"
            type={showPassword ? 'text' : 'password'}
            placeholder="........"
            value={newPassword}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setNewPassword(e.target.value)}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-6 top-[42px] text-on-surface-variant/50 hover:text-primary transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">
              {showPassword ? 'visibility' : 'visibility_off'}
            </span>
          </button>
          <div className="mt-4">
            <PasswordStrength password={newPassword} />
          </div>
        </div>

        <InputField
          label="Confirm Password"
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          placeholder="........"
          value={confirmPassword}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setConfirmPassword(e.target.value)}
        />

        <button
          type="submit"
          disabled={!newPassword || newPassword !== confirmPassword}
          className="w-full py-5 bg-[#4A6549] hover:bg-[#3d533c] disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold rounded-2xl transition-all duration-300 shadow-xl shadow-primary/10 hover:shadow-primary/20 active:scale-[0.98]"
        >
          Reset Password
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
