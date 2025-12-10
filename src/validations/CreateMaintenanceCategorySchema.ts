import { MaintenanceCategorySchemaBase } from "./base";

export const CreateMaintenanceCategorySchema =
  MaintenanceCategorySchemaBase.omit({ id: true });
