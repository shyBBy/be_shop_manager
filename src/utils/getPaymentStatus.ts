import {createResponse} from "./createResponse";

export const getPaymentStatus = async (order:any): Promise<string | null> => {
    try {
        const payuOrderStatus = order.meta_data.find(
            (item) => item.key === "_payu_order_status"
        );
        if (payuOrderStatus) {
            console.log(payuOrderStatus.value);
        } else {
            return
        }

    } catch (e){
        return null
    }

}