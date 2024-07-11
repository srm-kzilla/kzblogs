import { z } from "zod";
const MONGODB_URI_REGEX_PATTERN =
  /^mongodb(?:\+srv)?:\/\/(?:\w+:\w+@)?\w+(?:\.\w+)*(?::\d+)?(?:\/\w+)?(?:\?\w+=\w+)?/g;

const envSchema = z.object({
  GOOGLE_CLIENT_ID: z.string(),
  GOOGLE_CLIENT_SECRET: z.string(),
  NEXTAUTH_SECRET: z.string(),
  NEXTAUTH_URL: z.string().url(),
  MONGODB_URI: z.string().refine((value) => {
    return MONGODB_URI_REGEX_PATTERN.test(value);
  }, "Invalid MongoDB URI"),
  DB_NAME: z.string(),
  NEXT_PUBLIC_SECRET_KEY: z.string(),
});

export const {
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  NEXTAUTH_SECRET,
  NEXTAUTH_URL,
  MONGODB_URI,
  DB_NAME,
  NEXT_PUBLIC_SECRET_KEY,
} = envSchema.parse(process.env);
