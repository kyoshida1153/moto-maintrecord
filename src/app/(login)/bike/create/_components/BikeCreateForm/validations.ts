import * as z from "zod";
import { BikeSchema, FileImageSchema } from "@/validations";

const name = BikeSchema.shape.name;
const mileage = BikeSchema.shape.mileage;
const memo = BikeSchema.shape.memo;

export const BikeCreateFormSchema = z.object({
  imageFile: z.array(FileImageSchema),
  name,
  mileage,
  memo,
});
