import OpenAI from "openai";
import { OpenAIBaseClient } from "./OpenAIBaseClient";
import { assistantInstructions } from "../../instructions/AI";

export class OpenAIAgent {
  // Initialize the agent
  constructor(basePrompt: string = "") {
    const prompts: string[] = [...assistantInstructions, basePrompt];

    this.chatHistory = [
      {
        role: "system",
        content: prompts.join("\n"),
      },
    ];
  }

  static client: OpenAI;
  static setApiKey(key: string) {
    OpenAIAgent.client = new OpenAI({
      apiKey: key,
      dangerouslyAllowBrowser: true,
    });
  }

  private model: string = "gpt-4";
  private chatHistory: IOpenAIChatMessage[] = [];

  public async setModel(model: string) {
    this.model = model;
  }

  public async getModelResponse(
    prompt: string,
    options: RequestOptions
  ): Promise<[string, number]> {
    this.chatHistory.push({
      role: "user",
      content: prompt,
    });
    const payload: IOpenAIPayload = {
      model: this.model,
      messages: this.chatHistory,
      temperature: 0,
    };
    const response = await OpenAIBaseClient.getModelResponse(payload, options);
    this.chatHistory.push({
      role: "assistant",
      content: response[0],
    });
    return [response[0], response[1]];
  }

  public async uploadFile(file: File): Promise<string> {
    const response = await OpenAIAgent.client.files.create({
      file: file,
      purpose: "assistants",
    });

    return response.id;
  }

  public async getFiles() {
    return OpenAIAgent.client?.files.list();
  }
}
