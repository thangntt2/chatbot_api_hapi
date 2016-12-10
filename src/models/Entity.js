import uuid from 'uuid'

import Model from '../components/orm'
import { entity as EntitySchema } from '../schemas/models/entity.yaml'

export default class Resource extends Model {

  static schema = EntitySchema

  constructor(...args) {
    super(...args)

    this.on('creating', () => {
      this.set('id', uuid.v4())
    })
  }

  get tableName() {
    return 'Entity'
  }

}
