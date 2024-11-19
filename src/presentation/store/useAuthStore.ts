import { create } from "zustand";
import { User } from "../../domain/entities/user";
import { AuthStatus } from "../../infraestructure/interfaces/auth.status";
import { authCheckStatus, authLogin } from "../../actions/auth/auth";
import { StorageAdapter } from "../../config/adapters/storage-adapter";

export interface AuthState {
    status: AuthStatus;
    token?: string;
    user?: User
    
    login: (email:string, password:string) => Promise<boolean>;
    checkStatus: () => Promise<boolean>;
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
        await StorageAdapter.setItem('token',resp.token);
        // const storedToken = await StorageAdapter.getItem('token');
        // console.log({'El token:': storedToken});
        // console.log({resp});

        set({ status: 'authenticated', user: resp.user, token: resp.token });

        return true;
    },
    checkStatus: async () => {
        const resp = await authCheckStatus();
        if (!resp) {
            set({ status: 'unauthenticated', user: undefined, token: undefined });
            return false;
        }
        await StorageAdapter.setItem('token',resp.token);
        set({ status: 'authenticated', user: resp.user, token: resp.token });

        return true;
    }
}))