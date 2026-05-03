import React, { useState } from 'react'
import AuthLayout from '../../authentication/components/AuthLayout'
import SuccessModalTest from '../components/SuccessModalTest'

export default function TestPage() {
  const [showSuccess, setShowSuccess] = useState(false)

  const leftContent = (
    <div className="flex flex-col justify-center h-full w-full p-16 bg-surface-container">
      <h1 className="text-4xl font-bold text-primary mb-4">Design Playground</h1>
      <p className="text-on-surface-variant font-medium">
        Use this page to test new components, layouts, and styles without breaking the main flow.
      </p>
    </div>
  )

  return (
    <AuthLayout leftContent={leftContent} backTo="/login">
      <SuccessModalTest 
        isOpen={showSuccess}
        onClose={() => setShowSuccess(false)}
      />

      <div className="space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-1000">
        <div className="space-y-2">
          <h2 className="text-3xl font-black text-on-surface tracking-tight">Test Components</h2>
          <p className="text-on-surface-variant font-medium italic">Click the button below to test designs.</p>
        </div>

        <div className="pt-4">
           <button 
              onClick={() => setShowSuccess(true)}
              className="px-8 py-4 bg-primary text-on-primary font-bold rounded-2xl hover:opacity-90 shadow-xl shadow-primary/20 transition-all active:scale-95 text-sm uppercase tracking-widest"
           >
             Preview Success Modal
           </button>
        </div>
      </div>
    </AuthLayout>
  )
}
