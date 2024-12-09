
import { Text } from '@ui-kitten/components'
import { MainLayout } from '../../layouts/MainLayout'
import { getProductById } from '../../../actions/products/get-products-by-id';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParams } from '../../navigation/StackNavigator';
import { useQuery } from '@tanstack/react-query';
import { useRef } from 'react';

interface Props extends StackScreenProps<RootStackParams, 'ProductScreen'> {}

export const ProductScreen = ({ route }: Props) => {

    // Crear referecia al producto
    const productIdRef = useRef(route.params.productId);
    // const { productId} = route.params;

    // toDo UseQuery
    const { data: product } = useQuery({
        queryKey: ['product', productIdRef.current],
        queryFn: () => getProductById(productIdRef.current)
    });
    
    if(!product) {
        return (
            <MainLayout title="Cargando" />
        )
    }


    // toDo UseMutation
    return (
        <MainLayout title={product.title} subtitle={`Precio: ${product.price.toString()}`}>
            <Text>ProductScreen { productIdRef.current }</Text>
        </MainLayout>
    )
}