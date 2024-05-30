import { Request, Response } from "express"
import { ProductServices } from "./product.service"
import productValidationSchema from "./product.validation";

//create product request-response handler
const createProduct = async (req: Request, res: Response) => {

    try {
        const productData = req.body;
        //console.log(productData);

        const zodParsedProductData = productValidationSchema.parse(productData);

        const result = await ProductServices.createProduct(zodParsedProductData);

        res.status(200).json({
            success: true,
            message: 'Product created successfully!',
            data: result,
        })
    } catch (err: any) {
        if (err.name === 'ZodError') {
            res.status(403).json({
                success: false,
                message: "Validation Error!",
                error: err.issues,
            })
        } else {
            res.status(500).json({
                success: false,
                message: "Internal Server Error!",
                error: err,
            })
        }
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
        res.status(500).json({
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
        res.status(500).json({
            success: false,
            message: "Product not found",
            error: err,
        })
    }
}

//update a single product by id request-response handler
const getUpdatedProduct = async (req: Request, res: Response) => {
    try {
        const { productId } = req.params;
        const filter = productId;


        // const update = {
        //     inventory: {
        //         quantity: 500,
        //         inStock: true
        //     }
        // }

        const update = req.body;
        //console.log(update);

        const zodParsedUpdatedProductData = productValidationSchema.parse(update);

        const result = await ProductServices.getUpdatedProduct(filter, zodParsedUpdatedProductData)

        const updatedData = await ProductServices.getAllProduct()

        res.status(200).json({
            success: true,
            message: "Product updated successfully!",
            data: updatedData,
        })
    } catch (err: any) {
        if (err.name === 'ZodError') {
            res.status(403).json({
                success: false,
                message: "Validation Error!",
                error: err.issues,
            })
        } else {
            res.status(500).json({
                success: false,
                message: "Product not found",
                error: err,
            })
        }
    }
}


//delete a product by id request-response handler
const deletedProduct = async (req: Request, res: Response) => {
    try {
        const { productId } = req.params;

        const result = await ProductServices.deletedProduct(productId)

        res.status(200).json({
            success: true,
            message: "Product deleted successfully!",
            data: null,
        })
    } catch (err) {
        res.status(500).json({
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
    getUpdatedProduct,
    deletedProduct,
}