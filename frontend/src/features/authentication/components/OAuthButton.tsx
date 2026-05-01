import { Icon } from '@iconify/react'

interface OAuthButtonProps {
  provider: string;
  icon: string;
  onClick: () => void;
}

export default function OAuthButton({ provider, icon, onClick }: OAuthButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex-1 flex items-center justify-center gap-3 py-3.5 rounded-xl border border-outline-variant bg-surface hover:bg-surface-container-low text-on-surface-variant text-[11px] font-black uppercase tracking-widest transition-all duration-300"
    >
      <Icon icon={icon} className="text-lg" />
      {provider}
    </button>
  )
}
