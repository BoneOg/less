import { Icon } from '@iconify/react'

export default function OAuthButton({ provider, icon, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex-1 flex items-center justify-center gap-2.5 py-3 rounded-xl border border-gray-200 bg-white hover:bg-gray-50 text-[#1a2e35] text-sm font-semibold transition-colors duration-200"
    >
      <Icon icon={icon} className="text-xl" />
      {provider}
    </button>
  )
}
