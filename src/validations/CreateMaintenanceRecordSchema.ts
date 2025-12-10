import { MaintenanceRecordSchemaBase } from "./base";

export const CreateMaintenanceRecordSchema = MaintenanceRecordSchemaBase.omit({
  id: true,
});
