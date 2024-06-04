import { Button } from "@/components/ui/button";
import { User } from "lucide-react";
import { Link } from "react-router-dom";

const LoginButton = () => {
  return (
    <Button
    asChild
    >
      <Link to={"/login"}>
          <User className="mr-2 h-4 w-4"/>
          Login
      </Link>
    </Button>
  );
};

export default LoginButton;
