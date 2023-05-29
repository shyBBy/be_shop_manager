export interface UserCreate {
    email: string;
    password: string;
}

export interface UserProfile extends UserCreate {
    id: string;
}


export interface UserProfileRes {
    id: string;
    email: string;
}

export type UserRes = UserProfileRes