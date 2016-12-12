import Boom from 'boom'
import Expression from '../models/Expression'
import InlineEntity from '../models/InlineEntity'

export async function create(req) {
  const richExpression = req.payload
  const expression = await Expression.forge({ sentence: richExpression.sentence }).save()
  if (!expression) {
    throw Boom.notAcceptable('Cannot create data')
  }

  const inlineEntities = []

  richExpression.inlineEntities.forEach(async (inlineEntity) => {
    const entity = await InlineEntity.forge({
      ...inlineEntity,
      expressionId: expression.id,
    }).save()
    inlineEntities.push(entity)
  })

  const resultExpression = {
    ...expression,
    inlineEntities,
  }
  return (JSON.stringify(resultExpression))
}
