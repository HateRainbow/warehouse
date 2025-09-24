import { Request, Response, NextFunction } from "express";
import { keyof, ZodObject, ZodType } from "zod";

// zod middleware to validate the expected body data in each routes
export function validateData(schema: ZodObject<any, any>) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const result = await schema.safeParseAsync(req.body);

    if (!result.success) {
      const errorMessage = `Invalid request body:\n${Object.entries(
        result.error.flatten().fieldErrors
      )
        .map(([key, errors]) => {
          const messages = (errors as string[])?.join(", ") || "Unknown error";
          return `${key}: ${messages}`;
        })
        .join("\n")}`;

      return res.status(400).json({ error: errorMessage });
    }

    next();
  };
}
