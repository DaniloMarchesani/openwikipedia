import { Link } from "react-router-dom";
import Logo from "../Logo";
import UserMenu from "./UserMenu";
import UserFrame from "./UserFrame";



const TopNav = () => {
    return (
        <nav className="flex items-center justify-between w-full">
            <Link to={"/dashboard"}>
                {/* <Logo /> */}
                <UserFrame />
            </Link>
            <UserMenu />
        </nav>
    )
}

export default TopNav;