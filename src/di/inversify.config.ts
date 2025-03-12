import { Container } from 'inversify'
import { eventAggregatorModule } from 'src/shared/eventAggregator/di/eventAggregatorModule'
import { llmModule } from 'src/shared/llm/di/llmModule'

const diContainer = new Container()
diContainer.load(eventAggregatorModule, llmModule)

export { diContainer }
