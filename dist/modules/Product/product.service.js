"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductServices = void 0;
const product_model_1 = require("./product.model");
//create new product
const createProduct = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.Product.create(payload);
    return result;
});
//get all products
const getAllProduct = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.Product.find();
    return result;
});
//get a single product by id
const getSpecificProduct = (_id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.Product.findOne({ _id: _id });
    return result;
});
//update a single product by id
const getUpdatedProduct = (filter, update) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.Product.updateOne({ _id: filter }, update);
    return result;
});
//delete a product by id
const deletedProduct = (_id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.Product.deleteOne({ _id: _id });
    return result;
});
//search a product based on name, category, description
const searchAProduct = (searchTerm) => __awaiter(void 0, void 0, void 0, function* () {
    const regex = new RegExp(searchTerm, 'i');
    const result = yield product_model_1.Product.find({
        $or: [
            { name: { $regex: regex } },
            { category: { $regex: regex } },
            { description: { $regex: regex } },
        ],
    });
    return result;
});
exports.ProductServices = {
    createProduct,
    getAllProduct,
    getSpecificProduct,
    getUpdatedProduct,
    deletedProduct,
    searchAProduct,
};
