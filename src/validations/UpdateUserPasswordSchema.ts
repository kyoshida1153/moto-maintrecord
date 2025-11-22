import * as z from "zod";
import { UserSchemaBase } from "@/validations";

const password = UserSchemaBase.shape.password;

export const UpdateUserPasswordSchema = z
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
