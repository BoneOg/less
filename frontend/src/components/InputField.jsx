export default function InputField({ label, id, name, type = 'text', placeholder, value, onChange, hint }) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-sm font-semibold text-[#1a2e35]">
        {label}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required
        className="w-full px-4 py-3.5 rounded-xl border border-gray-200 bg-gray-50 text-[#1a2e35] text-sm placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#264027]/80 transition"
      />
      {hint && <p className="text-xs text-gray-400 mt-0.5">{hint}</p>}
    </div>
  )
}
