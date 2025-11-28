import * as z from "zod";
import { MaintenanceCategorySchemaBase } from "@/validations/base";

const { name } = MaintenanceCategorySchemaBase.shape;

export const MaintenanceCategoryEditFormSchema = z.object({
  name,
});
