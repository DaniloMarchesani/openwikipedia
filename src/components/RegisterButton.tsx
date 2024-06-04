import { Link } from "react-router-dom";
import { Button } from "./ui/button";

const RegisterButton = () => {
    return (
        <Button asChild>
            <Link to={"/register"}>
                Register
            </Link>
        </Button>
    );
}

export default RegisterButton;