export interface StatusCreate {
    name: string;
    slug: string;
}

export enum ORDER_STATUS {
    ZAMOWIENIE_WYSLANE = 'in-transit',
}