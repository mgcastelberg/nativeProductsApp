
import { useRef } from 'react';
import { Button, ButtonGroup, Input, Layout, Text, useTheme } from '@ui-kitten/components'
import { MainLayout } from '../../layouts/MainLayout'

import { getProductById, updateCreateProduct } from '../../../actions/products';

import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParams } from '../../navigation/StackNavigator';
import { useMutation, useQuery, QueryClient, useQueryClient } from '@tanstack/react-query';
import { ScrollView } from 'react-native-gesture-handler';
import { Gender, Product, Size } from '../../../domain/entities/product';
import { MyIcon } from '../../components/ui/MyIcon';
import { Formik } from 'formik';
import { ProductImages } from '../../components/products/ProductImages';

const sizes: Size[] = [Size.XS, Size.S, Size.M, Size.L, Size.XL, Size.XXL];
const genders: Gender[] = [Gender.Men, Gender.Women, Gender.Kid, Gender.Unisex];

interface Props extends StackScreenProps<RootStackParams, 'ProductScreen'> {}

export const ProductScreen = ({ route }: Props) => {

    // Crear referecia al producto
    const productIdRef = useRef(route.params.productId);
    // const { productId} = route.params;
    const theme = useTheme();
    // Se usa para revalidar el producto
    const QueryClient = useQueryClient();

    // toDo UseQuery
    const { data: product } = useQuery({
        queryKey: ['product', productIdRef.current],
        queryFn: () => getProductById(productIdRef.current)
    });
    
    // toDo UseMutation la mutacion no se llama inmediantamente si no hasta que nosotros lo invocamos

    const mutation = useMutation({
        mutationFn: (data: Product) => updateCreateProduct({...data, id: productIdRef.current}),
        onSuccess: (data: Product) => {
            // console.log('Product updated');
            productIdRef.current = data.id;
            // esta parte es para revalidar el products infinite del home screen
            QueryClient.invalidateQueries({ queryKey: ['products', 'infinite'] });
            QueryClient.invalidateQueries({ queryKey: ['product', data.id] });
            // otra forma es actualizarlo
            // QueryClient.setQueryData(['product', data.id], data);
        }
    });

    // El orden de esta validacion es importante, al tenerla arriba de la mutacion regresaba un error
    if(!product) {
        return (
            <MainLayout title="Cargando" />
        )
    }


    return (
        <Formik
            initialValues={product}
            onSubmit={ (values) => mutation.mutate(values) }
        >
            {
                ({ handleChange, handleSubmit, values,errors, setFieldValue }) => (
                    // JSX
                    <MainLayout title={values.title} subtitle={`Precio: ${values.price.toString()}`}>
                        <ScrollView style={{ flex: 1}}>
                            {/* Imagenes del Producto */}
                            <Layout style={{ marginTop: 20 , justifyContent: 'center', alignItems: 'center' }}>
                                <ProductImages images={values.images} />
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
                                    style={{ marginVertical: 5, textAlignVertical: 'top' }}
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
                                    keyboardType="numeric"
                                />
                                <Input
                                    label="Inventario"
                                    style={{ flex: 1 }}
                                    value={ values.stock.toString() }
                                    onChangeText={ handleChange('stock') }
                                    keyboardType="numeric"
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
                                onPress={() => handleSubmit()}
                                disabled={mutation.isPending}
                                style={{ marginHorizontal: 10, marginTop: 20 }}
                            >
                                Guardar
                            </Button>

                            {/* <Text>
                                {JSON.stringify(values, null, 2)}
                            </Text> */}

                            <Layout style={{ height: 200 }}>

                            </Layout>

                        </ScrollView>
                    </MainLayout>
                )
            }
        </Formik>
    )
}