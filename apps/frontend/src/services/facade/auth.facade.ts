import {authApi} from "@/services/api";
import {LoginUser, RegisterUser} from "@moodflow/types/auth";

export class AuthFacade {

    async register(registerUser: RegisterUser): Promise<void> {
        try {
            const {accessToken} = await authApi.register(registerUser);
            localStorage.setItem('accessToken', accessToken);
        } catch (error) {
            throw error;
        }
    }

    async login(loginUser: LoginUser): Promise<void> {
        try {
            console.log(loginUser);
            const {accessToken} = await authApi.login(loginUser);
            localStorage.setItem('accessToken', accessToken);
        } catch (error) {
            throw error;
        }
    }

    // logout(): void {
    //
    // }
}