
// Quitamos el token por que no queremos que sea parte del usuario
export interface User {
    id:       string;
    email:    string;
    fullName: string;
    isActive: boolean;
    roles:    string[];
}