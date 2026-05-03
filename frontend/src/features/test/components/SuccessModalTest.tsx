import { Icon } from '@iconify/react'

interface SuccessModalTestProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SuccessModalTest({ isOpen, onClose }: SuccessModalTestProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-surface w-full max-w-md rounded-[2.5rem] p-10 shadow-2xl animate-in zoom-in-95 duration-300 border border-outline-variant relative">
        <button 
          onClick={onClose}
          className="absolute top-8 right-8 w-10 h-10 flex items-center justify-center rounded-full hover:bg-surface-container transition-all active:scale-90 group"
        >
          <Icon icon="solar:close-circle-linear" className="text-2xl text-on-surface-variant group-hover:text-primary transition-colors" />
        </button>

        <div className="w-20 h-20 rounded-full flex items-center justify-center mb-8 mx-auto bg-primary/20">
          <Icon 
            icon="solar:check-circle-bold-duotone" 
            className="text-9xl text-primary" 
          />
        </div>
        
        <h3 className="text-2xl font-black text-on-surface text-center mb-4 tracking-tight">
          Registration Successful
        </h3>
        
        <p className="text-on-surface-variant text-center mb-4 leading-relaxed font-medium text-sm px-4">
          Welcome to a simpler workflow. You're being redirected to login.
        </p>
      </div>
    </div>
  )
}
