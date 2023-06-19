export interface UserCreate {
    email: string;
    password: string;
}

export interface UserProfile extends UserCreate {
    id: number;
    uuid: string;
    active_store: boolean;
}

export interface UserProfileRes {
    id: number;
    uuid: string;
    email: string;
    active_store: boolean;
}

export type UserRes = UserProfileRes;