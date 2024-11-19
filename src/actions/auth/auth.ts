import { shopApi } from "../../config/api/shopApi";
import { User } from "../../domain/entities/user";
import type { AuthResponse } from "../../infraestructure/interfaces/auth.responses";

const returnUserToken = (data:AuthResponse) => {

    const user: User = {
        id:       data.id,
        email:    data.email,
        fullName: data.fullName,
        isActive: data.isActive,
        roles:    data.roles
    }

    return {
        user: user,
        token: data.token
    }
}

export const authLogin = async(email:string, password:string) => {

    email = email.trim().toLowerCase();
    password = password.trim();

    try {
        const { data} = await shopApi.post<AuthResponse>('auth/login', {
            email,
            password
        });

        return returnUserToken(data);

    } catch (error) {
        console.log(error);
        return null;
    }
}

export const authCheckStatus = async() => {
    try {
        const { data } = await shopApi.get<AuthResponse>('auth/check-status');
        return returnUserToken(data);
    } catch (error) {
        console.log(error);
        return null;
    }

}