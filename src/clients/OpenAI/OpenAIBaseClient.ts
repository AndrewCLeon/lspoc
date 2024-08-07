import { AxiosResponse } from "axios";
import { BaseClient } from "../BaseClient";

export class OpenAIBaseClient {
  public static API_KEY: string = "";
  private static readonly baseUrl =
    "https://api.openai.com/v1/chat/completions";

  public static async getModelResponse(
    payload: IOpenAIPayload,
    options: RequestOptions
  ): Promise<[string, number]> {
    try {
      const fullRequestOptions = Object.assign({}, options, {
        headers: {
          Authorization: `Bearer ${OpenAIBaseClient.API_KEY}`,
        },
      });
      const res: AxiosResponse<OpenAICompletionResponse> =
        await BaseClient.PostJson(
          OpenAIBaseClient.baseUrl,
          payload,
          fullRequestOptions
        );

      return [
        res.data.choices[0].message.content,
        res.data.usage.prompt_tokens,
      ];
    } catch (error) {
      throw new Error(`Error fetching single series data: ${error}`);
    }
  }
}
