
'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProductsSchema extends Schema {
  up () {
    this.create('products', (table) => {
      table.increments()
      table.string('name', 35).notNullable()
      table.string('price').notNullable()
      table.string("picture1").nullable()
      table.string("picture2").nullable()
      table.string("picture3").nullable()
      table.integer('stock').notNullable()
      table.string('condition').notNullable()
      table.integer('category').unsigned().references('id').inTable('categories').onDelete("CASCADE").onUpdate("CASCADE")
      table.text('description').notNullable()
      table.integer('id_store').unsigned().references('id').inTable('sellers').onDelete("CASCADE").onUpdate("CASCADE")
      table.timestamps()
    })
  }

  down () {
    this.drop('products')
  }
}

module.exports = ProductsSchema
