import * as z from "zod";
import { UserSchema } from "@/validations";

const name = UserSchema.shape.name;
const email = UserSchema.shape.email;
const password = UserSchema.shape.password;

export const SignupSchema = z
  .object({
    name: name,
    email: email,
    password: password,
    confirmPassword: z.string().nonempty("パスワードを再度入力してください。"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "パスワードが一致しません",
    path: ["confirmPassword"],
  });
