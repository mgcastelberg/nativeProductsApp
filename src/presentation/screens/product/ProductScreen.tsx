
import { Input, Layout, Text } from '@ui-kitten/components'
import { MainLayout } from '../../layouts/MainLayout'
import { getProductById } from '../../../actions/products/get-products-by-id';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParams } from '../../navigation/StackNavigator';
import { useQuery } from '@tanstack/react-query';
import { useRef } from 'react';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import { FadeInImage } from '../../components/ui/FadeInImage';

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

            <ScrollView style={{ flex: 1}}>
                {/* Imagenes del Producto */}
                <Layout>
                    {/* tener en considearacion cuando no tenemos imagenes */}
                    <FlatList
                        data={product.images}
                        keyExtractor={(item) => item}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        renderItem={({ item }) => (
                            <FadeInImage
                                uri={item}
                                style={{ width: 300, height: 300, marginHorizontal: 7 }}
                            />
                        )}
                    />
                </Layout>

                {/* Descripcion del Producto */}
                <Layout style={{ marginHorizontal: 10, marginTop: 20 }}>
                    <Input
                        label="Título"
                        value={ product.title }
                        style={{ marginVertical: 5 }}
                    />
                    <Input
                        label="Slug"
                        value={ product.slug }
                        style={{ marginVertical: 5 }}
                    />
                    <Input
                        label="Descripcion"
                        value={ product.description }
                        multiline
                        numberOfLines={5}
                        style={{ marginVertical: 5 }}
                    />
                </Layout>

                <Layout style={{ marginHorizontal: 10, marginVertical: 5, flexDirection: 'row', gap: 10 }}>
                    <Input
                        label="Precio"
                        value={ product.price.toString() }
                        style={{ flex: 1 }}
                    />
                    <Input
                        label="Inventario"
                        value={ product.stock.toString() }
                        style={{ flex: 1 }}
                    />
                </Layout>

                <Layout style={{ height: 150 }}>

                </Layout>

            </ScrollView>
        </MainLayout>
    )
}