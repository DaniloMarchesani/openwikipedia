import { Link } from "react-router-dom";
import Logo from "./Logo";
import LoginButton from "./LoginButton";
import { Button } from "./ui/button";
import ThemeToggler from "./ThemeToggler";

const Navbar = () => {
  return (
    <nav className="flex flex-row items-center justify-between w-full">
      <Link to={"/"}><Logo></Logo></Link>
      <div className="flex items-center justify-end gap-3">
        <div className="md:flex hidden">
          <Button variant={"link"}>
            <Link to={"/getting-started"}>Getting Started</Link>
          </Button>
          <Button variant={"link"}>
            <Link to={"/docs"}>Docs</Link>
          </Button>
          <Button variant={"link"}>
            <Link to={"/articles"}>Articles</Link>
          </Button>
          <Button variant={"link"}>
            <Link to={"/about"}>About the project</Link>
          </Button>
        </div>
        <LoginButton />
        <ThemeToggler />
      </div>
    </nav>
  );
};

export default Navbar;
