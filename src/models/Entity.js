import uuid from 'uuid'

import Model from '../components/orm'
import { model as entitySchema } from '../schemas/models/entity.yaml'

export default class Entity extends Model {

  static schema = entitySchema;

  constructor(...args) {
    super(...args)

    this.on('creating', () => {
      this.set('id', uuid.v4())
    })
  }

  get tableName() {
    return 'Entity'
  }

  inlineEntities() {
    return this.hasMany('InlineEntity', 'entityId')
  }
}
