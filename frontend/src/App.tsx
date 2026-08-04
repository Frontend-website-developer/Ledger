import { Routes, Route, Navigate } from 'react-router-dom'
import ClientSingle from './pages/ClientDetailPage'
import Login from './pages/LoginPage'
import PendingPayments from './pages/PendingPaymentsPage'
import PaymentSubmit from './pages/SubmitPaymentPage'
import Register from './pages/RegisterPage'
import ForgotPassword from './pages/ForgotPasswordPage'
import ResetPassword from './pages/ResetPasswordPage'

import './App.css'
import DashboardRouter from './components/DashboardRouter'
import ProtectedRoute from './components/ProtectedRoute'
import NavBar from './components/Navbar';
import logo from "../src/assets/logo.png";
import { useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import type { RootState } from './store'

function RootRedirect() {
  const token = useSelector((state: RootState) => state.auth.token);
  return <Navigate to={token ? "/dashboard" : "/login"} replace />;
}

function App() {
  const location = useLocation();
  const hideNavPaths = ["/login", "/register", "/forgot-password", "/reset-password"];
  const showNav = !hideNavPaths.some((path) => location.pathname.startsWith(path));
  return (
    <div className='flex min-h-[100vh]'>
        {showNav && <div className='fixed w-[240px] bg-[#fff] border-r-[1px] border-[#e2e8f0] p-2 min-h-[100vh]'>
          <img src={logo} alt="" />
          <NavBar />
        </div> }
        <div className={`w-[100%] ${showNav ? "ml-[240px]" : ""} flex-[1]`}>
          <Routes>
              <Route path="/" element={<RootRedirect />} />
              <Route path="/dashboard" element={
                <ProtectedRoute>
                  <DashboardRouter />
                </ProtectedRoute>
              } />
              <Route path="/client/:clientId" element={
                <ProtectedRoute>
                  <ClientSingle />
                </ProtectedRoute>
              } />
              
              <Route path="/login" element={<Login />} />
              <Route path="/pendingpayments" element={
                <ProtectedRoute>
                  <PendingPayments />
                </ProtectedRoute>
                } />
              <Route path="/submitpayment" element={
                <ProtectedRoute>
                  <PaymentSubmit />
                </ProtectedRoute>
                } />
              <Route path="/register" element={<Register />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/reset-password/:token" element={<ResetPassword />} />
          </Routes>
        </div>
    </div>
  )
}

export default App
