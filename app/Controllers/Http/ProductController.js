'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} */
/** @typedef {import('@adonisjs/framework/src/Response')} */
/** @typedef {impoty('@adonisjs/framework/src/View')} */

/**
 * Resourceful controller for interacting with conctacts
 */

const Product = use('App/Models/Product');
const Picture = use("App/Models/Picture");
const Database = use("Database");

const { validate } = use("Validator");
const helpers = use("Helpers");
const fs = require("fs")
class ProductController {
    async index ({ request, response, view}){
        try{
            let pagination = request.only(["page", "limit"]);
            const page = parseInt(pagination.page, 10) || 1;
            const limit = parseInt(pagination.limit, 10) || 10;
            const products = await Product.query()
                .with("pictures")
                .paginate(page, limit);
            products.toJSON();

            return response.status(200).json({
                ...products,
                status: 1
            })
        }catch (e) {
            throw e;
        }
    }
    
    async create({request, response, view}) {

    }

    async store({request, response}) {


        const coverPic = request.file("cover", {
            type: ["image"],
            size: "2mb",
            extnames: ["png", "jpg"]
        })

        const converPic2 = request.file("cover2", {
            type: ["image"],
            size: "2mb",
            extnames: ["png", "jpg"]
        })

        const converPic3 = request.file("cover3", {
            type: ["image"],
            size: "2mb",
            extnames: ["png", "jpg"]
        })

        if (coverPic === null) {
            return response.status(400).json({
                status: 0,
                message: "Image is required"
            })
        }
        
        let loop = 1;
        const arrPic = [];
        
        await coverPic.moveAll(helpers.publicPath("uploads"), file => {
            let name = file.clientName;
            let ext = name.split(".")[1];
            let ts = new Date().valueOf();
            let fileName = "product" + ts + loop + "." + ext;
            loop++;
            arrPic.push(fileName);
            return{
                name: fileName
            }
        })

        let dataProduct =[];

        const movedImage = coverPic.movedList();
        await Promise.all(
            movedImage.map(async file => {
                const product = new Product();
                product.name = request.input("name"),
                product.price = request.input("price"),
                product.picture1 = file.fileName;
                product.stock = request.input("stock"),
                product.condition = request.input("condition"),
                product.category = request.input("category"),
                product.description = request.input("description"),
                product.id_store = request.input("id_store")
                await product.save();
                dataProduct.push(product)
            })
            
        )
        const returnData = {
            product: dataProduct,
          };
      
          return response.status(200).json({ status: 1, data: returnData });
    }

    async show({params, request, response, view}){

    }
    
    async update({params, request, response}) {

    }

    async destroy({params, request, response}) {

    }
}

module.exports = ProductController
