import {authApi} from "@/services/api";
import {useUserStore} from "@/stores/userStore";
import {LoginUser, RegisterOrLoginUserResponse, RegisterUser} from "@moodflow/types";
import {DashboardFacade} from "@/services/facade/dashboard.facade";

export class AuthFacade {
    private userStore = useUserStore();
    private dashboardFacade: DashboardFacade = new DashboardFacade();

    private async handleAuthResponse(authResponse: RegisterOrLoginUserResponse): Promise<void> {
        const {user, dashboard} = authResponse;

        localStorage.setItem('accessToken', user.accessToken);
        this.userStore.setUserName(user.name);
        this.dashboardFacade.updateDashboardStore(dashboard);
    }

    async register(registerUser: RegisterUser): Promise<void> {
        try {
            const response = await authApi.register(registerUser);
            await this.handleAuthResponse(response);
        } catch (error) {
            throw error;
        }
    }

    async login(loginUser: LoginUser): Promise<void> {
        try {
            const response = await authApi.login(loginUser);
            await this.handleAuthResponse(response);
        } catch (error) {
            throw error;
        }
    }

    async refreshTokenAndStores(): Promise<void> {
        try {
            const response = await authApi.refreshTokenAndStores();
            await this.handleAuthResponse(response);
        } catch (error) {
            throw error;
        }
    }

}