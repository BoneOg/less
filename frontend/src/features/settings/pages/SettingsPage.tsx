import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Icon } from '@iconify/react'
import { useAuth } from '../../authentication/hooks/useAuth'
import { authService } from '../../authentication/services/authService'

export default function SettingsPage() {
  const navigate = useNavigate()
  const { user, refreshUser, logout } = useAuth()

  const [profileForm, setProfileForm] = useState({
    first_name: user?.first_name || '',
    last_name: user?.last_name || '',
  })
  const [isUpdatingProfile, setIsUpdatingProfile] = useState(false)
  const [profileSuccess, setProfileSuccess] = useState('')

  const [passwordForm, setPasswordForm] = useState({
    current_password: '',
    new_password: '',
  })
  const [isChangingPassword, setIsChangingPassword] = useState(false)
  const [passwordSuccess, setPasswordSuccess] = useState('')
  const [passwordError, setPasswordError] = useState('')

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfileForm({ ...profileForm, [e.target.name]: e.target.value })
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordForm({ ...passwordForm, [e.target.name]: e.target.value })
  }

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsUpdatingProfile(true)
    setProfileSuccess('')
    try {
      await authService.updateProfile(profileForm)
      await refreshUser()
      setProfileSuccess('Profile updated successfully.')
      setTimeout(() => setProfileSuccess(''), 3000)
    } catch (error) {
      console.error(error)
    } finally {
      setIsUpdatingProfile(false)
    }
  }

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsChangingPassword(true)
    setPasswordError('')
    setPasswordSuccess('')
    try {
      await authService.changePassword(passwordForm)
      setPasswordSuccess('Password changed successfully.')
      setPasswordForm({ current_password: '', new_password: '' })
      setTimeout(() => setPasswordSuccess(''), 3000)
    } catch (error: any) {
      if (error.response?.data?.current_password) {
        setPasswordError('Incorrect current password.')
      } else {
        setPasswordError('Failed to change password.')
      }
    } finally {
      setIsChangingPassword(false)
    }
  }

  const handleDeleteAccount = async () => {
    try {
      await authService.deleteAccount()
      logout()
      navigate('/')
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="animate-in fade-in duration-1000 pb-12">
      <div className="mb-10">
        <h2 className="text-4xl font-black text-on-surface tracking-tighter">Account Settings</h2>
        <p className="text-sm text-on-surface-variant font-bold uppercase tracking-widest mt-2">Manage your profile & preferences</p>
      </div>

      <div className="max-w-4xl space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-700">
        
        {/* Profile Update Section */}
        <section className="bg-surface p-10 rounded-[3rem] shadow-sm border border-outline-variant">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary border border-primary/20">
              <Icon icon="solar:user-bold-duotone" className="text-3xl" />
            </div>
            <div>
              <h2 className="text-xl font-black text-on-surface">Personal Information</h2>
              <p className="text-sm text-on-surface-variant font-medium mt-1">Update your name and personal details.</p>
            </div>
          </div>

          <form onSubmit={handleUpdateProfile} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[11px] font-black text-on-surface-variant uppercase tracking-widest pl-1">First Name</label>
                <input 
                  type="text" 
                  name="first_name"
                  value={profileForm.first_name}
                  onChange={handleProfileChange}
                  className="w-full bg-surface-container-low border border-outline-variant rounded-2xl px-6 py-4 text-sm font-semibold text-on-surface focus:bg-surface focus:border-primary/50 focus:ring-4 focus:ring-primary/10 transition-all outline-none"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[11px] font-black text-on-surface-variant uppercase tracking-widest pl-1">Last Name</label>
                <input 
                  type="text" 
                  name="last_name"
                  value={profileForm.last_name}
                  onChange={handleProfileChange}
                  className="w-full bg-surface-container-low border border-outline-variant rounded-2xl px-6 py-4 text-sm font-semibold text-on-surface focus:bg-surface focus:border-primary/50 focus:ring-4 focus:ring-primary/10 transition-all outline-none"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[11px] font-black text-on-surface-variant uppercase tracking-widest pl-1">Email Address</label>
              <input 
                type="email" 
                value={user?.email || ''}
                disabled
                className="w-full bg-surface-variant border border-outline-variant rounded-2xl px-6 py-4 text-sm font-semibold text-on-surface-variant cursor-not-allowed outline-none"
              />
            </div>

            <div className="flex items-center justify-between pt-4">
              {profileSuccess ? (
                <span className="text-primary text-sm font-bold flex items-center gap-2 animate-in fade-in">
                  <Icon icon="solar:check-circle-bold" /> {profileSuccess}
                </span>
              ) : <span></span>}
              <button 
                type="submit"
                disabled={isUpdatingProfile}
                className="px-8 py-4 bg-primary hover:opacity-90 text-on-primary rounded-2xl font-black text-xs uppercase tracking-widest transition-all shadow-lg shadow-primary/20 active:scale-95 disabled:opacity-70"
              >
                {isUpdatingProfile ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </form>
        </section>

        {/* Change Password Section */}
        <section className="bg-surface p-10 rounded-[3rem] shadow-sm border border-outline-variant">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-14 h-14 bg-secondary/10 rounded-2xl flex items-center justify-center text-secondary border border-secondary/20">
              <Icon icon="solar:lock-password-bold-duotone" className="text-3xl" />
            </div>
            <div>
              <h2 className="text-xl font-black text-on-surface">Security</h2>
              <p className="text-sm text-on-surface-variant font-medium mt-1">Ensure your account is using a long, random password.</p>
            </div>
          </div>

          <form onSubmit={handleChangePassword} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[11px] font-black text-on-surface-variant uppercase tracking-widest pl-1">Current Password</label>
              <input 
                type="password" 
                name="current_password"
                value={passwordForm.current_password}
                onChange={handlePasswordChange}
                required
                className="w-full bg-surface-container-low border border-outline-variant rounded-2xl px-6 py-4 text-sm font-semibold text-on-surface focus:bg-surface focus:border-secondary focus:ring-4 focus:ring-secondary/10 transition-all outline-none"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[11px] font-black text-on-surface-variant uppercase tracking-widest pl-1">New Password</label>
              <input 
                type="password" 
                name="new_password"
                value={passwordForm.new_password}
                onChange={handlePasswordChange}
                required
                className="w-full bg-surface-container-low border border-outline-variant rounded-2xl px-6 py-4 text-sm font-semibold text-on-surface focus:bg-surface focus:border-secondary focus:ring-4 focus:ring-secondary/10 transition-all outline-none"
              />
            </div>

            <div className="flex items-center justify-between pt-4">
              <div className="flex flex-col">
                {passwordError && <span className="text-error text-sm font-bold flex items-center gap-2"><Icon icon="solar:danger-circle-bold" /> {passwordError}</span>}
                {passwordSuccess && <span className="text-primary text-sm font-bold flex items-center gap-2 animate-in fade-in"><Icon icon="solar:check-circle-bold" /> {passwordSuccess}</span>}
              </div>
              <button 
                type="submit"
                disabled={isChangingPassword}
                className="px-8 py-4 bg-secondary hover:opacity-90 text-on-secondary rounded-2xl font-black text-xs uppercase tracking-widest transition-all shadow-lg shadow-secondary/20 active:scale-95 disabled:opacity-70"
              >
                {isChangingPassword ? 'Updating...' : 'Update Password'}
              </button>
            </div>
          </form>
        </section>

        {/* Delete Account Section */}
        <section className="bg-error-container/20 p-10 rounded-[3rem] border border-error/20">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-black text-error">Danger Zone</h2>
              <p className="text-sm text-error/80 font-medium mt-1">Permanently delete your account and all data.</p>
            </div>
            <button 
              onClick={() => setIsDeleteModalOpen(true)}
              className="px-8 py-4 bg-surface border border-error/30 text-error hover:bg-error hover:text-on-error rounded-2xl font-black text-xs uppercase tracking-widest transition-all shadow-sm active:scale-95"
            >
              Delete Account
            </button>
          </div>
        </section>

      </div>

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300"></div>
          <div className="bg-surface rounded-[2.5rem] p-10 max-w-md w-full relative z-10 shadow-2xl animate-in zoom-in-95 duration-300 border border-outline-variant">
            <div className="w-20 h-20 bg-error-container rounded-3xl flex items-center justify-center mb-8 mx-auto">
              <Icon icon="solar:trash-bin-trash-bold-duotone" className="text-4xl text-on-error-container" />
            </div>
            <h3 className="text-2xl font-black text-on-surface text-center mb-4">Delete Account?</h3>
            <p className="text-on-surface-variant font-medium text-center mb-10 leading-relaxed">
              This action is irreversible. All your data will be permanently removed from our servers.
            </p>
            <div className="flex gap-4">
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="flex-1 py-4 bg-surface-container hover:bg-surface-container-high text-on-surface rounded-2xl font-black text-sm uppercase tracking-widest transition-colors border border-outline-variant"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteAccount}
                className="flex-1 py-4 bg-error hover:opacity-90 text-on-error rounded-2xl font-black text-sm uppercase tracking-widest transition-all shadow-lg shadow-error/20 active:scale-95"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}
