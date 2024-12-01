export interface TesloProduct {
    id:          string;
    title:       string;
    price:       number;
    description: string;
    slug:        string;
    stock:       number;
    sizes:       string[];
    gender:      string;
    tags:        string[];
    images:      string[];
    user:        TesloUser;
}

export interface TesloUser {
    id:       string;
    email:    string;
    fullName: string;
    isActive: boolean;
    roles:    string[];
}
