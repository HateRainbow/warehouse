import z from "zod";
import dotenv from "dotenv";
import path from "path";

console.log("Loading env variables");
dotenv.config({ path: path.resolve(__dirname, "../.env") });

const envSchema = z.object({
  DB_URL: z.string().nonempty(),
  JWT_SECRET: z.string().nonempty(),
});

const parsedEnv = envSchema.safeParse(process.env);
if (parsedEnv.error) {
  const error = parsedEnv.error;
  /**
   * throw an error if an env is missing
   * @example DB_URL: String must contain at least 1 character(s)
   */
  const errorMessage = `error: invalid env:\n${Object.entries(
    error.flatten().fieldErrors
  )
    .map(([key, errors]) => `${key}: ${errors.join(", ")}\n`)
    .join("\n")}`;

  throw new Error(errorMessage);
}

const env = parsedEnv.data;

export default env;
