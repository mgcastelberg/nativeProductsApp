import { isAxiosError } from "axios";
import { shopApi } from "../../config/api/shopApi";
import { Product } from "../../domain/entities/product";
import { TesloProduct } from "../../infraestructure/interfaces/teslo-products.response";


// Partial premite que todas las propiedades del producto sean opcionales
export const updateCreateProduct = async(product: Partial<Product>) => {
    
    try {

        product.stock = isNaN( Number(product.stock)) ? 0 : Number(product.stock);
        product.price = isNaN(Number(product.price)) ? 0 : Number(product.price);

        if(product.id) {
            return updateProduct(product);
        }
        
    } catch (error) {
        console.log(error);
        throw new Error("Error updating product");
        
    }
}

// Revisar si viene el usuario
 const updateProduct = async(product: Partial<Product>) => {
     
    console.log(product);
    const {id, images = [], ...rest} = product;

    try {
        const checkedImages = prepareImages(images);

        console.log({checkedImages});

        // const { data } = await shopApi.patch<TesloProduct>(`/products/${id}`, {
        const { data } = await shopApi.patch(`/products/${id}`, {
            images: checkedImages,
            ...rest
        });

        return data;

    } catch (error) {
        if( isAxiosError(error) ) {
            console.log(error.response?.data);
        }
        throw new Error(`Error updating product`);
        
    }
}

const prepareImages = ( images: string[] ) => {

    // toDo revisar los FILES
    
    return images.map( image => {
        return image.split('/').pop();
    });

}