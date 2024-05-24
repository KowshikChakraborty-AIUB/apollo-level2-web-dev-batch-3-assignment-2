import { Request, Response } from "express"
import { ProductServices } from "./product.service"

//create product request-response handler
const createProduct = async (req: Request, res: Response) => {

    try {
        const productData = req.body;
        //console.log(productData);

        const result = await ProductServices.createProduct(productData);

        res.status(200).json({
            success: true,
            message: 'Product created successfully!',
            data: result,
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error!",
            error: err,
        })
    }
}


//get all products request-response handler
const getAllProduct = async (req: Request, res: Response) => {
    try {
        const result = await ProductServices.getAllProduct()

        res.status(200).json({
            success: true,
            message: "Products fetched successfully!",
            data: result,
        })
    } catch (err) {
        res.status(404).json({
            success: false,
            message: "Product not found",
            error: err,
        })
    }
}


//get a single product by id request-response handler
const getSpecificProduct = async (req: Request, res: Response) => {
    try {
        const { productId } = req.params;

        const result = await ProductServices.getSpecificProduct(productId)

        res.status(200).json({
            success: true,
            message: "Products fetched successfully!",
            data: result,
        })
    } catch (err) {
        res.status(404).json({
            success: false,
            message: "Product not found",
            error: err,
        })
    }
}


export const ProductControllers = {
    createProduct,
    getAllProduct,
    getSpecificProduct,
}