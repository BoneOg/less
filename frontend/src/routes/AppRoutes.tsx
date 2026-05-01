import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LoginPage from '../features/authentication/pages/LoginPage'
import RegisterPage from '../features/authentication/pages/RegisterPage'
import Dashboard from '../pages/Dashboard'
import LandingPage from '../pages/LandingPage'

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  )
}
