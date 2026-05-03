
interface AuthBrandingProps {
  variant?: 'default' | 'minimal' | 'reset';
  title?: string;
  description?: string;
}

export default function AuthBranding({
  variant = 'default',
  title = 'less.',
  description = 'Clarity in every interaction. Designed for the essential.'
}: AuthBrandingProps) {

  if (variant === 'reset') {
    return (
      <>
        <div className="absolute inset-0 w-full h-full bg-[#70866A] flex items-center justify-center overflow-hidden transition-colors duration-1000">
          <div className="relative w-full h-full flex items-center justify-center p-20">
            <div className="text-[320px] font-black text-white/5 leading-none tracking-tighter select-none absolute left-[-100px] top-1/2 -translate-y-1/2 rotate-[-5deg]">less.</div>
            <div className="text-[320px] font-black text-white/5 leading-none tracking-tighter select-none absolute right-[-100px] top-1/3 -translate-y-1/2 rotate-[15deg]">less.</div>
          </div>
        </div>
        <div className="relative z-10 flex flex-col justify-between w-full h-full p-16">
          <div className="mt-auto mb-32 space-y-8 animate-in fade-in slide-in-from-left-8 duration-1000">
            <div className="text-[80px] font-black leading-none tracking-tighter text-white">
              {title}
            </div>
            <p className="font-medium max-w-sm text-xl leading-relaxed text-white/80">
              {description}
            </p>
          </div>
          <div className="text-sm font-medium animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-500 uppercase tracking-widest text-white/60">
            © 2026 less.
          </div>
        </div>
      </>
    )
  }

  if (variant === 'minimal') {
    return (
      <>
        <div className="absolute inset-0 w-full h-full bg-[#E5E7E1]/30 flex items-center justify-center p-20 transition-colors duration-1000">
          <div className="bg-[#F2F1EC] w-full max-w-sm aspect-square rounded-[2rem] flex items-center justify-center shadow-inner relative overflow-hidden animate-in fade-in zoom-in duration-1000 delay-200">
            <div className="text-[100px] font-black text-primary/20 leading-none tracking-tighter select-none">less.</div>
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"></div>
          </div>
        </div>
        <div className="relative z-10 flex flex-col justify-between w-full h-full p-16">
          <div className="mt-auto mb-32 space-y-8 animate-in fade-in slide-in-from-left-8 duration-1000">
            <div className="text-[80px] font-black text-on-surface leading-none tracking-tighter">
              {title}
            </div>
            <p className="text-on-surface-variant font-medium max-w-sm text-xl leading-relaxed">
              {description}
            </p>
          </div>
          <div className="text-sm text-on-surface-variant opacity-60 font-medium animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-500 uppercase tracking-widest">
            © 2026 less.
          </div>
        </div>
      </>
    )
  }

  return (
    <div className="flex flex-col justify-between h-full w-full p-16 bg-background relative overflow-hidden">
      <div className="animate-in fade-in slide-in-from-left-8 duration-1000">
        <div className="text-xl font-bold tracking-tighter text-on-surface">{title}</div>
      </div>

      <div className="relative z-10 animate-in fade-in zoom-in duration-1000 delay-200">
        <h1 className="text-[180px] font-black text-primary leading-none tracking-[-0.08em] opacity-80 mix-blend-multiply">
          less<span className="text-primary-container">.</span>
        </h1>
      </div>

      <div className="text-sm text-on-surface-variant opacity-60 font-medium animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-500">
        @2026 less.
      </div>

      {/* Decorative elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[radial-gradient(circle_at_center,rgba(139,168,136,0.08)_0%,transparent_70%)] pointer-events-none"></div>
    </div>
  )
}
