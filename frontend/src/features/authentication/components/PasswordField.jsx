import { useState } from 'react'
import { Icon } from '@iconify/react'

export default function PasswordField({ label, id, name, placeholder, value, onChange, hint }) {
  const [show, setShow] = useState(false)

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-sm font-semibold text-[#1a2e35]">
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          name={name}
          type={show ? 'text' : 'password'}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required
          className="w-full px-4 py-3.5 pr-12 rounded-xl border border-gray-200 bg-gray-50 text-[#1a2e35] text-sm placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#264027]/80 transition"
        />
        <button
          type="button"
          onClick={() => setShow(!show)}
          className="absolute inset-y-0 right-4 flex items-center text-gray-300 hover:text-[#264027] transition"
          aria-label={show ? 'Hide password' : 'Show password'}
        >
          <Icon icon={show ? 'solar:eye-linear' : 'solar:eye-closed-linear'} className="text-xl" />
        </button>
      </div>
      {hint && <p className="text-xs text-gray-400 mt-0.5">{hint}</p>}
    </div>
  )
}
