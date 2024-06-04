import useAuthGuardStore from "@/context/AuthGuardStore";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { LoginSchema, TLoginSchema } from "@/lib/validators";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import AnimatedBg from "@/components/common/AnimatedBg";
import { User } from "lucide-react";
import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";

const Login = () => {
  const { BACKEND_URI } = import.meta.env;

  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const togglePasswordVisibility = () =>
    setPasswordVisible((prevState) => !prevState);

  const { login } = useAuthGuardStore();

  const navigate = useNavigate();

  const form = useForm<TLoginSchema>({
    defaultValues: { username: "", password: "" },
    resolver: zodResolver(LoginSchema),
  });

  const onSubmit: SubmitHandler<TLoginSchema> = (formData) => {
    axios
      .post(`${BACKEND_URI}/api/auth/login`, formData)
      .then((response) => {
        localStorage.setItem("token", response.data.token);
        login(response.data.user);
        axios
          .get(`${BACKEND_URI}/api/articles`, {
            headers: { Authorization: `Bearer ${response.data.token}` },
          })
          .then((response) => {
            useAuthGuardStore.setState({ articles: response.data });
            navigate("/dashboard");
          });
      })
      .catch((error) => {
        console.log(error);
        form.setError("root", { message: "Invalid credentials!" });
      });
  };

  return (
    <>
      <div className="flex flex-col items-stretch max-w-lg">
        <h1 className="text-4xl font-bold mb-10">Login</h1>
        <AnimatedBg />
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {/* USERNAME FIELD */}
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="Username" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* PASSWORD FIELD */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type={isPasswordVisible ? "text" : "password"}
                      placeholder="Password"
                      {...field}
                    />
                  </FormControl>
                  <div className="flex items-center justify-center space-x-2">
                    <Checkbox id="showpass" onClick={() => togglePasswordVisibility()}/>
                    <label
                      htmlFor="showpass"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Show password
                    </label>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit">
              <User className="mr-2 w-4 h-4" /> Login
            </Button>
            <FormMessage>{form.formState.errors.root?.message}</FormMessage>
          </form>
          <Button
            variant={"link"}
            onClick={() => navigate("/register")}
            className="mt-6"
          >
            Don't have an account yet? Register here! 🏃‍♂️
          </Button>
        </Form>
      </div>
    </>
  );
};

export default Login;
