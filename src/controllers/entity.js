import Boom from 'boom'
import Entity from '../models/Entity'

const randomColor = require('random-color')

export async function getAll() {
  const entities = await Entity.fetchAll()
  if (!entities) {
    throw Boom.notFound('Data not found')
  }
  return entities.toJSON()
}

export async function create(req) {
  const entity = {
    ...req.payload,
    userId: req.auth.credentials.sub,
    color: randomColor().hexString(),
    description: 'user-define entity',
  }
  const content = await Entity.forge(entity).save()
  return content.toJSON()
}
