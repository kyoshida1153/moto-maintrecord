import * as z from "zod";
import { UserSchemaBase } from "./base";

const { password } = UserSchemaBase.shape;

export const UpdateUserPasswordSchema = z
  .object({
    currentPassword: z.string().nullable(),
    newPassword: password,
    confirmNewPassword: z
      .string()
      .min(1, "新しいパスワードを再度入力してください。"),
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
