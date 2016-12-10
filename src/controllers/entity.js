import Boom from 'boom'

import Entity from '../models/Entity'

export async function getAll() {
  const entities = await Entity.fetchAll()
  return entities.toJSON()
}
