interface ShippingTrackingHistoryItem {
    state: string;
    status: string;
    datetime: string;
    branch: string;
}

interface ShippingTrackingHistory {
    tracking: ShippingTrackingHistoryItem[];
}


export const checkIsShippingCreatedAndStatus = (shippingTrackingHistory: ShippingTrackingHistory) => {
    try {
        const hasShippingCreated = shippingTrackingHistory.tracking.some(
            (status) => status.status === "Zamówienie przesyłki na Furgonetka.pl"
        );

        console.log(`W UTILS`, hasShippingCreated)
        return hasShippingCreated;
    } catch (e) {
        // Handle any potential errors
        console.error("Error checking shipping status:", e);
        return false;
    }
}