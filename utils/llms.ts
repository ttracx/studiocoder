import type { ModelInfo, OllamaApiResponse, OllamaModel } from './llms.type';

export type ProviderInfo = {
  staticModels: ModelInfo[];
  name: string;
  getDynamicModels?: (apiKeys?: Record<string, string>, providerSettings?: IProviderSetting) => Promise<ModelInfo[]>;
  getApiKeyLink?: string;
  labelForGetApiKey?: string;
  icon?: string;
};

export interface IProviderSetting {
  enabled?: boolean;
  baseUrl?: string;
}

export type IProviderConfig = ProviderInfo & {
  settings: IProviderSetting;
};

export const WORK_DIR_NAME = 'project';
export const WORK_DIR = `/home/${WORK_DIR_NAME}`;
export const MODIFICATIONS_TAG_NAME = 'bolt_file_modifications';
export const MODEL_REGEX = /^\[Model: (.*?)\]\n\n/;
export const PROVIDER_REGEX = /\[Provider: (.*?)\]\n\n/;
export const DEFAULT_LLM: ModelInfo = {
  name: 'claude-3-5-sonnet-latest',
  label: 'Claude 3.5 Sonnet (new)',
  provider: 'Anthropic',
  maxTokenAllowed: 8000,
  imageSupport: true,
};
export const PROMPT_COOKIE_KEY = 'cachedPrompt';
export const SHADCN = false;


