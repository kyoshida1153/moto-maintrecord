import * as z from "zod";
import { UserSchemaBase } from "./base";

const { name } = UserSchemaBase.shape;

export const UpdateUserNameSchema = z.object({
  name,
});
