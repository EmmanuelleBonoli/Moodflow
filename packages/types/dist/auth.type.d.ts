import { DashboardData } from './dashboard.type';
export type RegisterUser = {
    email: string;
    password: string;
    name: string;
};
export type RegisterOrLoginUserResponse = {
    user: {
        accessToken: string;
        name: string;
    };
    dashboard: DashboardData;
};
export type LoginUser = {
    email: string;
    password: string;
};
export interface OAuthUser {
    id?: string;
    email: string;
    name: string;
    provider: string;
    providerId: string;
}
