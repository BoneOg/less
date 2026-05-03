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

  const getStrengthLabel = (score: number) => {
    if (score === 0) return ''
    if (score === 1) return 'WEAK'
    if (score === 2) return 'FAIR'
    if (score === 3) return 'GOOD'
    if (score === 4) return 'STRONG PASSWORD'
    return ''
  }

  return (
    <div className="space-y-2">
      {/* Strength Bar */}
      <div className="flex gap-2 h-[4px]">
        {[1, 2, 3, 4].map((step) => (
          <div 
            key={step}
            className={`flex-1 rounded-full transition-all duration-500 ${
              strength >= step ? 'bg-[#4A6549]' : 'bg-outline-variant/30'
            }`} 
          />
        ))}
      </div>

      {/* Strength Label */}
      <div className="px-1">
        <p className={`text-[10px] font-black tracking-widest uppercase transition-colors duration-300 ${strength >= 3 ? 'text-[#4A6549]' : 'text-on-surface-variant/60'}`}>
          {getStrengthLabel(strength)}
        </p>
      </div>
    </div>
  )
}
