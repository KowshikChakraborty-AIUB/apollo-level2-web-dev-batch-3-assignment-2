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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderControllers = void 0;
const order_validation_1 = __importDefault(require("./order.validation"));
const order_service_1 = require("./order.service");
const product_service_1 = require("../Product/product.service");
const product_validation_1 = __importDefault(require("../Product/product.validation"));
//create order request-response handler
const createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId, email, price, quantity } = req.body;
        const product = yield product_service_1.ProductServices.getSpecificProduct(productId);
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
            const zodParsedUpdatedProductData = product_validation_1.default.parse(product);
            yield product_service_1.ProductServices.getUpdatedProduct(productId, zodParsedUpdatedProductData);
            return res.status(409).json({
                "success": false,
                "message": "Insufficient quantity available in inventory"
            });
        }
        //When creating new order,reduce the quantity of the ordered product in inventory and update the inStock property.
        product.inventory.inStock = true;
        product.inventory.quantity = product.inventory.quantity - quantity;
        const zodParsedUpdatedProductData = product_validation_1.default.parse(product);
        //console.log(zodParsedUpdatedProductData);
        yield product_service_1.ProductServices.getUpdatedProduct(productId, zodParsedUpdatedProductData);
        //console.log(result2);
        const orderData = { email, productId, price, quantity };
        //console.log(orderData);
        const zodParsedOrderData = order_validation_1.default.parse(orderData);
        const result = yield order_service_1.OrderServices.createOrder(zodParsedOrderData);
        res.status(200).json({
            success: true,
            message: 'Order created successfully!',
            data: result,
        });
    }
    catch (err) {
        if (err.name === 'ZodError') {
            res.status(403).json({
                success: false,
                message: "Validation Error!",
                error: err.issues,
            });
        }
        else {
            res.status(500).json({
                success: false,
                message: "Internal Server Error!",
                error: err,
            });
        }
    }
});
//get all orders request-response handler
const getAllOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield order_service_1.OrderServices.getAllOrder();
        res.status(200).json({
            success: true,
            message: "Orders fetched successfully!",
            data: result,
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: "Order not found",
            error: err,
        });
    }
});
//get an order request-response handler
const getAnOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const email = req.query.email;
    if (email) {
        try {
            const result = yield order_service_1.OrderServices.getAnOrder(email);
            res.status(200).json({
                success: true,
                message: "Orders fetched successfully for user email!",
                data: result,
            });
        }
        catch (err) {
            res.status(500).json({
                success: false,
                message: "Order not found",
                error: err,
            });
        }
    }
    else {
        try {
            const result = yield order_service_1.OrderServices.getAllOrder();
            res.status(200).json({
                success: true,
                message: "Orders fetched successfully!",
                data: result,
            });
        }
        catch (err) {
            res.status(500).json({
                success: false,
                message: "Order not found",
                error: err,
            });
        }
    }
});
exports.OrderControllers = {
    createOrder,
    getAllOrder,
    getAnOrder,
};
