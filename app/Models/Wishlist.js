'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Wishlist extends Model {
    user() {
        return this.belongsTo("App/Models/User")
    }
    product() {
        return this.belongsTo("App/Models/Product")
    }
}

module.exports = Wishlist
