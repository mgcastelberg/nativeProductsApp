import axios from "axios";
import { STAGE, API_URL as PROD_URL, API_URL_IOS, API_URL_ANDROID } from '@env';
import { Platform } from "react-native";

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

// Se expota asi para asegurarse de que se llame despues de ver config todos los interceptores
export {
    shopApi
}