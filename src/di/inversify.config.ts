import { Container } from 'inversify'
import { normTwistScriptModule } from 'src/features/script.norm-twist/di/normTwistScriptModule'
import { eventAggregatorModule } from 'src/shared/eventAggregator/di/eventAggregatorModule'
import { llmModule } from 'src/shared/llm/di/llmModule'
import { dynamicUiModule } from 'src/features/dynamic-ui/di/dynamicUiModule'

const diContainer = new Container()
diContainer.load(eventAggregatorModule, llmModule, normTwistScriptModule, dynamicUiModule)

export { diContainer }
