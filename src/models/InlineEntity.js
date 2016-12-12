import uuid from 'uuid'

import Model from '../components/orm'
import { get as inlineEntitySchema } from '../schemas/models/entity.yaml'

export default class InlineEntity extends Model {

  static schema = inlineEntitySchema;

  constructor(...args) {
    super(...args)

    this.on('creating', () => {
      this.set('id', uuid.v4())
    })
  }

  get tableName() {
    return 'InlineEntity'
  }

  entity() {
    return this.belongsTo('Entity', 'entityId')
  }

  expression() {
    return this.belongsTo('Expression', 'expressionId')
  }
}
