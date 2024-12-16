
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
import { Formik } from 'formik';

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
        <Formik
            initialValues={product}
            onSubmit={ (values) => console.log(values) }
        >
            {
                ({ handleChange, handleSubmit, values,errors, setFieldValue }) => (
                    // JSX
                    <MainLayout title={values.title} subtitle={`Precio: ${values.price.toString()}`}>
                        <ScrollView style={{ flex: 1}}>
                            {/* Imagenes del Producto */}
                            <Layout>
                                {/* tener en considearacion cuando no tenemos imagenes */}
                                <FlatList
                                    data={values.images}
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
                                    style={{ marginVertical: 5 }}
                                    value={ values.title }
                                    onChangeText={ handleChange('title') }
                                />
                                <Input
                                    label="Slug"
                                    style={{ marginVertical: 5 }}
                                    value={ values.slug }
                                    onChangeText={ handleChange('slug') }
                                />
                                <Input
                                    label="Descripcion"
                                    multiline
                                    numberOfLines={5}
                                    style={{ marginVertical: 5 }}
                                    value={ values.description }
                                    onChangeText={ handleChange('description') }
                                />
                            </Layout>

                            {/* Precio y Stock */}
                            <Layout style={{ marginHorizontal: 10, marginVertical: 5, flexDirection: 'row', gap: 10 }}>
                                <Input
                                    label="Precio"
                                    style={{ flex: 1 }}
                                    value={ values.price.toString() }
                                    onChangeText={ handleChange('price') }
                                />
                                <Input
                                    label="Inventario"
                                    style={{ flex: 1 }}
                                    value={ values.stock.toString() }
                                    onChangeText={ handleChange('stock') }
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
                                            onPress={ () => setFieldValue('sizes', values.sizes.includes(size) 
                                                ? values.sizes.filter(s => s !== size) 
                                                : [...values.sizes, size])}
                                            key={size}
                                            style={{ 
                                                flex: 1,
                                                backgroundColor: values.sizes.includes(size) ? theme['color-primary-200'] : undefined,
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
                                            onPress={() => setFieldValue('gender', gender)}
                                            key={gender}
                                            style={{ 
                                                flex: 1, 
                                                backgroundColor:values.gender.startsWith(gender) ? theme['color-primary-200'] : undefined,
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
                                {JSON.stringify(values, null, 2)}
                            </Text>

                            <Layout style={{ height: 200 }}>

                            </Layout>

                        </ScrollView>
                    </MainLayout>
                )
            }
        </Formik>
    )
}