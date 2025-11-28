import * as z from "zod";
import { BikeSchemaBase } from "@/validations/base";
import { FileImageSchema } from "@/validations";

const { name, mileage, memo } = BikeSchemaBase.shape;

export const BikeCreateFormSchema = z.object({
  imageFile: z.array(FileImageSchema).optional(),
  name,
  mileage,
  memo,
});
