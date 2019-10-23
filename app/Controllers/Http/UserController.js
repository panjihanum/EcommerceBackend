'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} */
/** @typedef {import('@adonisjs/framework/src/Response')} */
/** @typedef {impoty('@adonisjs/framework/src/View')} */

/**
 * Resourceful controller for interacting with conctacts
 */

const { validate } = use("Validator");
const User = use('App/Models/User');

class UserController {
    async index ({ request, response, view}){
        let users = await User.all()
        return response.json({data: users})
    }
    
    async store({request, response}) {
        const rules = {
            username: "required|string",
            password: "required",
            email: "required",
            num_hp: "required"
        }
        
        const validation = await validate(request.all(), rules);
        if(validation.fails()) {
            return response
            .status(400)
            .json({status: 0, message: validation.messages() });
        }
        const users = new User();
        users.username = request.input("username");
        users.password = request.input("password");
        users.email = request.input("email");
        users.num_hp = request.input("num_hp");
        await users.save()
        return response.json(users)
    }

    async update({params, request, response}) {
        const rules = {
            username: "required|string",
            password: "required",
            email: "required",
            num_hp: "required"
        }
        
        const validation = await validate(request.all(), rules);
        if(validation.fails()) {
            return response
            .status(400)
            .json({status: 0, message: validation.messages() });
        }

        const reqPassword = request.input("passowrd");

        const user = await User.find(params.id);
        user.password = reqPassword !=="" ? reqPassword : user.password;
        user.save();

        return response.json({
            status: 1,
            data: user
        })
    }

}

module.exports = UserController
