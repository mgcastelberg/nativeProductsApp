
import { Button, Icon, Layout, Text } from '@ui-kitten/components'

export const HomeScreen = () => {
    return (
        <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text category='h1'>
                Home Screen
            </Text>

            {/* <Icon name='facebook' fill='blue' height={100} /> */}

            <Button accessoryLeft={<Icon name='facebook' />}>
                Cerrar sesión
            </Button>
        </Layout>
    )
}