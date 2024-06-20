import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/context/AuthContext";
import axios from "axios";

const { VITE_BACKEND_URI, VITE_BACKEND_USER_ENDPOINT } = import.meta.env;

const ProfilePage = () => {
  const { user } = useAuth();

  const handleDeleteAccount = async (id: string) => {
    try {
        if(!id) throw new Error("No user id found! Impossible to delete the account!");

      const token = localStorage.getItem("ACCESS_TOKEN");
        if (!token) {
            console.error("No token found! Impossible to delete the account!");
            return;
        }
        await axios.delete(`${VITE_BACKEND_URI}${VITE_BACKEND_USER_ENDPOINT}/${id}`, {
            headers: { Authorization: `Bearer ${token}`}
        });
        console.log("Account deleted successfully!")
    } catch (error) {
        console.error("An error occurred while trying to delete the account!");
    }
  }

  return (
    <div>
      <div className="border p-4 rounded-xl flex items-center justify-center gap-2">
        <Avatar className="w-14 h-14 mr-2">
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className="text-left space-y-1">
            <h2 className="font-bold text-xl">{user?.username}</h2>
            <p>{user?.email}</p>
        </div>
      </div>

      <div className="mt-4 border rounded-xl p-4 flex flex-col gap-2 text-left">
            <h3 className="font-bold text-xl">Account Details</h3>
            <Separator />
            <p>Firstname: {user?.firstname}</p>
            <p>Lastname: {user?.lastname}</p>
            <p>Email: {user?.email}</p>
        </div> 

        <div className="mt-4 border rounded-xl p-4">
            <h3 className="font-bold text-xl">Settings</h3>
            <Separator />
            <div className="p-2"><Button variant={"destructive"} onClick={() => handleDeleteAccount(user!.id)} >Delete Account</Button></div>
        </div> 
    </div>
  );
};

export default ProfilePage;
