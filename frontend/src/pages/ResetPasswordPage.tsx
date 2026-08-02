import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { API_URL } from "../config";

function ResetPassword() {
    const { token } = useParams();
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        const response = await fetch(`${API_URL}/api/auth/reset-password/${token}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ password }),
        });
        const data = await response.json();
        setMessage(data.message);
        if (response.ok) {
            navigate("/login");
        }
    }

    return (
        <div className="w-1/2 px-[50px] flex align-center mx-auto">
            <div className="m-auto">
                <h2 className="text-center">Reset Password</h2>
                <p className="text-center">Enter your new password</p>

                <form onSubmit={handleSubmit}>
                    <div className="my-[10px]">
                        <label className="text-left text-[12px] font-semibold">New Password</label>
                        <input className="bg-[#f2f2f2] border border-[#eee] rounded-sm p-[10px] w-full text-[12px]" type="password" placeholder="enter new password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <div className="mt-[30px]">
                        <button type="submit" className="bg-[#3d49f1] rounded-sm w-full text-[#fff] p-[10px] cursor-pointer">Reset Password</button>
                    </div>
                </form>
                {message && <p className="text-[12px] mt-[10px]">{message}</p>}
            </div>
        </div>
    )
}

export default ResetPassword;
