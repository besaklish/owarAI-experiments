import { inject, injectable } from 'inversify'
import { BehaviorSubject } from 'rxjs'
import { ViewModelBase } from 'src/shared/viewModels/base/ViewModelBase'
import type { IDynamicUIViewModel } from 'src/features/dynamic-ui/interfaces/viewModels/IDynamicUIViewModel'
import { LlmTypes } from 'src/shared/llm/di/LlmTypes'
import type { ILlmApiService } from 'src/shared/llm/interfaces/services/ILlmApiService'
import { z } from 'zod'
import { err, ok } from 'src/shared/result/Result'

@injectable()
export class DynamicUIViewModel extends ViewModelBase implements IDynamicUIViewModel {
  private _errorMessage: BehaviorSubject<string> = new BehaviorSubject<string>('')
  public errorMessage$ = this._errorMessage.asObservable()

  private _generatedScript: BehaviorSubject<string> = new BehaviorSubject<string>('')
  public generatedScript$ = this._generatedScript.asObservable()

  constructor(@inject(LlmTypes.ApiService) private readonly _llmApiService: ILlmApiService) {
    super()
  }

  async generateInnerHtml(revise = false): Promise<void> {
    if (this._isBusy.value) {
      return
    }

    this.setIsBusy(true)

    // Only pass previousHtml if revise is true and there's existing content
    const previousHtml =
      revise && this._generatedScript.value ? this._generatedScript.value : undefined
    const dynamicHtmlResult = await this.generateDynamicHtml(previousHtml)

    if (dynamicHtmlResult.isOk) {
      this._generatedScript.next(dynamicHtmlResult.value)
      this._errorMessage.next('')
    } else {
      this._errorMessage.next(dynamicHtmlResult.error.message)
    }

    this.setIsBusy(false)
  }

  private async generateDynamicHtml(previousHtml?: string) {
    const basePrompt = `
    Create a dynamic and interactive HTML snippet that does something unexpected but safe when rendered in a browser.
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

    const revisionPrompt = previousHtml
      ? `
    Revise and improve the following HTML snippet. Keep the core functionality but make it more interesting,
    creative, or visually appealing. You can change colors, animations, interactions, or add new elements.

    Current HTML:
    \`\`\`html
    ${previousHtml}
    \`\`\`

    Your revised HTML should:
    1. Maintain or enhance the interactive elements
    2. Use CSS for improved visual effects
    3. Be contained within a single div element
    4. Not contain any harmful scripts or dangerous code
    5. Be visually unusual but still functional

    The HTML should be valid and safe to render in a browser.
    `
      : basePrompt

    const DynamicHtmlSchema = z.object({
      description: z.string(),
      htmlContent: z.string(),
    })

    try {
      const result = await this._llmApiService.callWithTextFormat<typeof DynamicHtmlSchema>({
        model: 'gpt-4o',
        input: previousHtml ? revisionPrompt : basePrompt,
        temperature: 0.8,
        max_output_tokens: 1000,
        text: {
          format: {
            schema: DynamicHtmlSchema,
            name: 'dynamic_html',
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
