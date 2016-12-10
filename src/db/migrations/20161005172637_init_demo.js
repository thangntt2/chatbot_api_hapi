export async function up(knex) {
  await knex.schema.createTable('Entity', (table) => {
    table.uuid('id').notNullable().primary()
    table.string('name', 32).notNullable()
    table.enu('type', ['freetext', 'trait', 'keyword']).notNullable()
    table.string('color', 32).notNullable()
    table.bigInteger('createdAt')
    table.bigInteger('updatedAt')
  })
}

export async function down(knex) {
  await knex.schema.dropTableIfExists('Entity')
}
