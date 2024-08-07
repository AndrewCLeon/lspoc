import axios, { AxiosRequestConfig, AxiosResponse, Method } from 'axios'

export class BaseClient {
  private static async makeRequest<DT, RT>(method: Method, url: string, data?: DT, options: RequestOptions = {}): Promise<AxiosResponse<RT>> {
    const { signal, retryCount = 3, headers = {} } = options
    const config: AxiosRequestConfig = {
      method,
      url,
      data,
      headers: Object.assign({}, { 'Content-Type': 'application/json' }, headers),
      signal,
    }

    for (let attempt = 0; attempt < retryCount; attempt++) {
      try {
        return await axios(config)
      } catch (error) {
        if (attempt === retryCount - 1) throw error
        if (axios.isCancel(error)) throw error
      }
    }

    throw new Error('Request failed after retries')
  }

  public static async GetJson<RT>(url: string, options?: RequestOptions): Promise<AxiosResponse<RT>> {
    return this.makeRequest<null, RT>('GET', url, undefined, options)
  }

  public static async PostJson<DT, RT>(url: string, data: DT, options?: RequestOptions): Promise<AxiosResponse<RT>> {
    return this.makeRequest<DT, RT>('POST', url, data, options)
  }

  public static async PutJson<DT, RT>(url: string, data: DT, options?: RequestOptions): Promise<AxiosResponse<RT>> {
    return this.makeRequest<DT, RT>('PUT', url, data, options)
  }

  public static async Delete<RT>(url: string, options?: RequestOptions): Promise<AxiosResponse<RT>> {
    return this.makeRequest<null, RT>('DELETE', url, undefined, options)
  }

  public static async UploadFile<FT extends File | Blob, RT>(url: string, file: FT, options?: RequestOptions): Promise<AxiosResponse<RT>> {
    const formData = new FormData()
    formData.append('file', file)

    return this.makeRequest<FormData, RT>('POST', url, formData, options)
  }
}
