import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import AdminPage from './pages/AdminPage'
import UserDashboardPage from './pages/UserDashboardPage'
import { useAppKitAccount } from '@reown/appkit/react'
import { TokenProvider, useTokenContext } from './context/TokenContext'

function AppInner() {
  const { address } = useAppKitAccount()
  const { owner } = useTokenContext()

  const isAdmin = !!(
    address &&
    owner &&
    address.toLowerCase() === owner.toLowerCase()
  )
  const noop = () => {}

  return (
    <>
      {isAdmin ? (
        <AdminPage onNavigate={noop} />
      ) : (
        <UserDashboardPage onNavigate={noop} />
      )}
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  )
}

function App() {
  return (
    <TokenProvider>
      <AppInner />
    </TokenProvider>
  )
}

export default App