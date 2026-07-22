import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import type { RootState } from "../store";
import AdminDashboard from "../pages/AdminDashboardPage";
import ClientDashboard from "../pages/ClientDashboardPage";

function DashboardRouter() {
    const role = useSelector((state: RootState) => state.auth.role);
    if(role === "admin"){
        return <AdminDashboard />;
    }
    if(role === "client"){
        return <ClientDashboard />;
    }
    return <Navigate to="/login" />;
}

export default DashboardRouter;