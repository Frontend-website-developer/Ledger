import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";
import type { RootState} from "../store";

function ProtectedRoute ({children} : {children: ReactNode}) {
    const token = useSelector((state: RootState) => state.auth.token);
    if(!token){
        return <Navigate to="/login" />
    }

    return children;
}

export default ProtectedRoute;