'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Product extends Model {
    pictures() {
        return this.hasMany("App/Models/Picture")
    }
    category() {
        return this.hasOne("App/Models/Category")
    }
    wishlist() {
        return this.hasMany("App/Models/Wishlist")
    }
}

module.exports = Product
