import Boom from 'boom'
import Entity from '../models/Entity'

const randomColor = require('random-color')

export async function getAll() {
  const entities = await Entity.fetchAll()
  if (!entities) {
    throw Boom.notFound('Data not found')
  }
  console.log(entities.toJSON())
  return entities.toJSON()
}

export async function create(req) {
  const entity = {
    ...req.payload,
    color: randomColor().hexString(),
  }
  const content = await Entity.forge(entity).save()
  return content.toJSON()
}
