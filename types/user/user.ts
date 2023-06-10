export interface UserCreate {
    email: string;
    password: string;
}

export interface UserProfile extends UserCreate {
    id: number;
    uuid: string;
}

export interface UserProfileRes {
    id: number;
    uuid: string;
    email: string;
}

export type UserRes = UserProfileRes;