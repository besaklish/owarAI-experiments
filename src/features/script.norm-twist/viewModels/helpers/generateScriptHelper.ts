import type { ILlmApiService } from 'src/shared/llm/interfaces/services/ILlmApiService'
import { err, ok, type Result } from 'src/shared/result/Result'
import { z } from 'zod'

export const generateScript = async (
  llmApiService: ILlmApiService,
  theme: string,
): Promise<Result<string>> => {
  const prompt = `
  以下の方法でお笑いのスクリプトを考えてください。

  手順通りに出力を生成し、最後にスクリプトを生成してください。

  <Procedure>
  1. テーマを決定する
  2. テーマから常識を一つ抽出する
  3. 常識を壊すような行動をボケがするスクリプトにする
  4. 常識を壊してしまうのを納得させるような設定を追加する
  5. スクリプト上、ボケが常識ハズレなことをする
  6. スクリプト上、ツッコミがツッコミを入れる
  7. スクリプト上、常識を壊してしまうのを納得させるような状況をボケが開示する
  8. スクリプト上、ツッコミは納得させられつつツッコミを入れる
  </Procedure>

  <Constraints>
  Procedureに書かれている単語(「常識」「納得」やそれに類する言葉)を使わず、読者に「常識を壊して、それを納得させたい」という狙いを悟られないようにする。

  10ラリー以上の文章を生成する。

  中川家がM-1グランプリで披露するようなネタを想定する(「中川家」に直接関連する言葉はスクリプトには含めない)。
    普通は日常で起こりうる常識を粒立てて、そこにおかしさがあると伝えていくスタイル。
    奇想天外なネタを考えるのではなく、現実に起こることへの捉え方を変えることで笑いを取るスタイル。
  </Constraints>

  <ReasonOfLaughter>
  安全・無害であることだけでは足りず、『予想外なのに害がない』というギャップが認識されたときに初めて笑いが生まれる

  - なぜ単に安全・無害なだけでは笑えないのか？
    安全なものがすべて面白いわけではなく、そこに「意外なズレ（予測の裏切り）」がなければ脳の報酬系は働きません。平凡な石ころを見ても何のギャップも起こらないため笑いにはつながらない、という理屈です。

  - 意外なズレをより詳細に言うと？
    一般に「意外なズレ」は、私たちが事前に描いている文脈・常識・パターンが良い意味で破られ, しかし破られ方自体は害や不快感を与えず安全だと判断できる場合を指します。
    - 例: ありふれた場面で突然おかしな返答が返ってきたり、一見矛盾しているが実は筋が通っているオチが示されたり、というように「おや？」という驚きと「でも大丈夫だ」という安心が同時に起こるとき、私たちは笑いを感じるのです。
  </ReasonOfLaughter>

  <RawOutputFormat>
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
  </RawOutputFormat>

  <ScriptFormat>
    <状況 optional />

    ボケ: <セリフ>

    ツッ: <セリフ>

    ...
  </ScriptFormat>

  <Theme>
  ${theme}
  </Theme>
  `

  const ScriptSchema = z.object({
    theme: z.string(),
    rawOutputFormat: z.string(),
    script: z.string(),
  })

  try {
    const result = await llmApiService.callWithTextFormat<typeof ScriptSchema>({
      model: 'gpt-4o',
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
