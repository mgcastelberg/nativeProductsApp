
import { Button, Icon, Layout, Text } from '@ui-kitten/components'
import { useAuthStore } from '../../store/useAuthStore'

export const HomeScreen = () => {

    const { logout } = useAuthStore();
    
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