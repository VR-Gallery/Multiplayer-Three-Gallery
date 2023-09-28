import { z } from "zod";

const isValid = (data: any, schema: z.ZodObject<any, any>) => {
  const validation = schema.safeParse(data);
  if (!validation.success) {
    console.log(validation.error);
    return false;
  }
  return true;
};

export default isValid;
