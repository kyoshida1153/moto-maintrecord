import * as z from "zod";
import { UserSchema } from "@/validations";

const email = UserSchema.shape.email;

export const SigninSchema = z.object({
  email: email,
  password: z.string().nonempty("パスワードを入力してください。"),
});
