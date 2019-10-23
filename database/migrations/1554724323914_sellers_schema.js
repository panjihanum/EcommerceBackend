'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class SellersSchema extends Schema {
  up () {
    this.create('sellers', (table) => {
      
      table.increments()
      table.string('name_store').notNullable().unique()
      table.integer('id_users').unsigned().references('id').inTable('users').onDelete("CASCADE").onUpdate("CASCADE")
      table.string("picture").nullable()
      table.text('address').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('sellers')
  }
}

module.exports = SellersSchema
