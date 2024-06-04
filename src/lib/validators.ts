import { z } from 'zod';

export const LoginSchema = z.object({
    username: z.string({required_error: "username is required!", invalid_type_error: "username must be a string"}).min(3, { message: "username must be more then just 3 letters!"}).max(15, { message: "username must be less then 15 letters!"}),
    password: z.string({required_error: "password is required ofc!"}).min(8, { message: "What? at least 8 chars long!"}).max(20, { message: "password must be less then 20 chars!"}),
})

export type TLoginSchema = z.infer<typeof LoginSchema>;

export const RegisterSchema = z.object({
    username: z.string({required_error: "username is required!", invalid_type_error: "username must be a string"}).min(3, { message: "username must be more then just 3 letters!"}).max(15, { message: "username must be less then 15 letters!"}),
    email: z.string({required_error: "email is required!", invalid_type_error: "email must be a string"}).email({ message: "email must be a valid email!"}),
    password: z.string({required_error: "password is required ofc!"}).min(8, { message: "What? at least 8 chars long!"}).max(20, { message: "password must be less then 20 chars!"}),
    passwordConfirmation: z.string({required_error: "passwordConfirmation is required ofc!"}).min(8, { message: "What? at least 8 chars long!"}).max(20, { message: "passwordConfirmation must be less then 20 chars!"}),
    firstname: z.string({required_error: "firstname is required!", invalid_type_error: "firstname must be a string"}).min(3, { message: "firstname must be more then just 3 letters!"}).max(15, { message: "firstname must be less then 15 letters!"}),
    lastname: z.string({required_error: "lastname is required!", invalid_type_error: "lastname must be a string"}).min(3, { message: "lastname must be more then just 3 letters!"}).max(15, { message: "lastname must be less then 15 letters!"}),

}).refine(data => data.password === data.passwordConfirmation, { message: "passwords must match!", path: ["passwordConfirmation"] });

export type TRegisterSchema = z.infer<typeof RegisterSchema>;