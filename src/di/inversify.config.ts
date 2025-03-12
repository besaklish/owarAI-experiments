import { Container } from 'inversify'
import { eventAggregatorModule } from 'src/shared/eventAggregator/di/eventAggregatorModule'

const diContainer = new Container()
diContainer.load(eventAggregatorModule)

export { diContainer }
