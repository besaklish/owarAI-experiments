import type { ILlmApiService } from 'src/shared/llm/interfaces/services/ILlmApiService'
import { err, ok, type Result } from 'src/shared/result/Result'
import { z } from 'zod'

export const generateScript = async (
  llmApiService: ILlmApiService,
  theme: string,
): Promise<Result<string>> => {
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

  <Theme>
  ${theme}
  </Theme>
  `

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
    const result = await llmApiService.callWithTextFormat<typeof ScriptSchema>({
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
