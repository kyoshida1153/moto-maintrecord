import * as z from "zod";
import { UserSchemaBase } from "./base";

const { name, email, password } = UserSchemaBase.shape;

export const CreateUserSchema = z
  .object({
    name,
    email,
    password,
    confirmPassword: z.string().min(1, "パスワードを再度入力してください。"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "パスワードが一致しません",
    path: ["confirmPassword"],
  });