const llms: ProviderInfo[] = [
  {
    name: 'Anthropic',
    staticModels: [
      {
        name: 'claude-3-7-sonnet-20250219',
        label: 'Claude 3.7 Sonnet',
        provider: 'Anthropic',
        maxTokenAllowed: 8000,
        imageSupport: true,
      },
      {
        name: 'claude-3-5-sonnet-latest',
        label: 'Claude 3.5 Sonnet',
        provider: 'Anthropic',
        maxTokenAllowed: 8000,
        imageSupport: true,
      },
      {
        name: 'claude-3-5-haiku-latest',
        label: 'Claude 3.5 Haiku',
        provider: 'Anthropic',
        maxTokenAllowed: 8000,
        imageSupport: true,
      },
      { 
        name: 'claude-3-opus-20240229', 
        label: 'Claude 3 Opus', 
        provider: 'Anthropic', 
        maxTokenAllowed: 8000, 
        imageSupport: true, 
      },
      { 
        name: 'claude-3-sonnet-20240229', 
        label: 'Claude 3 Sonnet', 
        provider: 'Anthropic', 
        maxTokenAllowed: 8000, 
        imageSupport: true, 
      },
      { 
        name: 'claude-3-haiku-20240307', 
        label: 'Claude 3 Haiku', 
        provider: 'Anthropic', 
        maxTokenAllowed: 8000, 
        imageSupport: true, 
      },
    ],
    getApiKeyLink: 'https://console.anthropic.com/settings/keys',
  },
  {
    name: 'Ollama',
    staticModels: [],
    getDynamicModels: getOllamaModels,
    getApiKeyLink: 'https://ollama.com/download',
    labelForGetApiKey: 'Download Ollama',
    icon: 'i-ph:cloud-arrow-down',
  },
  {
    name: 'OpenAILike',
    staticModels: [],
    getDynamicModels: getOpenAILikeModels,
  },
  {
    name: 'Cohere',
    staticModels: [
      { name: 'command-r-plus-08-2024', label: 'Command R plus Latest', provider: 'Cohere', maxTokenAllowed: 4096, imageSupport: false },
      { name: 'command-r-08-2024', label: 'Command R Latest', provider: 'Cohere', maxTokenAllowed: 4096, imageSupport: false },
      { name: 'command-r-plus', label: 'Command R plus', provider: 'Cohere', maxTokenAllowed: 4096, imageSupport: false },
      { name: 'command-r', label: 'Command R', provider: 'Cohere', maxTokenAllowed: 4096, imageSupport: false },
      { name: 'command', label: 'Command', provider: 'Cohere', maxTokenAllowed: 4096, imageSupport: false },
      { name: 'command-nightly', label: 'Command Nightly', provider: 'Cohere', maxTokenAllowed: 4096, imageSupport: false },
      { name: 'command-light', label: 'Command Light', provider: 'Cohere', maxTokenAllowed: 4096, imageSupport: false },
      { name: 'command-light-nightly', label: 'Command Light Nightly', provider: 'Cohere', maxTokenAllowed: 4096, imageSupport: false },
      { name: 'c4ai-aya-expanse-8b', label: 'c4AI Aya Expanse 8b', provider: 'Cohere', maxTokenAllowed: 4096, imageSupport: false },
      { name: 'c4ai-aya-expanse-32b', label: 'c4AI Aya Expanse 32b', provider: 'Cohere', maxTokenAllowed: 4096, imageSupport: false },
    ],
    getApiKeyLink: 'https://dashboard.cohere.com/api-keys',
  },
  {
    name: 'OpenRouter',
    staticModels: [
      { name: 'gpt-4o', label: 'GPT-4o', provider: 'OpenAI', maxTokenAllowed: 8000, imageSupport: true },
      {
        name: 'anthropic/claude-3.5-sonnet',
        label: 'Anthropic: Claude 3.5 Sonnet (OpenRouter)',
        provider: 'OpenRouter',
        maxTokenAllowed: 8000,
        imageSupport: true,
      },
      {
        name: 'anthropic/claude-3-haiku',
        label: 'Anthropic: Claude 3 Haiku (OpenRouter)',
        provider: 'OpenRouter',
        maxTokenAllowed: 8000,
        imageSupport: false,
      },
      {
        name: 'deepseek/deepseek-coder',
        label: 'Deepseek-Coder V2 236B (OpenRouter)',
        provider: 'OpenRouter',
        maxTokenAllowed: 8000,
        imageSupport: false,
      },
      {
        name: 'google/gemini-flash-1.5',
        label: 'Google Gemini Flash 1.5 (OpenRouter)',
        provider: 'OpenRouter',
        maxTokenAllowed: 8000,
        imageSupport: true,
      },
      {
        name: 'google/gemini-pro-1.5',
        label: 'Google Gemini Pro 1.5 (OpenRouter)',
        provider: 'OpenRouter',
        maxTokenAllowed: 8000,
        imageSupport: true,
      },
      { name: 'x-ai/grok-beta', label: 'xAI Grok Beta (OpenRouter)', provider: 'OpenRouter', maxTokenAllowed: 8000, imageSupport: true },
      {
        name: 'mistralai/mistral-nemo',
        label: 'OpenRouter Mistral Nemo (OpenRouter)',
        provider: 'OpenRouter',
        maxTokenAllowed: 8000,
        imageSupport: false,
      },
      {
        name: 'qwen/qwen-110b-chat',
        label: 'OpenRouter Qwen 110b Chat (OpenRouter)',
        provider: 'OpenRouter',
        maxTokenAllowed: 8000,
        imageSupport: false,
      },
      { name: 'cohere/command', label: 'Cohere Command (OpenRouter)', provider: 'OpenRouter', maxTokenAllowed: 4096, imageSupport: false },
    ],
    getDynamicModels: getOpenRouterModels,
    getApiKeyLink: 'https://openrouter.ai/settings/keys',
  },
  {
    name: 'Google',
    staticModels: [
      { name: 'gemini-2.0-pro-latest', label: 'Gemini 2.0 Pro', provider: 'Google', maxTokenAllowed: 32768, imageSupport: true },
      { name: 'gemini-2.0-flash-latest', label: 'Gemini 2.0 Flash', provider: 'Google', maxTokenAllowed: 16384, imageSupport: true },
      { name: 'gemini-2.0-ultra-latest', label: 'Gemini 2.0 Ultra', provider: 'Google', maxTokenAllowed: 32768, imageSupport: true },
      { name: 'gemini-1.5-flash-latest', label: 'Gemini 1.5 Flash', provider: 'Google', maxTokenAllowed: 8192, imageSupport: true },
      { name: 'gemini-1.5-pro-latest', label: 'Gemini 1.5 Pro', provider: 'Google', maxTokenAllowed: 8192, imageSupport: true },
      { name: 'gemini-1.5-flash-002', label: 'Gemini 1.5 Flash-002', provider: 'Google', maxTokenAllowed: 8192, imageSupport: true },
      { name: 'gemini-1.5-pro-002', label: 'Gemini 1.5 Pro-002', provider: 'Google', maxTokenAllowed: 8192, imageSupport: true },
    ],
    getApiKeyLink: 'https://aistudio.google.com/app/apikey',
  },
  {
    name: 'Groq',
    staticModels: [
      { name: 'llama-3.2-70b-latest', label: 'Llama 3.2 70B (Groq)', provider: 'Groq', maxTokenAllowed: 32000, imageSupport: false },
      { name: 'llama-3.2-11b-vision-latest', label: 'Llama 3.2 11B Vision', provider: 'Groq', maxTokenAllowed: 16000, imageSupport: true },
      { name: 'llama-3.1-70b-latest', label: 'Llama 3.1 70B', provider: 'Groq', maxTokenAllowed: 16000, imageSupport: false },
      { name: 'mixtral-8x7b-latest', label: 'Mixtral 8x7B', provider: 'Groq', maxTokenAllowed: 16000, imageSupport: false },
      { name: 'gemma-2-9b-latest', label: 'Gemma 2 9B', provider: 'Groq', maxTokenAllowed: 8000, imageSupport: false },
    ],
    getApiKeyLink: 'https://console.groq.com/keys',
  },
  {
    name: 'HuggingFace',
    staticModels: [
      {
        name: 'Qwen/Qwen2.5-Coder-32B-Instruct',
        label: 'Qwen2.5-Coder-32B-Instruct (HuggingFace)',
        provider: 'HuggingFace',
        maxTokenAllowed: 8000,
        imageSupport: false,
      },
      {
        name: '01-ai/Yi-1.5-34B-Chat',
        label: 'Yi-1.5-34B-Chat (HuggingFace)',
        provider: 'HuggingFace',
        maxTokenAllowed: 8000,
        imageSupport: false,
      },
      {
        name: 'codellama/CodeLlama-34b-Instruct-hf',
        label: 'CodeLlama-34b-Instruct (HuggingFace)',
        provider: 'HuggingFace',
        maxTokenAllowed: 8000,
        imageSupport: false,
      },
      {
        name: 'NousResearch/Hermes-3-Llama-3.1-8B',
        label: 'Hermes-3-Llama-3.1-8B (HuggingFace)',
        provider: 'HuggingFace',
        maxTokenAllowed: 8000,
        imageSupport: false,
      },
      {
        name: 'Qwen/Qwen2.5-Coder-32B-Instruct',
        label: 'Qwen2.5-Coder-32B-Instruct (HuggingFace)',
        provider: 'HuggingFace',
        maxTokenAllowed: 8000,
        imageSupport: false,
      },
      {
        name: 'Qwen/Qwen2.5-72B-Instruct',
        label: 'Qwen2.5-72B-Instruct (HuggingFace)',
        provider: 'HuggingFace',
        maxTokenAllowed: 8000,
        imageSupport: false,
      },
      {
        name: 'meta-llama/Llama-3.1-70B-Instruct',
        label: 'Llama-3.1-70B-Instruct (HuggingFace)',
        provider: 'HuggingFace',
        maxTokenAllowed: 8000,
        imageSupport: false,
      },
      {
        name: 'meta-llama/Llama-3.1-405B',
        label: 'Llama-3.1-405B (HuggingFace)',
        provider: 'HuggingFace',
        maxTokenAllowed: 8000,
        imageSupport: false,
      },
      {
        name: '01-ai/Yi-1.5-34B-Chat',
        label: 'Yi-1.5-34B-Chat (HuggingFace)',
        provider: 'HuggingFace',
        maxTokenAllowed: 8000,
        imageSupport: false,
      },
      {
        name: 'codellama/CodeLlama-34b-Instruct-hf',
        label: 'CodeLlama-34b-Instruct (HuggingFace)',
        provider: 'HuggingFace',
        maxTokenAllowed: 8000,
        imageSupport: false,
      },
      {
        name: 'NousResearch/Hermes-3-Llama-3.1-8B',
        label: 'Hermes-3-Llama-3.1-8B (HuggingFace)',
        provider: 'HuggingFace',
        maxTokenAllowed: 8000,
        imageSupport: false,
      },
    ],
    getApiKeyLink: 'https://huggingface.co/settings/tokens',
  },

  {
    name: 'OpenAI',
    staticModels: [
      { name: 'gpt-4o-2025', label: 'GPT-4o 2025', provider: 'OpenAI', maxTokenAllowed: 128000, imageSupport: true },
      { name: 'gpt-4o', label: 'GPT-4o', provider: 'OpenAI', maxTokenAllowed: 128000, imageSupport: true },
      { name: 'gpt-4-turbo', label: 'GPT-4 Turbo', provider: 'OpenAI', maxTokenAllowed: 128000, imageSupport: true },
      { name: 'o3', label: 'o3', provider: 'OpenAI', maxTokenAllowed: 32000, imageSupport: true },
      { name: 'o3-mini', label: 'o3-mini', provider: 'OpenAI', maxTokenAllowed: 16000, imageSupport: false },
      { name: 'o3-mini-high', label: 'o3-mini High', provider: 'OpenAI', maxTokenAllowed: 16000, imageSupport: false },
      { name: 'gpt-3.5-turbo-0125', label: 'GPT-3.5 Turbo (Jan 25)', provider: 'OpenAI', maxTokenAllowed: 16000, imageSupport: false },
      { name: 'gpt-3.5-turbo', label: 'GPT-3.5 Turbo (Legacy)', provider: 'OpenAI', maxTokenAllowed: 4096, imageSupport: false },
    ],
    getApiKeyLink: 'https://platform.openai.com/api-keys',
  },
  {
    name: 'xAI',
    staticModels: [{ name: 'grok-beta', label: 'xAI Grok Beta', provider: 'xAI', maxTokenAllowed: 8000, imageSupport: false }],
    getApiKeyLink: 'https://docs.x.ai/docs/quickstart#creating-an-api-key',
  },
  {
    name: 'Deepseek',
    staticModels: [
      { name: 'deepseek-coder', label: 'Deepseek-Coder', provider: 'Deepseek', maxTokenAllowed: 8000, imageSupport: false },
      { name: 'deepseek-chat', label: 'Deepseek-Chat', provider: 'Deepseek', maxTokenAllowed: 8000, imageSupport: false },
    ],
    getApiKeyLink: 'https://platform.deepseek.com/apiKeys',
  },
  {
    name: 'Mistral',
    staticModels: [
      { name: 'open-mistral-7b', label: 'Mistral 7B', provider: 'Mistral', maxTokenAllowed: 8000, imageSupport: false },
      { name: 'open-mixtral-8x7b', label: 'Mistral 8x7B', provider: 'Mistral', maxTokenAllowed: 8000, imageSupport: false },
      { name: 'open-mixtral-8x22b', label: 'Mistral 8x22B', provider: 'Mistral', maxTokenAllowed: 8000, imageSupport: false },
      { name: 'open-codestral-mamba', label: 'Codestral Mamba', provider: 'Mistral', maxTokenAllowed: 8000, imageSupport: false },
      { name: 'open-mistral-nemo', label: 'Mistral Nemo', provider: 'Mistral', maxTokenAllowed: 8000, imageSupport: false },
      { name: 'ministral-8b-latest', label: 'Mistral 8B', provider: 'Mistral', maxTokenAllowed: 8000, imageSupport: false },
      { name: 'mistral-small-latest', label: 'Mistral Small', provider: 'Mistral', maxTokenAllowed: 8000, imageSupport: false },
      { name: 'codestral-latest', label: 'Codestral', provider: 'Mistral', maxTokenAllowed: 8000, imageSupport: false },
      { name: 'mistral-large-latest', label: 'Mistral Large Latest', provider: 'Mistral', maxTokenAllowed: 8000, imageSupport: false },
      { name: 'pixtral-large-latest', label: 'Pixtral Large Latest', provider: 'Mistral', maxTokenAllowed: 8000, imageSupport: true },
    ],
    getApiKeyLink: 'https://console.mistral.ai/api-keys/',
  },
  {
    name: 'LMStudio',
    staticModels: [],
    getDynamicModels: getLMStudioModels,
    getApiKeyLink: 'https://lmstudio.ai/',
    labelForGetApiKey: 'Get LMStudio',
    icon: 'i-ph:cloud-arrow-down',
  },
  {
    name: 'Together',
    getDynamicModels: getTogetherModels,
    staticModels: [
      {
        name: 'Qwen/Qwen2.5-Coder-32B-Instruct',
        label: 'Qwen/Qwen2.5-Coder-32B-Instruct',
        provider: 'Together',
        maxTokenAllowed: 8000,
        imageSupport: false,
      },
      {
        name: 'meta-llama/Llama-3.2-90B-Vision-Instruct-Turbo',
        label: 'meta-llama/Llama-3.2-90B-Vision-Instruct-Turbo',
        provider: 'Together',
        maxTokenAllowed: 8000,
        imageSupport: true,
      },

      {
        name: 'mistralai/Mixtral-8x7B-Instruct-v0.1',
        label: 'Mixtral 8x7B Instruct',
        provider: 'Together',
        maxTokenAllowed: 8192,
        imageSupport: false,
      },
    ],
    getApiKeyLink: 'https://api.together.xyz/settings/api-keys',
  },
];

