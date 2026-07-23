import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import heroImage from "../assets/login-ledger-image.jpg";
import { Navigate } from "react-router-dom";
function Register() {

    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [country, setCountry] = useState("");
    const [city, setCity] = useState("");
    const [address, setAddress] = useState("");
    const [postalCode, setPostalCode] = useState(""); 

    async function handleSubmit(e: React.FormEvent){
        e.preventDefault();

        const response = await fetch("http://localhost:5001/api/client/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({name, email, password, phone, city, country, address, postalCode})
        });

        const data = await response.json();
        console.log(data);
        navigate("/login");
    }
    return (
        <>
        <div className="flex">
            <div className="bg-[#00bcff] w-1/2 h-screen">
                <img src={heroImage} alt="Ledger" />
            </div>
            <div className="w-1/2 px-[50px] flex align-center">
                <div className="m-auto">
                    <div className="bg-[#f0f0fe] p-[5px] w-[50px] h-[50px] rounded-sm p-[10px] text-center mx-auto my-[20px]">
                        {/* <RiLockPasswordFill className="text-[#3e48f1] text-[30px]"/> */}
                    </div>
                    <h2 className="text-center">Create an Account</h2>
                    <p className="text-center">Sign up to get started</p>

                    <form onSubmit={handleSubmit}>
                        <div className="my-[10px]">
                            <label className="text-left text-[12px] font-semibold">Name</label>
                            <input className="bg-[#f2f2f2] border border-[#eee] rounded-sm p-[10px] w-full text-[12px]" type="text" placeholder="enter your name" value={name} onChange={(e) => setName(e.target.value)} />
                        </div>
                        <div className="my-[10px]">
                            <label className="text-left text-[12px] font-semibold">Email Address</label>
                            <input className="bg-[#f2f2f2] border border-[#eee] rounded-sm p-[10px] w-full text-[12px]" type="email" placeholder="enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className="my-[10px]">
                            <label className="text-left text-[12px] font-semibold">Password</label>
                            <input className="bg-[#f2f2f2] border border-[#eee] rounded-sm p-[10px] w-full text-[12px]" type="password" placeholder="enter password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <div className="my-[10px]">
                            <label className="text-left text-[12px] font-semibold">Phone</label>
                            <input className="bg-[#f2f2f2] border border-[#eee] rounded-sm p-[10px] w-full text-[12px]" type="tel" placeholder="enter phone number" value={phone} onChange={(e) => setPhone(e.target.value)} />
                        </div>
                        <div className="my-[10px]">
                            <label className="text-left text-[12px] font-semibold">Country</label>
                            <input className="bg-[#f2f2f2] border border-[#eee] rounded-sm p-[10px] w-full text-[12px]" type="text" placeholder="enter country name" value={country} onChange={(e) => setCountry(e.target.value)} />
                        </div>
                        <div className="my-[10px]">
                            <label className="text-left text-[12px] font-semibold">City</label>
                            <input className="bg-[#f2f2f2] border border-[#eee] rounded-sm p-[10px] w-full text-[12px]" type="text" placeholder="enter city" value={city} onChange={(e) => setCity(e.target.value)} />
                        </div>
                        <div className="my-[10px]">
                            <label className="text-left text-[12px] font-semibold">Address</label>
                            <input className="bg-[#f2f2f2] border border-[#eee] rounded-sm p-[10px] w-full text-[12px]" type="text" placeholder="enter address" value={address} onChange={(e) => setAddress(e.target.value)} />
                        </div>
                        <div className="my-[10px]">
                            <label className="text-left text-[12px] font-semibold">Postal Code</label>
                            <input className="bg-[#f2f2f2] border border-[#eee] rounded-sm p-[10px] w-full text-[12px]" type="text" placeholder="enter postal code" value={postalCode} onChange={(e) => setPostalCode(e.target.value)} />
                        </div>
                        
                        <div className="mt-[30px]">    
                            <button type="submit" className="bg-[#3d49f1] rounded-sm w-full text-[#fff] p-[10px] cursor-pointer">Sign Up</button>
                        </div>
                    </form>
                    <p className="text-[12px]">
    Already a member? <Link to="/login">Login now</Link>
</p>
                </div>
            </div>
        </div>
        </>
    )
}

export default Register;