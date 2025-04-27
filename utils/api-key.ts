// @ts-nocheck
// Preventing TS checks with files presented in the video for a better presentation.
import { env } from "process";

export function getAPIKey(
  provider: string,
  userApiKeys?: Record<string, string>,
) {
  /**
   * The `cloudflareEnv` is only used when deployed or when previewing locally.
   * In development the environment variables are available through `env`.
   */

  // First check user-provided API keys
  if (userApiKeys?.[provider]) {
    return userApiKeys[provider];
  }

  // Fall back to environment variables
  switch (provider) {
    case "Anthropic":
      return env.ANTHROPIC_API_KEY;
    case "OpenAI":
      return env.OPENAI_API_KEY;
    case "Google":
      return env.GOOGLE_GENERATIVE_AI_API_KEY;
    case "Groq":
      return env.GROQ_API_KEY
    case "HuggingFace":
      return env.HuggingFace_API_KEY
    case "OpenRouter":
      return env.OPEN_ROUTER_API_KEY
    case "Deepseek":
      return env.DEEPSEEK_API_KEY
    case "Mistral":
      return env.MISTRAL_API_KEY
    case "OpenAILike":
      return env.OPENAI_LIKE_API_KEY
    case "Together":
      return env.TOGETHER_API_KEY
    case "xAI":
      return env.XAI_API_KEY
    case "Cohere":
      return env.COHERE_API_KEY;
    case "AzureOpenAI":
      return env.AZURE_OPENAI_API_KEY;
    default:
      return "";
  }
}

export function getBaseURL(provider: string) {
  switch (provider) {
    case "Together":
      return env.TOGETHER_API_BASE_URL || "https://api.together.xyz/v1";
    case "OpenAILike":
      return env.OPENAI_LIKE_API_BASE_URL || "https://api.openai.com";
    case "LMStudio":
      return env.LMSTUDIO_API_BASE_URL || "http://localhost:1234";
    case "Ollama":
      let baseUrl = env.OLLAMA_API_BASE_URL || "http://localhost:11434";
      if (env.RUNNING_IN_DOCKER === "true") {
        baseUrl = baseUrl.replace("localhost", "host.docker.internal");
      }
      return baseUrl;
    default:
      return "";
  }
}
