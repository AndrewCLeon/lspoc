import { OpenAIBaseClient } from "./OpenAIBaseClient";

export class OpenAIAgent {
  static API_KEY: string = "";
  // Initialize the agent
  constructor(basePrompt: string) {
    this.chatHistory = [
      {
        role: "system",
        content: basePrompt,
      },
    ];
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
}
