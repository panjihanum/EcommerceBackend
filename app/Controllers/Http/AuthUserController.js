'use strict'

const User = use("App/Models/User")
const { validate } = use("Validator")

class AuthUserController {
    async login({ request, auth, response}) {

        const username = request.input("username")
        const password = request.input("password")


            if(await auth.attempt(username, password)){
                let user = await User.findBy("username", username)
                let accessToken = await auth.withRefreshToken().generate(user);

                return response.json({ user: user, access_token: accessToken})
            }
        
    }

    async register({ request, auth, response}) {
    
        const username = request.input("username");
        const email = request.input("email");
        const password = request.input("password");
        const confirm_password = request.input("confirm_password")
        const num_hp = request.input("num_hp")

        if( password !== confirm_password){
            return response
                    .status(400)
                    .json({ status: 0, message: validation.message()})
        }

        let user = new User();
        user.username = username;
        user.email = email;
        user.password = password;
        user.num_hp = num_hp;
        await user.save();
        
        let accessToken = await auth.withRefreshToken().generate(user);
        return response.json({
            user: user,
            access_token: accessToken
        })
    }

    
    async generateRefreshToken({ request, auth, response}) {
        const rules = {
            refresh_token: "required|string"
        }
        const validation = await validate(request.all(), rules);

        if (validation.fails()) {
            return response
                .status(400)
                .json({ status: 0, message: validation.message() });
        }

        const refreshToken = request.input("refresh_token");
        const access_token = await auth
            .newRefreshToken()
            .generateRefreshToken(refreshToken);
        return response.send({ status: 1, access_token})
    }
}

module.exports = AuthUserController
