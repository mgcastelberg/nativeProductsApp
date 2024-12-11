
import { Button, ButtonGroup, Input, Layout, Text, useTheme } from '@ui-kitten/components'
import { MainLayout } from '../../layouts/MainLayout'
import { getProductById } from '../../../actions/products/get-products-by-id';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParams } from '../../navigation/StackNavigator';
import { useQuery } from '@tanstack/react-query';
import { useRef } from 'react';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import { FadeInImage } from '../../components/ui/FadeInImage';
import { Gender, Size } from '../../../domain/entities/product';
import { MyIcon } from '../../components/ui/MyIcon';

const sizes: Size[] = [Size.XS, Size.S, Size.M, Size.L, Size.XL, Size.XXL];
const genders: Gender[] = [Gender.Men, Gender.Women, Gender.Kids, Gender.Unisex];

interface Props extends StackScreenProps<RootStackParams, 'ProductScreen'> {}

export const ProductScreen = ({ route }: Props) => {

    // Crear referecia al producto
    const productIdRef = useRef(route.params.productId);
    // const { productId} = route.params;
    const theme = useTheme();

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

                {/* formulario del producto */}
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

                {/* Precio y Stock */}
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

                {/* Botones de accion */}
                <ButtonGroup 
                    size='small'
                    appearance='outline' 
                    style={{ marginHorizontal: 10, marginTop: 20, margin:2 }}>
                    {
                        sizes.map((size) => (
                            <Button 
                                key={size}
                                style={{ 
                                    flex: 1, 
                                    backgroundColor: true ? theme['color-primary-200'] : undefined,
                                }}
                            >{size}</Button>
                        ))
                    }

                    {/* <Button>A</Button>
                    <Button>B</Button>
                    <Button>C</Button> */}
                </ButtonGroup>

                <ButtonGroup 
                    size='small'
                    appearance='outline' 
                    style={{ marginHorizontal: 10, marginTop: 20, margin:2 }}>
                    {
                        genders.map((gender) => (
                            <Button 
                                key={gender}
                                style={{ 
                                    flex: 1, 
                                    backgroundColor: true ? theme['color-primary-200'] : undefined,
                                }}
                            >{gender}</Button>
                        ))
                    }
                </ButtonGroup>

                <Button
                    accessoryLeft={ <MyIcon name='save-outline' white /> }
                    onPress={() => console.log('Guardar')}
                    style={{ marginHorizontal: 10, marginTop: 20 }}
                >
                    Guardar
                </Button>

                <Text>
                    {JSON.stringify(product, null, 2)}
                </Text>

                <Layout style={{ height: 200 }}>

                </Layout>

            </ScrollView>
        </MainLayout>
    )
}