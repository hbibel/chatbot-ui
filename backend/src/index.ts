import { Elysia } from "elysia";

import { loadConfigFromEnv } from "@/config";
import { chatRouter } from "@/web/chat";

import { createAppLayer } from "./appLayer";

const config = loadConfigFromEnv();
const appLayer = createAppLayer(config);

const app = new Elysia()
  .get("/", () => "Hello Elysia")
  .use(chatRouter(appLayer))
  .listen({ hostname: config.server.host, port: config.server.port });

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
