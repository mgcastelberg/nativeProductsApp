import axios from "axios";
import { STAGE, API_URL as PROD_URL, API_URL_IOS, API_URL_ANDROID } from '@env';
import { Platform } from "react-native";
import { StorageAdapter } from "../adapters/storage-adapter";

export const API_URL = (STAGE === 'prod') 
    ? PROD_URL 
    : Platform.OS === 'ios' 
    ? API_URL_IOS : API_URL_ANDROID;

const shopApi = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    }
})

// Interceptors
shopApi.interceptors.request.use(

    async (config) => {

        const token = await StorageAdapter.getItem('token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        
        return config
    }
)

// Se expota asi para asegurarse de que se llame despues de ver config todos los interceptores
export {
    shopApi
}