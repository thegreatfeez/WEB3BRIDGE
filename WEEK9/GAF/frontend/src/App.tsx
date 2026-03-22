import { useState } from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import AdminPage from './pages/AdminPage'
import UserDashboardPage from './pages/UserDashboardPage'

function App() {
  const [page, setPage] = useState<'user' | 'admin'>('user')

  return (
    <>
      {page === 'user' ? (
        <UserDashboardPage onNavigate={setPage} />
      ) : (
        <AdminPage onNavigate={setPage} />
      )}
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  )
}

export default App
