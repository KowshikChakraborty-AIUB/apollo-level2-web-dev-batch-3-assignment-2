import { Request, Response } from "express"
import { ProductServices } from "./product.service"

const createProduct = async (req: Request, res: Response) => {

    const productData = req.body;
    console.log(productData);
    
    const result = await ProductServices.createProduct(productData);

    res.json({
        success: true,
        message: 'Product created successfully!',
        data: result,
    })
}

export const ProductControllers = {
    createProduct,
}