import type { ILlmApiKeyService } from 'src/shared/llm/apiKey/interfaces/ILlmApiKeyService'
import { err, ok, type Result } from 'src/shared/result/Result'

export class LlmApiKeyService implements ILlmApiKeyService {
  private localStorageKey = 'llmApiKey'

  hasApiKey(): boolean {
    return localStorage.getItem(this.localStorageKey) !== null
  }

  getApiKey(): Result<string> {
    const apiKey = localStorage.getItem(this.localStorageKey)

    if (apiKey === null) {
      return err(new Error('LLM API key not found'))
    }

    return ok(apiKey)
  }

  setApiKey(apiKey: string): void {
    localStorage.setItem(this.localStorageKey, apiKey)
  }
}
