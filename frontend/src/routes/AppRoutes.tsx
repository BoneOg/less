import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LoginPage from '../features/authentication/pages/LoginPage'
import RegisterPage from '../features/authentication/pages/RegisterPage'
import ForgotPasswordPage from '../features/authentication/pages/ForgotPasswordPage'
import TestPage from '../features/test/pages/TestPage'
import Dashboard from '../pages/Dashboard'
import LandingPage from '../pages/LandingPage'

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/settings" element={<Dashboard />} />
        <Route path="/test" element={<TestPage />} />
      </Routes>
    </BrowserRouter>
  )
}
