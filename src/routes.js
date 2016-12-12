import * as entity from './controllers/entity'
import * as expression from './controllers/expression'

export default {
  getAllEntity: entity.getAll,
  createEntity: entity.create,
  createRichExpression: expression.create,
}
