import type { Result } from 'src/shared/result/Result'

export interface ILlmApiKeyService {
  getApiKey(): Result<string>
  setApiKey(apiKey: string): void
}
