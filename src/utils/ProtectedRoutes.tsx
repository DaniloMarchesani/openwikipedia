import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import axios from "axios";
import { TUser } from "@/lib/types";

const { VITE_BACKEND_URI } = import.meta.env;

const ProtectedRoutes = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { loading: auhtLoading, login, user } = useAuth();

    useEffect(() => {
        const token = localStorage.getItem("ACCESS_TOKEN");
        if(!token) {
            navigate("/login", { replace: true });
        }

        axios.get<TUser>(`${VITE_BACKEND_URI}/api/user/`, { headers: { Authorization: `Bearer ${token}`}})
        .then(response => {
            console.log(response.data)
            login(response.data);
        })
        .catch(error => {
            console.log(error);
            navigate("/login", { replace: true });
        })

        console.log("TOKEN: " + token);

    }, [])

    

    return (
        <>
            <Outlet />
        </>
    )
}

export default ProtectedRoutes;