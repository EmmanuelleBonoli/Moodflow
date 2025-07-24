import {apiClient} from './index';
import {RegisterUser, RegisterOrLoginUserResponse, LoginUser} from "@moodflow/types/auth";

export const authApi = {
    login: (loginUser: LoginUser): Promise<RegisterOrLoginUserResponse> =>
        apiClient.post('/auth/login', loginUser),

    register: (registerUser: RegisterUser): Promise<RegisterOrLoginUserResponse> =>
        apiClient.post('/auth/register', registerUser),

};
