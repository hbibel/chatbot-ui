import { z } from "zod";

const ServerConfigSchema = z.object({
  host: z.string(),
  port: z.number({ coerce: true }).int().gt(0).lt(65536),
});
const ModelConfigSchema = z.object({
  provider: z.literal("google"),
  apiKey: z.string(),
  model: z.string(),
});

const AppConfigSchema = z.object({
  server: ServerConfigSchema,
  model: ModelConfigSchema,
});

export type AppConfig = z.infer<typeof AppConfigSchema>;

export function loadConfigFromEnv(): AppConfig {
  return AppConfigSchema.parse(envToObj(process.env));
}

// empty interface needed to work around recursive type definition
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface V extends NestedEnv {}
type NestedEnv = Record<string, string | V>;

/**
 * Convert process.env into a nested object with camel-case keys.
 *
 * For example:
 *
 * ```
 * {
 *    FOO: "1",
 *    BAR__BAZ_QUX: "2",
 * }
 * ```
 *
 * will become
 *
 * ```
 *    {
 *      foo: "1",
 *      bar: {
 *        bazQux: "2",
 *      }
 *    }
 * ```
 */
function envToObj(
  env: Record<string, string | undefined>
): Record<string, unknown> {
  const nestedDelimiter = "__";

  const camelCaseEnv: NestedEnv = {};

  for (const key in env) {
    // key = FOO__BAR_BAZ => path = [foo, barBaz]
    const path = key.split(nestedDelimiter).map(toCamelCase);

    // valueContainer: The object that will finally contain the value env[key]
    let valueContainer = camelCaseEnv;
    for (let i = 0; i < path.length; i++) {
      const k = path[i];
      if (i == path.length - 1) {
        // last path element => copy the original value from env
        if (valueContainer[k] !== undefined) {
          const pathStr = path.join(".");
          throw new Error(
            `The configuration value "${pathStr}" already exits. Maybe ` +
              `there is a nested configuration object with the same key.`
          );
        }
        valueContainer[k] = env[key] ?? "";
      } else {
        if (!(k in valueContainer)) {
          const obj = {};
          valueContainer[k] = obj;
        }
        const val = valueContainer[k];
        if (typeof val === "string") {
          // The environment contains an existing key { foo: "something" },
          // and we're trying to add a nested value
          // { foo: { bar: "something else" } }
          const existingPathStr = path.slice(0, i + 1).join(".");
          const nestedPathStr = path.join(".");
          throw new Error(
            `The configuration value "${existingPathStr}" is not allowed ` +
              `because there is a more deeply nested configuration value ` +
              `"${nestedPathStr}"`
          );
        }
        valueContainer = val;
      }
    }
  }

  return camelCaseEnv;
}

function toCamelCase(s: string): string {
  if (s.length === 0) {
    return s;
  }

  const words = s.split("_").map(word => {
    if (word.length === 0) {
      return word;
    }
    return word[0].toUpperCase() + word.slice(1).toLowerCase();
  });

  words[0] = words[0].toLowerCase();
  return words.join("");
}
