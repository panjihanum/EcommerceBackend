'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class BuyerSchema extends Schema {
  up () {
    this.create('buyers', (table) => {
      table.increments()
      table.string('name', 35).notNullable()
      table.string('picture').nullable()
      table.date('date_of_birth')
      table.string('gender', 15).notNullable()
      table.text('address').notNullable()
      table.integer('id_users').unsigned().references('id').inTable('users').onDelete("CASCADE").onUpdate("CASCADE")
      table.timestamps()
    })
  }

  down () {
    this.drop('buyers')
  }
}

module.exports = BuyerSchema
