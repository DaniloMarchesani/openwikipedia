import { Link } from "react-router-dom";
import UserMenu from "./UserMenu";
import UserFrame from "./UserFrame";
import SearchBar from "./QuickSearchBar";



const TopNav = () => {
    return (
        <nav className="flex items-center justify-between w-full">
            <Link to={"/dashboard"}>
                <UserFrame />
            </Link>
            <SearchBar />
            <UserMenu />
        </nav>
    )
}

export default TopNav;