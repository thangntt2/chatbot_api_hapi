import uuid from 'uuid'

import Model from '../components/orm'
import { get as expressionSchema } from '../schemas/models/expression.yaml'

export default class Expression extends Model {

  static schema = expressionSchema;

  constructor(...args) {
    super(...args)

    this.on('creating', () => {
      this.set('id', uuid.v4())
    })
  }

  get tableName() {
    return 'Expression'
  }

  inlineEntities() {
    return this.hasMany('InlineEntity', 'expressionId')
  }
}
