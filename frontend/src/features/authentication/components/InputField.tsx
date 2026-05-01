import { ChangeEvent } from 'react';

interface InputFieldProps {
  label: string;
  id: string;
  name: string;
  type?: string;
  placeholder: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  hint?: string;
}

export default function InputField({ label, id, name, type = 'text', placeholder, value, onChange, hint }: InputFieldProps) {
  return (
    <div className="flex flex-col gap-2">
      <input
        id={id}
        name={name}
        type={type}
        placeholder={placeholder || label}
        value={value}
        onChange={onChange}
        required
        className="w-full px-6 py-4 rounded-xl border border-outline-variant bg-surface-container-low text-on-surface text-sm placeholder-on-surface-variant/50 focus:outline-none focus:ring-1 focus:ring-primary transition-all duration-300"
      />
      {hint && <p className="text-[10px] text-on-surface-variant font-medium mt-0.5 tracking-tight">{hint}</p>}
    </div>
  )
}
