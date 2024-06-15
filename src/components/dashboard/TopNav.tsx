import { Link, useLocation } from "react-router-dom";
import UserMenu from "./UserMenu";
import SearchBar from "./QuickSearchBar";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Skeleton } from "../ui/skeleton";
import { ArrowLeft } from "lucide-react";

const TopNav = () => {

    const location = useLocation();

  return (
    <nav className="flex items-center justify-between w-full">
        { location.pathname === "/dashboard" ? (
            <>
                <Link to={"/dashboard"}>
                {/* <UserFrame /> */}
                <Avatar>
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    className="border-2 rounded-full border-black"
                  />
                  <AvatarFallback>
                    <Skeleton className="h-12 w-12 rounded-full" />
                  </AvatarFallback>
                </Avatar>
              </Link>
              <SearchBar />
              <UserMenu />
            </>
        ) : (
            <>
            <Link to={"/dashboard"} className="flex items-center justify-center hover:bg-white dark:hover:bg-gray-800 rounded-full px-4 py-2"><ArrowLeft className="h-4 w-4 mr-2"/>Go Back</Link>
            <UserMenu />
            </>
           
        )}
      
    </nav>
  );
};

export default TopNav;
