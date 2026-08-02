import { useState } from "react";
import { Link } from "react-router-dom";
import { API_URL } from "../config";

function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        const response = await fetch(`${API_URL}/api/auth/forgot-password`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email }),
        });
        const data = await response.json();
        setMessage(data.message);
    }

    return (
        <div className="w-1/2 px-[50px] flex align-center mx-auto">
            <div className="m-auto">
                <h2 className="text-center">Forgot Password</h2>
                <p className="text-center">Enter your email to receive a reset link</p>

                <form onSubmit={handleSubmit}>
                    <div className="my-[10px]">
                        <label className="text-left text-[12px] font-semibold">Email Address</label>
                        <input className="bg-[#f2f2f2] border border-[#eee] rounded-sm p-[10px] w-full text-[12px]" type="email" placeholder="enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="mt-[30px]">
                        <button type="submit" className="bg-[#3d49f1] rounded-sm w-full text-[#fff] p-[10px] cursor-pointer">Send Reset Link</button>
                    </div>
                </form>
                {message && <p className="text-[12px] mt-[10px]">{message}</p>}
                <p className="text-[12px]">
                    <Link to="/login">Back to login</Link>
                </p>
            </div>
        </div>
    )
}

export default ForgotPassword;
