import { useState, useEffect } from "react";
import { useSelector} from "react-redux";
import type { RootState } from "../store";
import type { Profile, Client } from "../Types";
import { Link } from "react-router-dom";
import { API_URL } from "../config";

function AdminDashboard() {
    const token = useSelector((state: RootState) => {
        return state.auth.token;
    });
    const [profile, setProfile] = useState<Profile | null>(null);
    const [clientList, setClientList] = useState<Client[]>([]);
    const [loading, setLoading] = useState(true);
    useEffect(
        () => {
        async function fetchProfile() {
            const response = await fetch(`${API_URL}/api/admin/profile`, {
                headers: {
                    Authorization: `Bearer ${token}`
                },
            });
            const data = await response.json();
            setProfile(data);
        }
        async function fetchClientList() {
            const response = await fetch(`${API_URL}/api/client/all`, {
                headers: {
                    Authorization: `Bearer ${token}`
                },
            });

            const data = await response.json();
            setClientList(data);
            setLoading(false);
        }
        fetchProfile();
        fetchClientList();
}, []);
    return (
        <div className="px-5">
        <h1>Welcome {profile?.name}</h1>
{loading ? (
    <p>Loading clients...</p>
) : clientList.length > 0 ?
(
    <>
        <h2>Client List</h2>
        <div className="border border-gray-300 w-[100%] rounded-md overflow-x-auto">
                <table className="w-full min-w-[700px] bg-[#fff]">
            <thead className="text-left bg-[#f1f5f9]">
                <tr className="text-left text-[14px]">
                    <th className="border border-gray-300 p-2">Name</th>
                    <th className="border border-gray-300 p-2">Email</th>
                    <th className="border border-gray-300 p-2">Phone</th>
                    <th className="border border-gray-300 p-2">Country</th>
                    <th className="border border-gray-300 p-2">City</th>
                    <th className="border border-gray-300 p-2">Postal Code</th>
                    <th className="border border-gray-300 p-2">View</th>
                </tr>
            </thead>
            <tbody>
                
        {
        clientList.map((client) =>(
            
             <tr key={client._id} className="text-[14px]">
                <td className="border border-gray-300 px-2">{client.name}</td>
                <td className="border border-gray-300 px-2">{client.email}</td>
                <td className="border border-gray-300 px-2">{client.phone}</td>
                <td className="border border-gray-300 px-2">{client.country}</td>
                <td className="border border-gray-300 px-2">{client.city}</td>
                <td className="border border-gray-300 px-2">{client.postalCode}</td>
                <td className="border border-gray-300 px-2"><Link to={`/client/${client._id}`}>View More</Link> </td>
             </tr>   
            ))
        }
        </tbody>
        </table>
        </div>
    </>    
)
        : 
        (
            <h2>No client found</h2>
        )

}


        </div>
    )
}

export default AdminDashboard;