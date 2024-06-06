import { Button } from "@/components/ui/button";
import useAuthGuardStore from "@/context/AuthGuardStore";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const Dashboard = () => {

    const navigate = useNavigate();

    const { isAuthenticated, user, articles} = useAuthGuardStore();

    useEffect(() =>{

        if(!isAuthenticated) {
            navigate("/login");
        }

        console.log("articles " + JSON.stringify(articles));
        console.log("user " + JSON.stringify(user));
        console.log("isAuthenticated " + isAuthenticated);
    }, [])

    const { logout } = useAuthGuardStore(); 
    return(
        <div>
            <h1>Dashboard</h1>
            <Button variant={"destructive"} onClick={() => {logout(); navigate("/login")}}>Logout</Button>
            <Outlet />
        </div>
    )
}

export default Dashboard;