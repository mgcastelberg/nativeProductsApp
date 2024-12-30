
import { Button, Icon, Layout, Text } from '@ui-kitten/components'
import { useAuthStore } from '../../store/useAuthStore'
import { getProductsByPage } from '../../../actions/products/get-products-by-page';
import { useInfiniteQuery } from '@tanstack/react-query';
import { MainLayout } from '../../layouts/MainLayout';
import { FullScreenLoader } from '../../components/FullScreenLoader';
import { ProductList } from '../../components/products/ProductList';
import { FAB } from '../../components/ui/FAB';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParams } from '../../navigation/StackNavigator';

export const HomeScreen = () => {

    const { logout } = useAuthStore();

    const navigation = useNavigation<NavigationProp<RootStackParams>>();

    // getProductsByPage(0);
    // const { isLoading, data: products = [] } = useQuery({
    //     queryKey: ['products','infinite'],
    //     staleTime: 1000 * 60 * 60 * 24,
    //     queryFn: () => getProductsByPage(0),
    // });
    const { isLoading, data, fetchNextPage } = useInfiniteQuery({
        queryKey: ['products','infinite'],
        staleTime: 1000 * 60 * 60 * 24,
        initialPageParam: 0,
        queryFn: async (params) => {
            console.log(params);
            const productos = await getProductsByPage(params.pageParam || 0);
            return productos;
        },
        getNextPageParam: (lastPage, allPages) => lastPage.length === 0 ? undefined : allPages.length
    });
    
    return (
        <>
            <MainLayout 
                title="Tienda" 
                subtitle="Todos los productos"
                rightAction={ logout }
                rightActionIcon="log-out-outline"
                // rightActionIcon="plus-outline"
            >

                {/* <FullScreenLoader /> */}
                {
                    isLoading
                    ? (<FullScreenLoader />)
                    : (
                        <ProductList 
                            products={data?.pages.flat() || []}
                            fetchNextPage={fetchNextPage}
                        />
                    )
                }

            </MainLayout>
            <FAB 
                iconName='plus-outline'
                onPress={() => navigation.navigate('ProductScreen', { productId: 'new' })}  
                style={{ 
                    position: 'absolute', 
                    bottom: 30, 
                    right: 20 
                }}
            />
        </>
    )
}