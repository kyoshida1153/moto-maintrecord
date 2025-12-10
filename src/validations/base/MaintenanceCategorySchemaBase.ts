import * as z from "zod";
import { ErrorMap } from "./ErrorMap";

z.setErrorMap(ErrorMap);

export const MaintenanceCategorySchemaBase = z.object({
  id: z.string().uuid(),

  name: z
    .string()
    .min(1)
    .max(20)
    .refine(
      (value) => {
        if (!/^[\s]*$/.test(value)) return true;
      },
      {
        message: "スペース、改行、タブのみの内容は保存できません。",
      },
    ),
});
