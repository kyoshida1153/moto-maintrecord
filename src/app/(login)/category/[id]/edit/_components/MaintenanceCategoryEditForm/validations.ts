import * as z from "zod";
import { MaintenanceCategorySchemaBase } from "@/validations/base";

const { id, name } = MaintenanceCategorySchemaBase.shape;

export const MaintenanceCategoryEditFormSchema = z.object({
  id,
  name,
});
