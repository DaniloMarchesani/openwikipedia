import { ReactNode } from "react";
import TopNav from "./TopNav";
import { Link } from "react-router-dom";

const LayoutDashboard = ({ children }: { children: ReactNode}) => {
    return (
        <div className="min-h-screen flex flex-col justify-between items-center dark:bg-black dark:text-slate-200 antialiased p-8 bg-gray-100">
            <TopNav />
        <main className="md:p-16 p-6 w-full text-center flex flex-col justify-center items-center grow">
            { children }
        </main>
        <footer className=" text-sm text-base-content rounded text-center flex items-center justify-between w-full">
        <p>
          Open BETA version: 0.1.0 release: stable
        </p>
        <p>
            visit our repo on <Link to="/github" className="underline">Github</Link>
        </p>
        </footer>
        </div> 
    )
}

export default LayoutDashboard;