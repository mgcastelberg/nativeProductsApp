
export interface Product {
    id:          string;
    title:       string;
    price:       number;
    description: string;
    slug:        string;
    stock:       number;
    sizes:       Size[];
    gender:      Gender;
    tags:        string[];
    images:      string[];
}

export enum Size {
    L = 'L',
    M = 'M',
    S = 'S',
    XS = 'XS',
    XL = 'XL',
    XXL = 'XXL'
}

export enum Gender {
    Men = 'men',
    Women = 'women',
    Kid = 'kid',
    Unisex = 'unisex'
}