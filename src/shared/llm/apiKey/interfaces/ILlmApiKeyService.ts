import type { Result } from 'src/shared/result/Result'

export interface ILlmApiKeyService {
  hasApiKey(): boolean
  getApiKey(): Result<string>
  setApiKey(apiKey: string): void
}
