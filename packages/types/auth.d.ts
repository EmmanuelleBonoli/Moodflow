export type RegisterUser = {
    email: string;
    password: string;
    name: string;
}

export type RegisterOrLoginUserResponse = {
    accessToken: string;
}

export type LoginUser = {
    email: string;
    password: string;
}