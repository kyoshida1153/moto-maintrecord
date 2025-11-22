import * as z from "zod";
import { UserSchemaBase } from "@/validations";

const email = UserSchemaBase.shape.email;

export const LoginFormSchema = z.object({
  email: email,
  password: z.string().nonempty("パスワードを入力してください。"),
});
