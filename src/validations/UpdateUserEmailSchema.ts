import * as z from "zod";
import { UserSchemaBase } from "./base";

const { email } = UserSchemaBase.shape;

export const UpdateUserEmailSchema = z
  .object({
    currentEmail: email,
    newEmail: email,
    confirmNewEmail: email,
  })
  .superRefine(({ currentEmail, newEmail, confirmNewEmail }, ctx) => {
    if (currentEmail === newEmail) {
      ctx.addIssue({
        path: ["newEmail"],
        code: "custom",
        message: "現在のメールアドレスと同じです。",
      });
    }
    if (newEmail !== confirmNewEmail) {
      ctx.addIssue({
        path: ["confirmNewEmail"],
        code: "custom",
        message: "メールアドレスが一致しません。",
      });
    }
  });
