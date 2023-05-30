export interface StoreCreate {
    name: string;
    url: string;
    consumer_key: string;
    consumer_secret: string;
}

export interface StoreProfile extends StoreCreate {
    id: string;
}


export interface StoreProfileRes {
    id: string;
    name: string;
    url: string;
}

export type StoreRes = StoreProfileRes