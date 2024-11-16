import { create } from "zustand";
import { User } from "../../domain/entities/user";
import { AuthStatus } from "../../infraestructure/interfaces/auth.status";
import { authLogin } from "../../actions/auth/auth";

export interface AuthState {
    status: AuthStatus;
    token?: string;
    user?: User
    
    login: (email:string, password:string) => Promise<boolean>;
}


export const useAuthStore = create<AuthState>()( (set, get) => ({
    status: 'checking',
    token: undefined,
    user: undefined,
    login: async (email, password) => { 
        
        const resp = await authLogin(email, password);
        if (!resp) {         
            set({ status: 'unauthenticated', user: undefined, token: undefined });
            return false;
        }

        // toDo Save token in local storage
        console.log({resp});

        set({ status: 'authenticated', user: resp.user, token: resp.token });

        return true;
    }
}))