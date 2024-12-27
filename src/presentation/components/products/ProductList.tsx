import { Layout, List } from '@ui-kitten/components';
import { Product } from '../../../domain/entities/product';
import { ProductCard } from './ProductCard';
import { useState } from 'react';
import { RefreshControl } from 'react-native';
import { QueryClient, useQueryClient } from '@tanstack/react-query';

interface Props {
    products: Product[];
    // todo nextPage
    fetchNextPage: () => void;

}

export const ProductList = ({products, fetchNextPage}: Props) => {

    // implementar el pullRefresh
    const queryClient = useQueryClient();
    const [isRefreshing, setIsRefreshing] = useState(false);

    const onPullToRefresh = async() => {
        setIsRefreshing(true);
        // sleep 2 seconds
        await new Promise(resolve => setTimeout(resolve, 1000));
        // ese query client lo usamos para invalidar la query y hacer el pull refresh
        queryClient.invalidateQueries({ queryKey: ['products', 'infinite'] });
        setIsRefreshing(false);
    }

    return (
        <List 
            data={products}
            numColumns={2}
            keyExtractor={(item, index) => `${item.id}-${index}`}
            renderItem={({item}) => (
                <ProductCard product={item} />)
            }
            ListFooterComponent={() => <Layout style={{ height: 100 }}/>}
            onEndReached={ fetchNextPage }
            onEndReachedThreshold={0.8}

            refreshControl={
                <RefreshControl
                    refreshing={ isRefreshing }
                    onRefresh={ onPullToRefresh }
                />
            }
        />
    )
}