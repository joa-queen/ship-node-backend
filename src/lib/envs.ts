import * as z from 'zod';

declare module 'zod' {
  interface ZodString {
    optionalForNonProduction: () => z.ZodOptional<z.ZodString> | z.ZodString;
    undefinedForNonProduction: () => z.ZodUndefined | z.ZodString;
  }
}

z.ZodString.prototype.optionalForNonProduction = function optionalForNonProduction() {
  if (process.env.NODE_ENV === 'production') return this;
  return this.optional();
};

z.ZodString.prototype.undefinedForNonProduction = function optionalForNonProduction() {
  if (process.env.NODE_ENV === 'production') return this;
  return z.undefined();
};

const envSchema = z.object({
  NODE_ENV: z.string(),
  PORT: z.union([z.number(), z.string()]).default(3000),
  BASEPATH: z.string().default(''),
  DEBUG: z.boolean().default(false),

  SENTRY_DSN: z.string().url().undefinedForNonProduction(),

  DATABASE_URL: z.string(),

  JWT_SECRET: z.string(),
});

const env = envSchema.safeParse(process.env);

if (!env.success) {
  // eslint-disable-next-line no-console
  console.error('Invalid environment variables:', env.error.format());
  process.exit(1);
}

const envs = env.data;

export default envs;
