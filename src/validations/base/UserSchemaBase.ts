import * as z from "zod";
import { ErrorMap } from "./ErrorMap";

z.setErrorMap(ErrorMap);

export const UserSchemaBase = z.object({
  name: z.string().min(1).max(20),
  email: z.string().min(1).email(),
  password: z
    .string()
    .min(12)
    .max(64)
    .regex(
      /^(?=.*?[a-zA-Z])(?=.*?\d)(?=.*[!#$%&\(\)*+,-\./:;=\?@\[\]^_{|}~])[a-zA-Z\d!#$%&\(\)*+,-\./:;=\?@\[\]^_{|}~]{8,64}$/i,
      "・パスワードには「英字」「数字」「記号」の3種類の文字が含まれるようにしてください。\n・使用できる記号: !#$%&()*+,-./:;=?@[]^_{|}~",
    ),
});
