import { Request, Response } from "express";
import orderValidationSchema from "./order.validation";
import { OrderServices } from "./order.service";
import { ProductServices } from "../Product/product.service";
import productValidationSchema from "../Product/product.validation";

//create order request-response handler
const createOrder = async (req: Request, res: Response) => {

    try {

        const { productId, email, price, quantity } = req.body;

        const product = await ProductServices.getSpecificProduct(productId);
        console.log(product);


        if (product === null || product === undefined) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });

        }

        //If the inventory quantity reaches zero, set inStock to false. Otherwise, keep inStock as true.
        if (product.inventory.quantity <= 0) {
            product.inventory.inStock = false;
            // console.log(product, product.inventory);

            const zodParsedUpdatedProductData = productValidationSchema.parse(product);


            const result2 = await ProductServices.getUpdatedProduct(productId, zodParsedUpdatedProductData);
            

            return res.status(409).json({
                "success": false,
                "message": "Insufficient quantity available in inventory"
            })

        }
        //When creating new order,reduce the quantity of the ordered product in inventory and update the inStock property.
        product.inventory.inStock = true;
        product.inventory.quantity = product.inventory.quantity - quantity;



        const zodParsedUpdatedProductData = productValidationSchema.parse(product);
        //console.log(zodParsedUpdatedProductData);


        const result2 = await ProductServices.getUpdatedProduct(productId, zodParsedUpdatedProductData);

        //console.log(result2);



        const orderData = { email, productId, price, quantity };
        //console.log(orderData);


        const zodParsedOrderData = orderValidationSchema.parse(orderData);

        const result = await OrderServices.createOrder(zodParsedOrderData);


        res.status(200).json({
            success: true,
            message: 'Order created successfully!',
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

export const OrderControllers = {
    createOrder,
}