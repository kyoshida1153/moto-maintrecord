import * as z from "zod";
import { MaintenanceRecordSchemaBase } from "@/validations/base";
import { FileImageSchema } from "@/validations";

const {
  bikeId,
  maintenanceCategoryId,
  calenderDate,
  isDone,
  title,
  cost,
  memo,
  mileage,
} = MaintenanceRecordSchemaBase.shape;

export const MaintenanceRecordEditFormSchema = z.object({
  bikeId,
  maintenanceCategoryId,
  calenderDate,
  isDone,
  title,
  cost,
  memo,
  mileage,
  imageFiles: z.array(FileImageSchema).optional(),
});