export const DEFAULT_PROVIDER = llms[0];

const staticModels: ModelInfo[] = llms.map((p) => p.staticModels).flat();

export let MODEL_LIST: ModelInfo[] = [...staticModels];

export async function getModelList(
  apiKeys: Record<string, string>,
  providerSettings?: Record<string, IProviderSetting>,
) {
  MODEL_LIST = [
    ...(
      await Promise.all(
        llms.filter(
          (p): p is ProviderInfo & { getDynamicModels: () => Promise<ModelInfo[]> } => !!p.getDynamicModels,
        ).map((p) => p.getDynamicModels(apiKeys, providerSettings?.[p.name])),
      )
    ).flat(),
    ...staticModels,
  ];
  return MODEL_LIST;
}

async function getTogetherModels(apiKeys?: Record<string, string>, settings?: IProviderSetting): Promise<ModelInfo[]> {
  try {
    const baseUrl = process.env.TOGETHER_API_BASE_URL || '';
    const provider = 'Together';

    if (!baseUrl) {
      return [];
    }

    let apiKey = process.env.OPENAI_LIKE_API_KEY ?? '';

    if (apiKeys && apiKeys[provider]) {
      apiKey = apiKeys[provider];
    }

    if (!apiKey) {
      return [];
    }

    const response = await fetch(`${baseUrl}/models`, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    });
    const res = (await response.json()) as any;
    const data: any[] = (res || []).filter((model: any) => model.type == 'chat');

    return data.map((m: any) => ({
      name: m.id,
      label: `${m.display_name} - in:$${m.pricing.input.toFixed(
        2,
      )} out:$${m.pricing.output.toFixed(2)} - context ${Math.floor(m.context_length / 1000)}k`,
      provider,
      maxTokenAllowed: 8000,
    }));
  } catch (e) {
    console.error('Error getting OpenAILike models:', e);
    return [];
  }
}

