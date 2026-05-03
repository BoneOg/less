import { ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'

interface AuthLayoutProps {
  children: ReactNode;
  leftContent: ReactNode;
  backTo?: string;
  topRightContent?: ReactNode;
}

export default function AuthLayout({ children, leftContent, backTo = '/', topRightContent }: AuthLayoutProps) {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen flex bg-surface overflow-hidden">
      {/* Left Branding Section */}
      <section className="relative hidden lg:flex w-[55%] h-screen overflow-hidden bg-surface-container border-r border-outline-variant">
        {leftContent}
      </section>

      {/* Right Form Section */}
      <section className="flex-1 h-screen flex flex-col bg-surface relative overflow-y-auto custom-scrollbar">
        {/* Top Navigation */}
        <div className="p-8 lg:p-12 flex justify-between items-center">
          <button 
            onClick={() => navigate(backTo)}
            className="w-12 h-12 flex items-center justify-center rounded-full hover:bg-surface-container-low transition-all active:scale-90 group"
          >
            <span className="material-symbols-outlined text-on-surface-variant group-hover:text-primary transition-colors">arrow_back</span>
          </button>

          {topRightContent && (
            <div className="flex items-center">
              {topRightContent}
            </div>
          )}
        </div>

        {/* Content Section */}
        <div className="flex-grow flex items-center justify-center px-8 py-8">
          <div className="w-full max-w-[460px]">
            {children}
          </div>
        </div>

        {/* Footer Section */}
        <footer className="w-full p-8 lg:p-12 mt-auto">
          <div className="flex justify-center gap-8 border-t border-outline-variant/30 pt-8">
            <button className="text-xs font-bold text-on-surface-variant hover:text-on-surface transition-colors uppercase tracking-widest">privacy</button>
            <button className="text-xs font-bold text-on-surface-variant hover:text-on-surface transition-colors uppercase tracking-widest">terms</button>
            <button className="text-xs font-bold text-on-surface-variant hover:text-on-surface transition-colors uppercase tracking-widest">contact</button>
          </div>
        </footer>
      </section>
    </div>
  )
}
