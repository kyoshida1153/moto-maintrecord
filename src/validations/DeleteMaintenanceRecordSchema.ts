import * as z from "zod";
import { MaintenanceRecordSchemaBase } from "./base";

const { id } = MaintenanceRecordSchemaBase.shape;

export const DeleteMaintenanceRecordSchema = z.object({
  id,
});
