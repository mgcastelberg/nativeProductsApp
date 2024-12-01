
import { Button, Icon, Layout, Text } from '@ui-kitten/components'
import { useAuthStore } from '../../store/useAuthStore'
import { getProductsByPage } from '../../../actions/products/get-products-by-page';

export const HomeScreen = () => {

    const { logout } = useAuthStore();

    getProductsByPage(0);
    
    return (
        <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text category='h1'>
                Home Screen
            </Text>

            {/* <Icon name='facebook' fill='blue' height={100} /> */}

            <Button onPress={logout} accessoryLeft={<Icon name='log-out-outline' />}>
                Cerrar sesión
            </Button>
        </Layout>
    )
}