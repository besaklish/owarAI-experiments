import { Container } from 'inversify'
import { normTwistScriptModule } from 'src/features/script.norm-twist/di/normTwistScriptModule'
import { eventAggregatorModule } from 'src/shared/eventAggregator/di/eventAggregatorModule'
import { llmModule } from 'src/shared/llm/di/llmModule'

const diContainer = new Container()
diContainer.load(eventAggregatorModule, llmModule, normTwistScriptModule)

export { diContainer }
