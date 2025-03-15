import { inject, injectable } from 'inversify'
import { BehaviorSubject } from 'rxjs'
import { EventAggregatorTypes } from 'src/shared/eventAggregator/di/EventAggregatorTypes'
import type { IEventAggregator } from 'src/shared/eventAggregator/interfaces/IEventAggregator'
import { LlmTypes } from 'src/shared/llm/di/LlmTypes'
import { ThrowLlmErrorEvent } from 'src/shared/llm/events/ThrowLlmErrorEvent'
import type { ILlmApiKeyService } from 'src/shared/llm/interfaces/services/ILlmApiKeyService'
import type { ILlmApiKeyViewModel } from 'src/shared/llm/interfaces/viewModels/ILlmApiKeyViewModel'
import { err, ok, type Result } from 'src/shared/result/Result'
import { ViewModelBase } from 'src/shared/viewModels/base/ViewModelBase'
import type { IViewModel } from 'src/shared/viewModels/interface/IViewModel'

@injectable()
export class LlmApiKeyViewModel extends ViewModelBase implements IViewModel, ILlmApiKeyViewModel {
  private _apiKey: BehaviorSubject<string> = new BehaviorSubject<string>('')
  public apiKey$ = this._apiKey.asObservable()

  private _apiKeyErrorMessage: BehaviorSubject<string> = new BehaviorSubject<string>('')
  public apiKeyErrorMessage$ = this._apiKeyErrorMessage.asObservable()

  private _shouldNotifyUser: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)
  public shouldNotifyUser$ = this._shouldNotifyUser.asObservable()

  private _llmErrorMessage: BehaviorSubject<string> = new BehaviorSubject<string>('')
  public llmErrorMessage$ = this._llmErrorMessage.asObservable()

  constructor(
    @inject(EventAggregatorTypes.EventAggregator) private readonly ea: IEventAggregator,
    @inject(LlmTypes.ApiKeyService) private readonly apiKeyService: ILlmApiKeyService,
  ) {
    super()
  }

  validateApiKey(apiKey: string): boolean {
    return apiKey.startsWith('sk-') && apiKey.length >= 20
  }

  setApiKey(apiKey: string): void {
    this._apiKey.next(apiKey)

    if (!this.validateApiKey(apiKey)) {
      this._apiKeyErrorMessage.next('Invalid API key format')
    } else {
      this._apiKeyErrorMessage.next('')
    }
  }

  saveApiKeyIfValid(): Result<void> {
    if (!this.validateApiKey(this._apiKey.value)) {
      this._apiKeyErrorMessage.next('Invalid API key format')
      return err(new Error('Invalid API key format'))
    }

    this._apiKeyErrorMessage.next('')
    this.apiKeyService.setApiKey(this._apiKey.value)

    return ok(undefined)
  }

  setShouldNotifyUser(shouldNotifyUser: boolean): void {
    this._llmErrorMessage.next('')
    this._shouldNotifyUser.next(shouldNotifyUser)
  }

  async load(): Promise<void> {
    this.setIsBusy(true)

    this.subscribe(this.ea, ThrowLlmErrorEvent, async (e) => {
      this._shouldNotifyUser.next(true)
      this._llmErrorMessage.next(e.payload.message)
    })

    const getApiKeyResult = this.apiKeyService.getApiKey()

    if (getApiKeyResult.isErr) {
      return
    }

    this._apiKey.next(getApiKeyResult.value)

    this.setIsBusy(false)
  }

  async unload(): Promise<void> {
    this.unsubscribe()
  }
}
