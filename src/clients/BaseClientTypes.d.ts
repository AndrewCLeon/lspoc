interface RequestOptions {
  signal?: AbortSignal
  retryCount?: number
  headers?: Record<string, string>
}
