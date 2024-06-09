import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import { useAuth } from "@/context/AuthContext";
import { useEffect } from "react";
import { log } from "console";

const Layout = () => {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if(isAuthenticated === true) {
      location.pathname !== "/dashboard" && navigate("/dashboard", { replace: true });
    }
    console.log("isAuthenticated: " + isAuthenticated);
    console.log("user: " + user);
    
  }, [isAuthenticated])

    return (
        <div className="min-h-screen flex flex-col justify-between items-center dark:bg-black dark:text-slate-200 antialiased">
        <div className="flex w-full md:p-12 p-4">
          <Navbar />
        </div>
        <main className="md:p-16 p-6 w-full text-center flex flex-col justify-center items-center grow">
            <Outlet />
        </main>
        <footer className="p-10 text-base-content rounded text-center">
        <p>
          Copyright © 2024 - An Open source project made with 💖 by <Link to={"https://github.com/DaniloMarchesani"} className="underline italic">Danilo
          Marchesani</Link> 🐱‍👤
        </p>
      </footer>
        </div>
    );

}

export default Layout;