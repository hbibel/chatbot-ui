import { Elysia } from "elysia";
import { loadConfigFromEnv } from "@/config";

const config = loadConfigFromEnv();

const app = new Elysia()
  .get("/", () => "Hello Elysia")
  .listen({ hostname: config.HOST, port: config.PORT });

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
