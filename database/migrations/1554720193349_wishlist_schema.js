'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class WishlistSchema extends Schema {
  up () {
    this.create('wishlists', (table) => {
      table.increments()
      table.integer('product').unsigned().references('id').inTable('products').onDelete("CASCADE").onUpdate("CASCADE")
      table.integer('totalprice').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('wishlists')
  }
}

module.exports = WishlistSchema
