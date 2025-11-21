import * as z from "zod";
import { UserSchema } from "@/validations";

const password = UserSchema.shape.password;

export const UserPasswordSchema = z
  .object({
    currentPassword: z.string().nullable(),
    newPassword: password,
    confirmNewPassword: z
      .string()
      .nonempty("新しいパスワードを再度入力してください。"),
  })
  .superRefine(({ currentPassword, newPassword, confirmNewPassword }, ctx) => {
    if (currentPassword === newPassword) {
      ctx.addIssue({
        path: ["newPassword"],
        code: "custom",
        message: "現在のパスワードと同じです。",
      });
    }
    if (newPassword !== confirmNewPassword) {
      ctx.addIssue({
        path: ["confirmNewPassword"],
        code: "custom",
        message: "パスワードが一致しません。",
      });
    }
  });
