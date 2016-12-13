export async function up(knex) {
  await knex.schema.dropTableIfExists('InlineEntity')
  await knex.schema.dropTableIfExists('Entity')
  await knex.schema.dropTableIfExists('Expression')

  await knex.schema.createTable('Entity', (table) => {
    table.uuid('id').notNullable().primary()
    table.string('name', 32).notNullable().unique()
    table.enu('type', ['freetext', 'trait', 'keyword']).notNullable()
    table.string('color', 32).notNullable()
    table.bigInteger('createdAt')
    table.bigInteger('updatedAt')
  })

  await knex.schema.createTable('Expression', (table) => {
    table.uuid('id').notNullable().primary()
    table.string('sentence', 1024).notNullable()
    table.bigInteger('createdAt')
    table.bigInteger('updatedAt')
  })

  await knex.schema.createTable('InlineEntity', (table) => {
    table.uuid('id').notNullable().primary()
    table.integer('start')
    table.integer('end')
    table.uuid('entityId').notNullable().references('Entity.id')
    table.uuid('expressionId').notNullable().references('Expression.id')
    table.bigInteger('createdAt')
    table.bigInteger('updatedAt')
  })
}

export async function down(knex) {
  await knex.schema.dropTableIfExists('Entity')
  await knex.schema.dropTableIfExists('Expression')
  await knex.schema.dropTableIfExists('InlineEntity')
}
