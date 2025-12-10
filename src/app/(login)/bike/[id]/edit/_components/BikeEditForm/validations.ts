import * as z from "zod";
import { BikeSchemaBase } from "@/validations/base";
import { FileImageSchema } from "@/validations";

const { id, name, mileage, memo } = BikeSchemaBase.shape;

export const BikeUpdateFormSchema = z.object({
  id,
  name,
  mileage,
  memo,
  imageFile: z.array(FileImageSchema).optional(),
});
