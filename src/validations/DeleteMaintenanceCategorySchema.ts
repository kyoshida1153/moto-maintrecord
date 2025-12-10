import * as z from "zod";
import { MaintenanceCategorySchemaBase } from "./base";

const { id } = MaintenanceCategorySchemaBase.shape;

export const DeleteMaintenanceCategorySchema = z.object({
  id,
});
