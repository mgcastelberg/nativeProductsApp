
import { Button, Icon, Layout, Text } from '@ui-kitten/components'
import { useAuthStore } from '../../store/useAuthStore'
import { getProductsByPage } from '../../../actions/products/get-products-by-page';
import { useQuery } from '@tanstack/react-query';
import { MainLayout } from '../../layouts/MainLayout';
import { FullScreenLoader } from '../../components/FullScreenLoader';
import { ProductList } from '../../components/products/ProductList';

export const HomeScreen = () => {

    const { logout } = useAuthStore();

    // getProductsByPage(0);
    const { isLoading, data: products = [] } = useQuery({
        queryKey: ['products','infinite'],
        staleTime: 1000 * 60 * 60 * 24,
        queryFn: () => getProductsByPage(0),
    });
    
    return (
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
                : <ProductList products={products} />
            }

        </MainLayout>
    )
}