import { useState, FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import AuthLayout from '../components/AuthLayout'
import AuthModal from '../components/AuthModal'
import AuthBranding from '../components/AuthBranding'
import EmailStep from '../components/forgot-password/EmailStep'
import CodeStep from '../components/forgot-password/CodeStep'
import ResetStep from '../components/forgot-password/ResetStep'

export default function ForgotPasswordPage() {
  const navigate = useNavigate()
  const [step, setStep] = useState<'email' | 'code' | 'reset'>('email')
  const [email, setEmail] = useState('')
  const [code, setCode] = useState(['', '', '', '', '', ''])
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showVerifyModal, setShowVerifyModal] = useState(false)
  const [showResetSuccessModal, setShowResetSuccessModal] = useState(false)

  const handleSubmitEmail = async (e: FormEvent) => {
    e.preventDefault()
    if (!email) return
    try {
      // In real scenario, await api.sendVerificationCode(email)
      setStep('code')
    } catch (err) {
      console.error(err)
    }
  }

  const handleVerifyCode = async (e: FormEvent) => {
    e.preventDefault()
    const fullCode = code.join('')
    if (fullCode.length < 6) return
    
    try {
      // In real scenario, await api.verifyCode(email, fullCode)
      setShowVerifyModal(true)
    } catch (err) {
      console.error(err)
    }
  }

  const handleResetPassword = async (e: FormEvent) => {
    e.preventDefault()
    if (!newPassword || newPassword !== confirmPassword) return
    
    try {
      // In real scenario, await api.resetPassword(email, code.join(''), newPassword)
      setShowResetSuccessModal(true)
    } catch (err) {
      console.error(err)
    }
  }

  const handleBack = () => {
    if (step === 'code') {
      setStep('email')
    } else if (step === 'reset') {
      setStep('code')
    } else {
      navigate('/login')
    }
  }

  return (
    <AuthLayout 
      leftContent={<AuthBranding variant={step === 'reset' ? 'reset' : 'minimal'} />} 
      onBack={handleBack}
    >
      <AuthModal 
        isOpen={showVerifyModal}
        type="success"
        title="Verification Successful"
        message="Your email has been verified. You can now reset your password."
        actionLabel="Reset Password"
        onAction={() => {
          setShowVerifyModal(false)
          setStep('reset')
        }}
      />

      <AuthModal 
        isOpen={showResetSuccessModal}
        type="success"
        title="Password Reset Done"
        message="Your password has been successfully reset. You can now log in with your new password."
        actionLabel="Go to Login"
        onAction={() => navigate('/login')}
      />

      {step === 'email' && (
        <EmailStep 
          email={email}
          setEmail={setEmail}
          onSubmit={handleSubmitEmail}
          onReturnToLogin={() => navigate('/login')}
        />
      )}

      {step === 'code' && (
        <CodeStep 
          code={code}
          setCode={setCode}
          onSubmit={handleVerifyCode}
          onResendCode={() => {}} // Handle resend
          onReturnToLogin={() => navigate('/login')}
        />
      )}

      {step === 'reset' && (
        <ResetStep 
          newPassword={newPassword}
          setNewPassword={setNewPassword}
          confirmPassword={confirmPassword}
          setConfirmPassword={setConfirmPassword}
          onSubmit={handleResetPassword}
          onReturnToLogin={() => navigate('/login')}
        />
      )}
    </AuthLayout>
  )
}