const getOllamaBaseUrl = () => {
  const defaultBaseUrl = process.env.OLLAMA_API_BASE_URL || 'http://localhost:11434';

  // Check if we're in the browser
  if (typeof window !== 'undefined') {
    // Frontend always uses localhost
    return defaultBaseUrl;
  }

  // Backend: Check if we're running in Docker
  const isDocker = process.env.RUNNING_IN_DOCKER === 'true';

  return isDocker ? defaultBaseUrl.replace('localhost', 'host.docker.internal') : defaultBaseUrl;
};

async function getOllamaModels(): Promise<ModelInfo[]>  {
  try {
    const baseUrl = getOllamaBaseUrl();
    const response = await fetch(`${baseUrl}/api/tags`);
    const data = (await response.json()) as OllamaApiResponse;

    return data.models.map((model: OllamaModel) => ({
      name: model.name,
      label: `${model.name} (${model.details.parameter_size})`,
      provider: 'Ollama',
      maxTokenAllowed: 8000,
    }));
  } catch (e: any) {
    console.warn('Failed to get Ollama models: ', e.message || '');

    return [];
  }
}

async function getOpenAILikeModels(
  apiKeys?: Record<string, string>,
): Promise<ModelInfo[]> {
  try {
    const baseUrl = process.env.OPENAI_LIKE_API_BASE_URL || '';

    if (!baseUrl) {
      return [];
    }

    let apiKey = process.env.OPENAI_LIKE_API_KEY ?? '';

    if (apiKeys && apiKeys.OpenAILike) {
      apiKey = apiKeys.OpenAILike;
    }

    const response = await fetch(`${baseUrl}/models`, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    });
    const res = (await response.json()) as any;

    return res.data.map((model: any) => ({
      name: model.id,
      label: model.id,
      provider: 'OpenAILike',
    }));
  } catch (e) {
    console.error('Error getting OpenAILike models:', e);
    return [];
  }
}

