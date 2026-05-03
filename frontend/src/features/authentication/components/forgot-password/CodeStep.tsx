import { FormEvent, useRef } from 'react'

interface CodeStepProps {
  code: string[];
  setCode: (code: string[]) => void;
  onSubmit: (e: FormEvent) => void;
  onResendCode: () => void;
  onReturnToLogin: () => void;
}

export default function CodeStep({ code, setCode, onSubmit, onResendCode, onReturnToLogin }: CodeStepProps) {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  const handleCodeChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return
    if (value.length > 1) value = value[value.length - 1]
    
    const newCode = [...code]
    newCode[index] = value
    setCode(newCode)

    if (value !== '' && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && code[index] === '' && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  return (
    <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000">
      <div className="mb-12">
        <h1 className="text-[40px] font-black text-on-surface tracking-tight leading-tight mb-4">
          Verify your email
        </h1>
        <p className="text-on-surface-variant font-medium tracking-tight leading-relaxed max-w-sm">
          We've sent a 6-digit code to your email. Enter it below to continue.
        </p>
      </div>

      <form onSubmit={onSubmit} className="space-y-12">
        <div className="flex justify-between gap-3">
          {code.map((digit, index) => (
            <input
              key={index}
              ref={(el) => { inputRefs.current[index] = el }}
              type="text"
              inputMode="numeric"
              autoComplete="one-time-code"
              pattern="\d{1}"
              maxLength={1}
              value={digit}
              onChange={(e) => handleCodeChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className="w-full aspect-[3/4] text-center text-3xl font-bold bg-white border border-outline-variant rounded-xl focus:border-[#4A6549] focus:ring-2 focus:ring-[#4A6549]/20 outline-none transition-all shadow-sm"
            />
          ))}
        </div>

        <button
          type="submit"
          disabled={code.join('').length < 6}
          className="w-full py-5 bg-[#4A6549] hover:bg-[#3d533c] disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold rounded-2xl transition-all duration-300 shadow-xl shadow-primary/10 hover:shadow-primary/20 active:scale-[0.98]"
        >
          Verify Code
        </button>
      </form>

      <div className="mt-12 flex flex-col items-center gap-6">
        <button
          type="button"
          onClick={onResendCode}
          className="text-[#4A6549] text-sm font-bold hover:underline underline-offset-4 transition-all"
        >
          Resend code
        </button>
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
