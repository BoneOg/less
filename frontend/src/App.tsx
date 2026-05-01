import AppRoutes from './routes/AppRoutes'
import { AuthProvider } from './features/authentication/context/AuthContext'

export default function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  )
}
