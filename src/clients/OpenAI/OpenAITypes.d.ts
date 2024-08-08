type OpenAIRole = "assistant" | "user" | "system" | "function";
interface OpenAICompletionResponse {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: Choice[];
  usage: Usage;
  system_fingerprint: string; // Added to match the new field in the response
}

interface Choice {
  index: number;
  message: Message; // Updated to include the message structure
  logprobs: null | LogProbs; // null if logprobs not requested
  finish_reason: string;
}

// Introduced to accurately represent the structure of the "message" object in each choice
interface Message {
  role: OpenAIRole; // Represents the role of the message sender (e.g., "assistant")
  content: string; // The actual message content
}

interface LogProbs {
  tokens: string[];
  token_logprobs: number[];
  top_logprobs: Array<Record<string, number>>;
  text_offset: number[];
}

interface Usage {
  prompt_tokens: number;
  completion_tokens: number;
  total_tokens: number;
}

interface IOpenAIChatMessage {
  role: string;
  content: string;
}

interface IOpenAIPayload {
  model: string;
  messages: IOpenAIChatMessage[];
  temperature?: number;
}
