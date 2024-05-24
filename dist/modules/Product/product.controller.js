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
exports.ProductControllers = void 0;
const product_service_1 = require("./product.service");
//create product request-response handler
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productData = req.body;
        //console.log(productData);
        const result = yield product_service_1.ProductServices.createProduct(productData);
        res.status(200).json({
            success: true,
            message: 'Product created successfully!',
            data: result,
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error!",
            error: err,
        });
    }
});
//get all products request-response handler
const getAllProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield product_service_1.ProductServices.getAllProduct();
        res.status(200).json({
            success: true,
            message: "Products fetched successfully!",
            data: result,
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: "Product not found",
            error: err,
        });
    }
});
//get a single product by id request-response handler
const getSpecificProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId } = req.params;
        const result = yield product_service_1.ProductServices.getSpecificProduct(productId);
        res.status(200).json({
            success: true,
            message: "Products fetched successfully!",
            data: result,
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: "Product not found",
            error: err,
        });
    }
});
//update a single product by id request-response handler
const getUpdatedProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        const result = yield product_service_1.ProductServices.getUpdatedProduct(filter, update);
        const updatedData = yield product_service_1.ProductServices.getAllProduct();
        res.status(200).json({
            success: true,
            message: "Product updated successfully!",
            data: updatedData,
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: "Product not found",
            error: err,
        });
    }
});
//delete a product by id request-response handler
const deletedProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId } = req.params;
        const result = yield product_service_1.ProductServices.deletedProduct(productId);
        res.status(200).json({
            success: true,
            message: "Product deleted successfully!",
            data: null,
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: "Product not found",
            error: err,
        });
    }
});
exports.ProductControllers = {
    createProduct,
    getAllProduct,
    getSpecificProduct,
    getUpdatedProduct,
    deletedProduct,
};
