import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RegisterSchema, TRegisterSchema } from "@/lib/validators";
import { zodResolver } from "@hookform/resolvers/zod";
import { Checkbox } from "@radix-ui/react-checkbox";
import { User } from "lucide-react";
import { useForm } from "react-hook-form";

const Register = () => {

    /* const [isPasswordVisible, setPasswordVisible] = useState(false);
    const togglePasswordVisibility = () =>
        setPasswordVisible((prevState) => !prevState);

    const onSubmit = (data: TRegisterSchema) => {
        console.log(data);
    }

    const form = useForm<TRegisterSchema>({
        resolver: zodResolver(RegisterSchema),
    }); */



    return (
        <div className="flex items-center justify-center h-screen">
           <h1>Register Page</h1>
        </div>
    )
}

export default Register;