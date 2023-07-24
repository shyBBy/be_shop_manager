import {StoreEntity} from "../../src/store/entities/store.entity";

export interface UserCreate {
    email: string;
    password: string;
}

export interface UserProfile extends UserCreate {
    id: string;
    store: string | StoreEntity
}

export interface UserProfileRes {
    id: string;
    email: string;
    store: {
        id: string,
        name: string,
        url: string,
    }
}

export type UserRes = UserProfileRes;