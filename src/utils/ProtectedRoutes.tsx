import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import axios from "axios";
import { TUser } from "@/lib/types";
import LayoutDashboard from "@/components/dashboard/LayoutDashboard";

const { VITE_BACKEND_URI } = import.meta.env;

const ProtectedRoutes = () => {
    

    return (
        <>
            <LayoutDashboard>
                <Outlet />
            </LayoutDashboard>
        </>
    )
}

export default ProtectedRoutes;