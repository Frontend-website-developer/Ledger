import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../authSlice";
import { useNavigate } from "react-router-dom";
import { RiLockPasswordFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import heroImage from "../assets/login-ledger-image.jpg";
import {API_URL} from "../config";



function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
        const response = await fetch(`${API_URL}/api/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (!response.ok) {
            alert(data.message || "Login failed. Please try again.");
            return;
        }

        if (!data.token || !data.role) {
            alert("Invalid response from server");
            return;
        }

        dispatch(login({ token: data.token, role: data.role }));
        navigate("/dashboard");
    } catch (err) {
        alert("Network error. Please try again.");
    }
}


    return (
        <>
        <div className="flex">
            <div className="hidden md:block bg-[#00bcff] w-1/2 h-screen">
                <img src={heroImage} alt="Ledger" />
            </div>
            <div className="w-full md:w-1/2 px-[20px] md:px-[50px] flex align-center">
                <div className="m-auto">
                    <div className="bg-[#f0f0fe] p-[5px] w-[50px] h-[50px] rounded-sm p-[10px] text-center mx-auto my-[20px]">
                        <RiLockPasswordFill className="text-[#3e48f1] text-[30px]"/>
                    </div>
                    <h2 className="text-center">Welcome Back</h2>
                    <p className="text-center">Signin to continue your account</p>

                    <form onSubmit={handleSubmit}>
                        <div className="my-[10px]">
                            <label className="text-left text-[12px] font-semibold">Email Address</label>
                            <input required className="bg-[#f2f2f2] border border-[#eee] rounded-sm p-[10px] w-full text-[12px]" type="email" placeholder="enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className="my-[10px]">
                            <label className="text-left text-[12px] font-semibold">Password</label>
                            <input className="bg-[#f2f2f2] border border-[#eee] rounded-sm p-[10px] w-full text-[12px]" type="password" placeholder="enter password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <div className="mt-[30px]">    
                            <button type="submit" className="bg-[#3d49f1] rounded-sm w-full text-[#fff] p-[10px] cursor-pointer">Sign In</button>
                        </div>
                    </form>
                    <p className="text-[12px]">
    Don't have an account? <Link to="/register">Sign up now</Link>
</p>
                    <p className="text-[12px]">
    <Link to="/forgot-password">Forgot password?</Link>
</p>
                </div>
            </div>
        </div>
        </>
    )
}

export default Login;