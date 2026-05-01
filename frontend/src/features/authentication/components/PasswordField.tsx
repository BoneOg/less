import { useState, ChangeEvent } from 'react'
import { Icon } from '@iconify/react'

interface PasswordFieldProps {
  label: string;
  id: string;
  name: string;
  placeholder: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  hint?: string;
}

export default function PasswordField({ label, id, name, placeholder, value, onChange, hint }: PasswordFieldProps) {
  const [show, setShow] = useState(false)

  return (
    <div className="flex flex-col gap-2">
      <div className="relative">
        <input
          id={id}
          name={name}
          type={show ? 'text' : 'password'}
          placeholder={placeholder || label}
          value={value}
          onChange={onChange}
          required
          className="w-full px-6 py-4 pr-14 rounded-xl border border-outline-variant bg-surface-container-low text-on-surface text-sm placeholder-on-surface-variant/50 focus:outline-none focus:ring-1 focus:ring-primary transition-all duration-300"
        />
        <button
          type="button"
          onClick={() => setShow(!show)}
          className="absolute inset-y-0 right-6 flex items-center text-on-surface-variant/40 hover:text-primary transition-colors"
          aria-label={show ? 'Hide password' : 'Show password'}
        >
          <Icon icon={show ? 'solar:eye-linear' : 'solar:eye-closed-linear'} className="text-xl" />
        </button>
      </div>
      {hint && <p className="text-[10px] text-on-surface-variant font-medium mt-0.5 tracking-tight">{hint}</p>}
    </div>
  )
}
