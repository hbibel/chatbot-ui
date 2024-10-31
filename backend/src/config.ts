import { z } from "zod";

const AppConfigSchema = z.object({
  HOST: z.string(),
  PORT: z.number({ coerce: true }).int().gt(0).lt(65536),
});

export type AppConfig = z.infer<typeof AppConfigSchema>;

export function loadConfigFromEnv(): AppConfig {
  return AppConfigSchema.parse(process.env);
}
