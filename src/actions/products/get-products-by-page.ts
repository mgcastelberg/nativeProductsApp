import { shopApi } from "../../config/api/shopApi";
import { TesloProduct } from "../../infraestructure/interfaces/teslo-products.response";
import { ProductMapper } from '../../infraestructure/mappers/product.mapper';

export const getProductsByPage = async(page: number, limit: number = 20) => {
    console.log({page, limit});
    try {
        const { data } = await shopApi.get<TesloProduct[]>(`/products?offset=${ page * 10 }&limit=${limit}`);
        // version completa
        // const products = data.map(tesloProduct => ProductMapper.tesloProductToEntity(tesloProduct));
        // Version reducida con un solo parametro
        const products = data.map(ProductMapper.tesloProductToEntity);
        console.log( JSON.stringify(products, null, 2) );
        return products;
    } catch (error) {
        console.log(error);
        throw new Error("Error getting products");
        
    }
}