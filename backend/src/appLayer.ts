import { AppConfig } from "@/config";
import { StreamChatCompletions } from "@/service/chat";

import { createStreamChatCompletions } from "./infrastructure/chat/google";

/**
 * Create all adapters required to run the application
 */
export function createAppLayer(config: AppConfig) {
  const streamChatCompletions: StreamChatCompletions =
    createStreamChatCompletions({
      model: config.model.model,
      apiKey: config.model.apiKey,
    });

  return { streamChatCompletions };
}
