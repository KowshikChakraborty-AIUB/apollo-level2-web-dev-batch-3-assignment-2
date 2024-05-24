"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
const mongoose_1 = require("mongoose");
const variantsSchema = new mongoose_1.Schema({
    type: {
        type: String,
        required: true,
    },
    value: {
        type: String,
        required: true,
    }
});
const productSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, 'name is required'],
    },
    description: {
        type: String,
        required: [true, 'description is required'],
    },
    price: {
        type: Number,
        required: [true, 'price is required'],
    },
    category: {
        type: String,
        required: [true, 'category is required'],
    },
    tags: {
        type: [String],
        required: [true, 'tags is required'],
    },
    variants: {
        type: [variantsSchema],
    },
    inventory: {
        quantity: {
            type: Number,
            default: 1,
        },
        inStock: {
            type: Boolean,
            default: true,
        }
    }
});
exports.Product = (0, mongoose_1.model)('Product', productSchema);
