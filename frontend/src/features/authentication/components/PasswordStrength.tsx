import { useMemo } from 'react'

interface PasswordStrengthProps {
  password: string;
}

export default function PasswordStrength({ password }: PasswordStrengthProps) {
  const calculateStrength = (pass: string) => {
    let score = 0
    if (!pass) return 0
    if (pass.length > 6) score++
    if (pass.length > 10) score++
    if (/[A-Z]/.test(pass) && /[a-z]/.test(pass)) score++
    if (/[0-9]/.test(pass) || /[^A-Za-z0-9]/.test(pass)) score++
    return score
  }

  const strength = useMemo(() => calculateStrength(password), [password])
  
  const hasUppercase = /[A-Z]/.test(password)
  const hasNumber = /[0-9]/.test(password)
  const hasSymbol = /[^A-Za-z0-9]/.test(password)
  const hasLength = password.length >= 8

  const getStrengthColor = (score: number) => {
    if (score === 1) return 'bg-error'
    if (score === 2) return 'bg-[#D4A373]'
    if (score === 3) return 'bg-primary-container'
    if (score === 4) return 'bg-primary'
    return 'bg-outline-variant'
  }

  const requirements = [
    { label: '8 Chars', met: hasLength },
    { label: '1 Uppercase', met: hasUppercase },
    { label: '1 Number', met: hasNumber },
    { label: '1 Symbol', met: hasSymbol },
  ]

  return (
    <div className="space-y-4 pt-2">
      {/* Strength Bar */}
      <div className="flex gap-1.5 h-1.5">
        {[1, 2, 3, 4].map((step) => (
          <div 
            key={step}
            className={`flex-1 rounded-full transition-all duration-500 ${
              strength >= step ? getStrengthColor(strength) : 'bg-outline-variant/30'
            }`} 
          />
        ))}
      </div>

      {/* Requirement Labels */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-y-3 gap-x-2 px-1">
        {requirements.map((req) => (
          <div key={req.label} className="flex items-center gap-1.5">
            <span 
              className={`material-symbols-outlined text-[14px] ${req.met ? 'text-primary' : 'text-on-surface-variant/40'}`}
              style={{ fontVariationSettings: `'FILL' ${req.met ? 1 : 0}` }}
            >
              {req.met ? 'check_circle' : 'circle'}
            </span>
            <span className={`text-[10px] font-bold tracking-tight ${req.met ? 'text-on-surface' : 'text-on-surface-variant/50'}`}>
              {req.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
