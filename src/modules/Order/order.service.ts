import { TOrder } from "./order.interface";
import { Order } from "./order.model";

//create new Order
const createOrder = async (payload: TOrder) => {
    const result = await Order.create(payload);
    return result;
}

export const OrderServices = {
    createOrder,
}