'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} */
/** @typedef {import('@adonisjs/framework/src/Response')} */
/** @typedef {impoty('@adonisjs/framework/src/View')} */

/**
 * Resourceful controller for interacting with conctacts
 */
const Wishlist = use("App/Models/Wishlist")

class CategoryController {
    async index ({ request, response, view}){
        const wishlist = await Wishlist.query()
            .with('user')
            .with('product')
            .where('user_id', 'getUser.id')
            .fetch()

            return response.json({ status: 1, data: wishlist})
    }
    

    async store({request, response}) {

    }

    async show({params, request, response, view}){

    }
    
    async update({params, request, response}) {

    }

    async destroy({params, request, response}) {

    }
}

module.exports = CategoryController
