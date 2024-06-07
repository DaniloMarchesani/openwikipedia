import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";


const Dashboard = () => {

    const { logout, user } = useAuth();
    return(
        <div>
            <h1>Dashboard</h1>
            <p>{user?.firstname} {user?.lastname}</p>
            <Button variant={"destructive"} onClick={() => {logout();}}>Logout</Button>
        </div>
    )
}

export default Dashboard;