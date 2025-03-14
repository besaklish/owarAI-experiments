import { inject, injectable } from 'inversify'
import { BehaviorSubject } from 'rxjs'
import { LlmTypes } from 'src/shared/llm/di/LlmTypes'
import type { ILlmApiKeyService } from 'src/shared/llm/interfaces/services/ILlmApiKeyService'
import type { ILlmApiKeyViewModel } from 'src/shared/llm/interfaces/viewModels/ILlmApiKeyViewModel'
import { err, ok, type Result } from 'src/shared/result/Result'
import { ViewModelBase } from 'src/shared/viewModels/base/ViewModelBase'
import type { IViewModel } from 'src/shared/viewModels/interface/IViewModel'

@injectable()
export class LlmApiKeyViewModel extends ViewModelBase implements IViewModel, ILlmApiKeyViewModel {
  private _apiKey: BehaviorSubject<string> = new BehaviorSubject<string>('')
  public apiKey$ = this._apiKey.asObservable()

  private _errorMessage: BehaviorSubject<string> = new BehaviorSubject<string>('')
  public errorMessage$ = this._errorMessage.asObservable()

  constructor(@inject(LlmTypes.ApiKeyService) private readonly apiKeyService: ILlmApiKeyService) {
    super()
  }

  validateApiKey(apiKey: string): boolean {
    return apiKey.startsWith('sk-') && apiKey.length >= 20
  }

  setApiKey(apiKey: string): void {
    this._apiKey.next(apiKey)

    if (!this.validateApiKey(apiKey)) {
      this._errorMessage.next('Invalid API key format')
    } else {
      this._errorMessage.next('')
    }
  }

  saveApiKeyIfValid(): Result<void> {
    if (!this.validateApiKey(this._apiKey.value)) {
      this._errorMessage.next('Invalid API key format')
      return err(new Error('Invalid API key format'))
    }

    this._errorMessage.next('')
    this.apiKeyService.setApiKey(this._apiKey.value)

    return ok(undefined)
  }

  async load(): Promise<void> {
    this.setIsBusy(true)

    const getApiKeyResult = this.apiKeyService.getApiKey()

    if (getApiKeyResult.isErr) {
      return
    }

    this._apiKey.next(getApiKeyResult.value)

    this.setIsBusy(false)
  }
}
