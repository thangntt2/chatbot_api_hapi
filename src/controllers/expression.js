import Boom from 'boom'
import { map } from 'bluebird'
import Expression from '../models/Expression'
import InlineEntity from '../models/InlineEntity'

export async function create(req) {
  const richExpression = req.payload
  const expression = await Expression.forge({ sentence: richExpression.sentence }).save()
  if (!expression) {
    throw Boom.notAcceptable('Cannot create data')
  }

  const inlineEntities = await map(richExpression.inlineEntities, async (inlineEntity) => {
    const entity = await InlineEntity.forge({
      ...inlineEntity,
      expressionId: expression.id,
    }).save()
    return entity.toJSON()
  })

  const resultExpression = {
    ...expression.attributes,
    inlineEntities,
  }
  return (JSON.stringify(resultExpression))
}
