import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../store";
import { logout } from "../authSlice";

type NavBarProps = {
    onNavigate?: () => void;
}

function NavBar({ onNavigate }: NavBarProps) {
const dispatch = useDispatch();

function handleLogout(){
    dispatch(logout());
    onNavigate?.();
}

    const role = useSelector((state: RootState) => {
        return state.auth.role;
    })

    return(
    <nav>
        <ul>
            <li className="border-b-[1px] border-color-[#000] py-2 text-[14px]" onClick={onNavigate}><Link to="/dashboard">Dashboard</Link></li>
            {/* {role === "client"  && (
                <li className="border-b-[1px] border-color-[#000] py-2 text-[14px]"> <Link to="/submitpayment">Submit Payment</Link></li>
            )} */}
            {role === "admin" && (
                <li className="border-b-[1px] border-color-[#000] py-2 text-[14px]" onClick={onNavigate}> <Link to="/pendingpayments">Pending Payments</Link></li>
            )}
            <li className="border-b-[1px] border-color-[#000] py-2 text-[14px] cursor-pointer" onClick={handleLogout}>Logout</li>
            </ul>
    </nav>

    )
}

export default NavBar;
