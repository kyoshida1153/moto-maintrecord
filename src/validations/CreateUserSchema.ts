import * as z from "zod";
import { UserSchemaBase } from "@/validations";

const name = UserSchemaBase.shape.name;
const email = UserSchemaBase.shape.email;
const password = UserSchemaBase.shape.password;

export const CreateUserSchema = z
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
