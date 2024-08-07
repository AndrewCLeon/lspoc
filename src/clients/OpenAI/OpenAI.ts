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

  private model: string = "gpt-3.5-turbo";
  private chatHistory: IOpenAIChatMessage[] = [];

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
    };
    const response = await OpenAIBaseClient.getModelResponse(payload, options);
    this.chatHistory.push({
      role: "assistant",
      content: response[0],
    });
    return [response[0], response[1]];
  }
}
