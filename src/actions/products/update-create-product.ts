import { isAxiosError } from "axios";
import { shopApi } from "../../config/api/shopApi";
import { Product } from "../../domain/entities/product";


// Partial premite que todas las propiedades del producto sean opcionales
export const updateCreateProduct = async(product: Partial<Product>) => {
    
    try {

        product.stock = isNaN( Number(product.stock)) ? 0 : Number(product.stock);
        product.price = isNaN(Number(product.price)) ? 0 : Number(product.price);

        if(product.id && product.id !== 'new') {
            return updateProduct(product);
        }

        return createProduct(product);
        
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
        const checkedImages = await prepareImages(images);

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

const createProduct = async(product: Partial<Product>) => {
    console.log(product);
    const {id, images = [], ...rest} = product;

    try {
        const checkedImages = await prepareImages(images);

        // const { data } = await shopApi.patch<TesloProduct>(`/products/${id}`, {
        const { data } = await shopApi.post(`/products`, {
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

const prepareImages = async( images: string[] ) => {

    // toDo revisar los FILES
    const fileImages = images.filter( image => image.includes('file://') );
    const currentImages = images.filter( image => !image.includes('file://') );

    if( fileImages.length > 0 ) {
        const uploadPromises = fileImages.map( image => uploadImage(image) );
        const uploadedImages = await Promise.all(uploadPromises);
        currentImages.push(...uploadedImages);
    }
    
    return currentImages.map( image => {
        return image.split('/').pop();
    });

}

const uploadImage = async( image: string ) => {
    const formData = new FormData();
    formData.append('file', {
        uri: image,
        type: 'image/jpeg',
        name: image.split('/').pop()
    });
    const { data } = await shopApi.post<{image:string}>('/files/product', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
    return data.image;
}