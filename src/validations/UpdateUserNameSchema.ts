import * as z from "zod";
import { UserSchemaBase } from "@/validations";

const name = UserSchemaBase.shape.name;

export const UpdateUserNameSchema = z.object({
  name,
});
