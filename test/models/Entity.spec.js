import { omit, set } from 'lodash/fp'

import assert from '../common/assert'
import { setup, teardown } from '../common'
import Entity from '../../src/models/Entity'

describe('Test Entity model', () => {
  before(() => setup())

  after(() => teardown())

  describe('Create Entity', () => {
    const validModel = {
      name: 'name',
      type: 'keyword',
    }

    it('Should reject if missing \'name\'', () =>
      assert.isRejected(Entity.forge(omit('name')(validModel)).save())
    )

    it('Should reject if missing \'type\'', () =>
      assert.isRejected(Entity.forge(omit('type')(validModel)).save())
    )

    it('Should reject if wrong enum type of \'type\'', () =>
      assert.isRejected(Entity.forge(set('type', 'type')(validModel)).save())
    )
  })
})
