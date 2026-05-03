import { Icon } from '@iconify/react'

interface AuthModalProps {
  isOpen: boolean;
  type: 'success' | 'error';
  title: string;
  message: string;
  actionLabel?: string;
  onAction?: () => void;
  secondaryActionLabel?: string;
  onSecondaryAction?: () => void;
}

export default function AuthModal({
  isOpen,
  type,
  title,
  message,
  actionLabel,
  onAction,
  secondaryActionLabel,
  onSecondaryAction
}: AuthModalProps) {
  if (!isOpen) return null

  const isSuccess = type === 'success'

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-surface w-full max-w-md rounded-[2.5rem] p-10 shadow-2xl animate-in zoom-in-95 duration-300 border border-outline-variant">
        <div className={`w-20 h-20 rounded-full flex items-center justify-center mb-8 mx-auto ${
          isSuccess ? 'bg-primary/20' : 'bg-primary-container'
        }`}>
          <Icon 
            icon={isSuccess ? 'solar:check-circle-bold-duotone' : 'solar:user-plus-bold-duotone'} 
            className={`text-9xl ${isSuccess ? 'text-primary' : 'text-on-primary-container'}`} 
          />
        </div>
        
        <h3 className="text-2xl font-black text-on-surface text-center mb-4 tracking-tight">
          {title}
        </h3>
        
        <p className="text-on-surface-variant text-center mb-4 leading-relaxed font-medium text-sm px-4">
          {message}
        </p>

        <div className={`grid ${secondaryActionLabel ? 'grid-cols-2' : 'grid-cols-1'} gap-4`}>
          {secondaryActionLabel && (
            <button
              onClick={onSecondaryAction}
              className="py-4 px-6 bg-surface-container-low text-on-surface-variant font-bold rounded-2xl hover:bg-surface-container transition-all active:scale-95 text-xs uppercase tracking-widest"
            >
              {secondaryActionLabel}
            </button>
          )}
          
          {actionLabel && (
            <button
              onClick={onAction}
              className={`py-4 px-6 font-bold rounded-2xl hover:opacity-90 transition-all active:scale-95 text-xs uppercase tracking-widest shadow-lg ${
                isSuccess 
                  ? 'bg-primary text-on-primary shadow-primary/20' 
                  : 'bg-primary text-on-primary shadow-primary/20'
              }`}
            >
              {actionLabel}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
