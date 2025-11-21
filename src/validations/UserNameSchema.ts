import * as z from "zod";
import { UserSchema } from "@/validations";

const name = UserSchema.shape.name;

export const UserNameSchema = z.object({
  name,
});
