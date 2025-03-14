import { inject, injectable } from 'inversify'
import { BehaviorSubject } from 'rxjs'
import { err, ok, type Result } from 'src/shared/result/Result'
import { ViewModelBase } from 'src/shared/viewModels/base/ViewModelBase'
import type { IViewModel } from 'src/shared/viewModels/interface/IViewModel'
import type { INormTwistScriptViewModel } from 'src/features/script.norm-twist/interfaces/viewModels/INormTwistScriptViewModel'
import { LlmTypes } from 'src/shared/llm/di/LlmTypes'
import type { ILlmApiService } from 'src/shared/llm/interfaces/services/ILlmApiService'
import { generateScript } from 'src/features/script.norm-twist/viewModels/helpers/generateScriptHelper'

@injectable()
export class NormTwistScriptViewModel
  extends ViewModelBase
  implements IViewModel, INormTwistScriptViewModel
{
  private _theme: BehaviorSubject<string> = new BehaviorSubject<string>('')
  public theme$ = this._theme.asObservable()

  private _errorMessage: BehaviorSubject<string> = new BehaviorSubject<string>('')
  public errorMessage$ = this._errorMessage.asObservable()

  private _generatedScript: BehaviorSubject<string> = new BehaviorSubject<string>('')
  public generatedScript$ = this._generatedScript.asObservable()

  constructor(@inject(LlmTypes.ApiService) private _llmApiService: ILlmApiService) {
    super()
  }

  setTheme(theme: string): void {
    this._errorMessage.next('')
    this._theme.next(theme)
  }

  async generateScript(): Promise<Result<string>> {
    if (this._isBusy.value) {
      return err(new Error('The ViewModel is busy'))
    }

    this.setIsBusy(true)

    if (!this._theme.value.trim()) {
      const error = new Error('Theme cannot be empty')
      this._errorMessage.next(error.message)

      this.setIsBusy(false)

      return err(error)
    }

    try {
      const theme = this._theme.value
      const generatedScript = await generateScript(this._llmApiService, theme)

      if (generatedScript.isOk) {
        this._generatedScript.next(generatedScript.value)
        this.setIsBusy(false)
        return ok(generatedScript.value)
      } else {
        this._errorMessage.next(generatedScript.error.message)
        this.setIsBusy(false)
        return err(generatedScript.error)
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred'
      this._errorMessage.next(errorMessage)
      this.setIsBusy(false)
      return err(new Error(errorMessage))
    }
  }
}
