import { inject, injectable } from 'inversify'
import { BehaviorSubject } from 'rxjs'
import { EventAggregatorTypes } from 'src/shared/eventAggregator/di/EventAggregatorTypes'
import type { IEventAggregator } from 'src/shared/eventAggregator/interfaces/IEventAggregator'
import { LlmTypes } from 'src/shared/llm/di/LlmTypes'
import type { ILlmApiKeyService } from 'src/shared/llm/interfaces/ILlmApiKeyService'
import type { ILlmApiKeyViewModel } from 'src/shared/llm/interfaces/ILlmApiKeyViewModel'
import { err, ok, type Result } from 'src/shared/result/Result'
import { ViewModelBase } from 'src/shared/viewModels/base/ViewModelBase'
import type { IViewModel } from 'src/shared/viewModels/interface/IViewModel'

@injectable()
export class LlmApiKeyViewModel extends ViewModelBase implements IViewModel, ILlmApiKeyViewModel {
  private _apiKey: BehaviorSubject<string> = new BehaviorSubject<string>('')
  public apiKey$ = this._apiKey.asObservable()

  private _errorMessage: BehaviorSubject<string> = new BehaviorSubject<string>('')
  public errorMessage$ = this._errorMessage.asObservable()

  constructor(
    @inject(EventAggregatorTypes.EventAggregator) readonly ea: IEventAggregator,
    @inject(LlmTypes.ApiKeyService) private readonly apiKeyService: ILlmApiKeyService,
  ) {
    super(ea)
  }

  validateApiKey(apiKey: string): boolean {
    return apiKey.startsWith('sk-')
  }

  setApiKey(apiKey: string): void {
    if (!this.validateApiKey(apiKey)) {
      this._errorMessage.next('Invalid API key')
    } else {
      this._errorMessage.next('')
    }

    this._apiKey.next(apiKey)
  }

  saveApiKeyIfValid(): Result<void> {
    if (!this.validateApiKey(this._apiKey.value)) {
      this._errorMessage.next('Invalid API key')
      return err(new Error('Invalid API key'))
    }

    this._errorMessage.next('')
    this.apiKeyService.setApiKey(this._apiKey.value)

    return ok(undefined)
  }

  async load(): Promise<void> {
    const getApiKeyResult = this.apiKeyService.getApiKey()

    if (getApiKeyResult.isErr) {
      return
    }

    this._apiKey.next(getApiKeyResult.value)
  }
}
