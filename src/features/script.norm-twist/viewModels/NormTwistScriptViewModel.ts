import { inject, injectable } from 'inversify'
import { BehaviorSubject } from 'rxjs'
import { err, ok, type Result } from 'src/shared/result/Result'
import { ViewModelBase } from 'src/shared/viewModels/base/ViewModelBase'
import type { IViewModel } from 'src/shared/viewModels/interface/IViewModel'
import type { INormTwistScriptViewModel } from 'src/features/script.norm-twist/interfaces/viewModels/INormTwistScriptViewModel'
import { LlmTypes } from 'src/shared/llm/di/LlmTypes'
import type { ILlmApiService } from 'src/shared/llm/interfaces/services/ILlmApiService'
import { z } from 'zod'

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
    this.setIsBusy(true)

    if (!this._theme.value.trim()) {
      const error = new Error('Theme cannot be empty')
      this._errorMessage.next(error.message)

      this.setIsBusy(false)

      return err(error)
    }

    try {
      const theme = this._theme.value
      const generatedScript = await this._generateScriptWithLlm(theme)

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

  /**
   * Use LLM API to generate a comedy script based on the given theme
   * @param theme The theme for the script
   * @returns A Result containing the generated script or an error
   */
  private async _generateScriptWithLlm(theme: string): Promise<Result<string>> {
    // Define the prompt with instructions and format
    const prompt = `
以下の方法でお笑いのスクリプトを考えてください。10ラリー以内にオチまで持っていってください。

1. テーマを決定する
2. テーマから常識を一つ抽出する
3. 常識を壊すような行動をボケがするスクリプトにする
4. 常識を壊してしまうのを納得させるような設定を追加する
5. スクリプト上、ボケが常識ハズレなことをする
6. スクリプト上、ツッコミがツッコミを入れる
7. スクリプト上、常識を壊してしまうのを納得させるような状況をボケが開示する
8. スクリプト上、ツッコミは納得させられつつツッコミを入れる

<Format>
## テーマ

<Theme/>

## 常識

<ListOfCommonSense />

## 最も面白くなりそうな常識

<MostInterestingAmongListOfCommonSense />

## 常識を壊す方法

<ListOfHowToBreakCommonSense />

## 最も面白くなりそうな常識破りの方法

<MostInterestingAmongListOfHowToBreakCommonSense />

## 常識破りを納得させるような状況

<ListOfCircumstancesToLetBreakingOfCommonSenseNormal />

## 最も面白くなりそうな常識破りを納得させるような状況

<MostInterestingAmongListOfCircumstancesToLetBreakingOfCommonSenseNormal />

## スクリプト

<YourScript />

</Format>

<Theme>
${theme}
</Theme>
`

    // Define the schema for the script output
    const ScriptSchema = z.object({
      theme: z.string(),
      commonSense: z.array(z.string()),
      mostInterestingCommonSense: z.string(),
      waysToBreakCommonSense: z.array(z.string()),
      mostInterestingWayToBreakCommonSense: z.string(),
      circumstancesToNormalize: z.array(z.string()),
      mostInterestingCircumstance: z.string(),
      script: z.string(),
    })

    try {
      // Call the LLM API with the text format
      const result = await this._llmApiService.callWithTextFormat<typeof ScriptSchema>({
        model: 'gpt-4o-2024-08-06',
        input: prompt,
        temperature: 0.7,
        max_output_tokens: 2000,
        text: {
          format: {
            schema: ScriptSchema,
            name: 'comedy_script',
          },
        },
      })

      if (result.isOk) {
        const scriptData = result.value
        return ok(scriptData.script)
      } else {
        return err(result.error)
      }
    } catch (error) {
      return err(error instanceof Error ? error : new Error(String(error)))
    }
  }
}
