import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../authSlice";
import { useNavigate } from "react-router-dom";
import { RiLockPasswordFill } from "react-icons/ri";
import { CiMail } from "react-icons/ci";




function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const response = await fetch("http://localhost:5001/api/auth/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    console.log(data);
    dispatch(login({token: data.token, role: data.role}))
    navigate("/dashboard");
}


    return (
        <>
        <div className="flex">
            <div className="bg-[#00bcff] w-1/2 h-screen">

            </div>
            <div className="w-1/2 px-[50px]">
                <div className="">
                    <div className="bg-[#f0f0fe] p-[5px] w-[50px] h-[50px] rounded-sm p-[10px] text-center mx-auto my-[20px]">
                        <RiLockPasswordFill className="text-[#3e48f1] text-[30px]"/>
                    </div>
                    <h2 className="text-center">Welcome Back</h2>
                    <p className="text-center">Signin to continue your account</p>

                    <form onSubmit={handleSubmit}>
                        <div className="my-[10px]">
                            <label className="text-left text-[12px] font-semibold">Email Address</label>
                            <input className="bg-[#f2f2f2] border border-[#eee] rounded-sm p-[10px] w-full" type="email" placeholder="enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className="my-[10px]">
                            <label className="text-left text-[12px] font-semibold">Password</label>
                            <input className="bg-[#f2f2f2] border border-[#eee] rounded-sm p-[10px] w-full" type="password" placeholder="enter password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <div>    
                            <button type="submit" className="bg-[#3d49f1] rounded-sm w-full text-[#fff] p-[10px] cursor-pointer">Sign In</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        </>
    )
}

export default Login;