import {DashboardData} from '../dashboard/dashboard.type';

export type PayloadUser = {
    email: string;
    sub: string;
}

export type RegisterUser = {
    email: string;
    password: string;
    name: string;
}

export type RegisterOrLoginUserResponse = {
    user: { accessToken: string, name: string },
    dashboard: DashboardData;
}

export type LoginUser = {
    email: string;
    password: string;
}

export interface OAuthUser {
    id?: string;
    email: string;
    name: string;
    provider: string;
    providerId: string;
}