import * as z from "zod";
import { UserSchemaBase } from "@/validations/base/UserSchemaBase";

const { email } = UserSchemaBase.shape;

export const LoginFormSchema = z.object({
  email,
  password: z.string().min(1, "パスワードを入力してください。"),
});
