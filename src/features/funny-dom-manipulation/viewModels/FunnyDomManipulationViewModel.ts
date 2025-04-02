import { inject, injectable } from 'inversify'
import { BehaviorSubject } from 'rxjs'
import { ViewModelBase } from 'src/shared/viewModels/base/ViewModelBase'
import type { IFunnyDomManipulationViewModel } from 'src/features/funny-dom-manipulation/interfaces/viewModels/IFunnyDomManipulationViewModel'
import { LlmTypes } from 'src/shared/llm/di/LlmTypes'
import type { ILlmApiService } from 'src/shared/llm/interfaces/services/ILlmApiService'
import { z } from 'zod'
import { err, ok } from 'src/shared/result/Result'

@injectable()
export class FunnyDomManipulationViewModel
  extends ViewModelBase
  implements IFunnyDomManipulationViewModel
{
  private _errorMessage: BehaviorSubject<string> = new BehaviorSubject<string>('')
  public errorMessage$ = this._errorMessage.asObservable()

  private _generatedScript: BehaviorSubject<string> = new BehaviorSubject<string>('')
  public generatedScript$ = this._generatedScript.asObservable()

  constructor(@inject(LlmTypes.ApiService) private readonly _llmApiService: ILlmApiService) {
    super()
  }

  async generateInnerHtml(): Promise<string> {
    this.setIsBusy(true)

    try {
      const funnyHtmlResult = await this.generateFunnyHtml()

      if (funnyHtmlResult.isOk) {
        this._generatedScript.next(funnyHtmlResult.value)
        this._errorMessage.next('')
        this.setIsBusy(false)
        return funnyHtmlResult.value
      } else {
        // If LLM fails, fallback to the original static HTML
        const randomErrorMessages = [
          'Call the police!',
          'Something went wrong!',
          'Oops! Try again.',
          'Unexpected error occurred.',
          'Please contact support.',
        ]

        const randomErrorMessage =
          randomErrorMessages[Math.floor(Math.random() * randomErrorMessages.length)]
        this._errorMessage.next(randomErrorMessage)

        const htmlContent = `
          <div style="transform: rotate(180deg);">
            <form>
              <label for="username">Username:</label>
              <input type="text" id="username" name="username"><br><br>
              <label for="password">Password:</label>
              <input type="password" id="password" name="password"><br><br>
              <input type="submit" value="Submit">
            </form>
          </div>
        `
        this._generatedScript.next(htmlContent)
        this.setIsBusy(false)
        return htmlContent
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred'
      this._errorMessage.next(errorMessage)
      this.setIsBusy(false)

      // Return fallback HTML in case of error
      const fallbackHtml = `
        <div style="transform: rotate(180deg);">
          <p>Failed to generate funny HTML: ${errorMessage}</p>
        </div>
      `
      this._generatedScript.next(fallbackHtml)
      return fallbackHtml
    }
  }

  private async generateFunnyHtml() {
    const prompt = `
    Create a funny and quirky HTML snippet that does something unexpected but safe when rendered in a browser.
    Be creative and playful. The HTML should:
    1. Have visual or interactive elements that surprise the user
    2. Use CSS for visual effects
    3. Be contained within a single div element
    4. Not contain any harmful scripts or dangerous code
    5. Be visually unusual but still functional

    Some ideas:
    - Elements that move or change when hovered
    - Unusual form inputs with funny validations
    - Strange visual transformations
    - Playful animations
    - Unexpected color combinations

    The HTML should be valid and safe to render in a browser.
    `

    const FunnyHtmlSchema = z.object({
      description: z.string(),
      htmlContent: z.string(),
    })

    try {
      const result = await this._llmApiService.callWithTextFormat<typeof FunnyHtmlSchema>({
        model: 'gpt-4o',
        input: prompt,
        temperature: 0.8,
        max_output_tokens: 1000,
        text: {
          format: {
            schema: FunnyHtmlSchema,
            name: 'funny_html',
          },
        },
      })

      if (result.isOk) {
        return ok(result.value.htmlContent)
      } else {
        return err(result.error)
      }
    } catch (error) {
      return err(error instanceof Error ? error : new Error(String(error)))
    }
  }
}
