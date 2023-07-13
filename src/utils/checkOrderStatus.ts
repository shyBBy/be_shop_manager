import {OrderProfileInterface} from "../../types/order/order";


export interface CheckOrderStatusResponse {
    completed: OrderProfileInterface[];
    inTransitOrProcessing: OrderProfileInterface[];
    another: OrderProfileInterface[];
}

export type CheckOrdersStatusResponseType = CheckOrderStatusResponse

export const checkOrderStatus = (orders: OrderProfileInterface[]) => {
    let ordersInTransitOrProcessing: OrderProfileInterface[] = []
    let ordersCompleted: OrderProfileInterface[] = []
    let anotherOrders: OrderProfileInterface[] = []

    orders.forEach((order) => {
        if (order.status === 'completed') {
            ordersCompleted.push(order)
        } else if (order.status === 'in-transit' || order.status === 'processing') {
            ordersInTransitOrProcessing.push(order)
        } else {
            anotherOrders.push(order)
        }
    })

    return {
        completed: ordersCompleted,
        inTransitOrProcessing: ordersInTransitOrProcessing,
        another: anotherOrders,
    };
}