type OpenRouterModelsResponse = {
  data: {
    name: string;
    id: string;
    context_length: number;
    pricing: {
      prompt: number;
      completion: number;
    };
  }[];
};

async function getOpenRouterModels(): Promise<ModelInfo[]> {
  const data: OpenRouterModelsResponse = await (
    await fetch('https://openrouter.ai/api/v1/models', {
      headers: {
        'Content-Type': 'application/json',
      },
    })
  ).json();

  return data.data
    .sort((a, b) => a.name.localeCompare(b.name))
    .map((m) => ({
      name: m.id,
      label: `${m.name} - in:$${(m.pricing.prompt * 1_000_000).toFixed(
        2,
      )} out:$${(m.pricing.completion * 1_000_000).toFixed(2)} - context ${Math.floor(m.context_length / 1000)}k`,
      provider: 'OpenRouter',
      maxTokenAllowed: 8000,
    }));
}

async function getLMStudioModels(): Promise<ModelInfo[]> {
  if (typeof window === 'undefined') {
    return [];
  }

  try {
    const baseUrl = process.env.LMSTUDIO_API_BASE_URL || 'http://localhost:1234';
    const response = await fetch(`${baseUrl}/v1/models`);
    const data = (await response.json()) as any;

    return data.data.map((model: any) => ({
      name: model.id,
      label: model.id,
      provider: 'LMStudio',
    }));
  } catch (e: any) {
    console.warn('Failed to get LMStudio models: ', e.message || '');

    return [];
  }
}

async function initializeModelList(providerSettings?: Record<string, IProviderSetting>): Promise<ModelInfo[]> {
  let apiKeys: Record<string, string> = {};

  MODEL_LIST = [
    ...(
      await Promise.all(
        llms.filter(
          (p): p is ProviderInfo & { getDynamicModels: () => Promise<ModelInfo[]> } => !!p.getDynamicModels,
        ).map((p) => p.getDynamicModels(apiKeys, providerSettings?.[p.name])),
      )
    ).flat(),
    ...staticModels,
  ];

  return MODEL_LIST;
}

export {
  getOllamaModels,
  getOpenAILikeModels,
  getLMStudioModels,
  initializeModelList,
  getOpenRouterModels,
  llms,
};