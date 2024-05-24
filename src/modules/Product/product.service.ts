import { TProduct } from "./product.interface";
import { Product } from "./product.model";

//create new product
const createProduct = async (payload: TProduct) => {
    const result = await Product.create(payload);
    return result;
}

//get all products
const getAllProduct = async () => {
    const result = await Product.find();
    return result;
}

//get a single product by id
const getSpecificProduct = async (_id: string) => {
    const result = await Product.findOne({_id: _id});
    return result;
}

export const ProductServices = {
    createProduct,
    getAllProduct,
    getSpecificProduct,
}