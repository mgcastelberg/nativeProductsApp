import { shopApi } from "../../config/api/shopApi";
import { Gender, Product } from "../../domain/entities/product";
import { TesloProduct } from "../../infraestructure/interfaces/teslo-products.response";
import { ProductMapper } from "../../infraestructure/mappers/product.mapper";

const emptyProduct: Product = {
    id: '',
    title: '',
    price: 0,
    description: '',
    slug: '',
    stock: 0,
    sizes: [],
    gender: Gender.Men,
    tags: [],
    images: []
}

export const getProductById = async(id: string): Promise<Product> => {
    
    if( id === 'new') return emptyProduct;

    try {
        const { data } = await shopApi.get<TesloProduct>(`/products/${id}`);
        return ProductMapper.tesloProductToEntity(data);
    } catch (error) {
        console.log(error);
        throw new Error(`Error getting product by id ${id}`);
        
    }
}