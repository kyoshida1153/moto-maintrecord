import * as z from "zod";
import { BikeSchemaBase } from "./base";

const { id } = BikeSchemaBase.shape;

export const DeleteBikeSchema = z.object({
  id,
});
