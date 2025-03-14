import { injectable } from 'inversify'
import { BehaviorSubject } from 'rxjs'
import { err, ok, type Result } from 'src/shared/result/Result'
import { ViewModelBase } from 'src/shared/viewModels/base/ViewModelBase'
import type { IViewModel } from 'src/shared/viewModels/interface/IViewModel'
import type { INormTwistScriptViewModel } from 'src/features/script.norm-twist/viewModels/INormTwistScriptViewModel'

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

  constructor() {
    super()
  }

  setTheme(theme: string): void {
    this._errorMessage.next('')
    this._theme.next(theme)
  }

  async generateScript(): Promise<Result<string>> {
    this.setIsBusy(true)

    if (!this._theme.value.trim()) {
      const error = new Error('Theme cannot be empty')
      this._errorMessage.next(error.message)

      this.setIsBusy(false)

      return err(error)
    }

    // In a real implementation, this would call an LLM API service
    // For now, we'll simulate a delay and return a mock response
    await new Promise((resolve) => setTimeout(resolve, 1500))

    const theme = this._theme.value
    const generatedScript = this.createMockScript(theme)

    this._generatedScript.next(generatedScript)

    this.setIsBusy(false)

    return ok(generatedScript)
  }

  private createMockScript(theme: string): string {
    return `# ${theme.toUpperCase()} SCRIPT

Scene 1: Introduction
[A character enters, looking confused]
CHARACTER: "I never thought I'd find myself in a situation about ${theme}..."

Scene 2: The Twist
[Dramatic music plays]
CHARACTER: "Wait, what if ${theme} was actually the solution all along?"

Scene 3: Resolution
[Happy ending]
CHARACTER: "And that's how I learned that ${theme} can change everything!"

THE END`
  }
}
