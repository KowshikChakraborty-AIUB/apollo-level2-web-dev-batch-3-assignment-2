"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productValidationSchema = void 0;
const zod_1 = require("zod");
// Define the variants schema
const variantValidationSchema = zod_1.z.object({
    type: zod_1.z.string().min(1),
    value: zod_1.z.string().min(1),
});
// Define the product schema
exports.productValidationSchema = zod_1.z.object({
    name: zod_1.z.string().min(1),
    description: zod_1.z.string().min(1),
    price: zod_1.z.number().positive(),
    category: zod_1.z.string().min(1),
    tags: zod_1.z.array(zod_1.z.string().min(1)),
    variants: zod_1.z.array(variantValidationSchema),
    inventory: zod_1.z.object({
        quantity: zod_1.z.number().int().min(0),
        inStock: zod_1.z.boolean(),
    }),
});
exports.default = exports.productValidationSchema;
