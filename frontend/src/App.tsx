import { Routes, Route } from 'react-router-dom'
import AdminDashboard from './pages/AdminDashboardPage'
import ClientDashboard from './pages/ClientDashboardPage'
import ClientSingle from './pages/ClientDetailPage'
import ClientList from './pages/ClientListPage'
import Login from './pages/LoginPage'
import PendingPayments from './pages/PendingPaymentsPage'
import PaymentSubmit from './pages/SubmitPaymentPage'
import Register from './pages/RegisterPage'

import './App.css'
import DashboardRouter from './components/DashboardRouter'

function App() {

  return (
    <>
      <Routes>
          <Route path="/dashboard" element={<DashboardRouter />} />
          <Route path="/client/:clientId" element={<ClientSingle />} />
          <Route path="/clientlist" element={<ClientList />} />
          <Route path="/login" element={<Login />} />
          <Route path="/pendingpayments" element={<PendingPayments />} />
          <Route path="/submitpayment" element={<PaymentSubmit />} />
          <Route path="/register" element={<Register />} />
      </Routes>
    </>
  )
}

export default App
