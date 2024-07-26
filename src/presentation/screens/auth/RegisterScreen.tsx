
import { Button, Input, Layout, Text } from '@ui-kitten/components'
import { ScrollView } from 'react-native-gesture-handler'
import { MyIcon } from '../../components/ui/MyIcon'
import { useWindowDimensions } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParams } from '../../navigation/StackNavigator';

interface Props extends StackScreenProps<RootStackParams, 'RegisterScreen'>{}
export const RegisterScreen = ({navigation}:Props) => {

    const { height} = useWindowDimensions();

    return (
        <Layout style={{flex: 1}}>
        <ScrollView style={{ marginHorizontal: 40 }}>
            <Layout style={{ paddingTop: height * 0.30 }}>
                <Text category='h1'>Registrarse</Text>
                <Text category='p2'>Por favor, crea una cuenta para continuar</Text>
            </Layout>
            <Layout style={{ paddingTop: 20 }}>

                <Input placeholder='Nombre Completo'
                    keyboardType='default'
                    autoCapitalize='none'
                    style={{ marginBottom: 10 }}
                    accessoryLeft={ <MyIcon name='person-outline' /> }
                />
                <Input placeholder='Correo Electrónico'
                    keyboardType='email-address'
                    autoCapitalize='none'
                    style={{ marginBottom: 10 }}
                    accessoryLeft={ <MyIcon name='email-outline' /> }
                />
                <Input placeholder='Contraseña'
                    secureTextEntry
                    autoCapitalize='none'
                    style={{ marginBottom: 10 }}
                    accessoryLeft={ <MyIcon name='lock-outline' /> }
                />
                {/* Space */}
                <Layout style={{ height: 20 }} />
                
                {/* botton */}
                <Button
                    accessoryRight={ <MyIcon name='arrow-forward-outline' white /> }
                    onPress={() => { }}
                    style={{ marginBottom: 10 }}
                >
                    Ingresar
                </Button>

                {/* Info para crear nueva cuenta */}
                <Layout style={{ alignItems: 'center', flexDirection: 'column', justifyContent:'center' }}>
                    <Text>¿Ya tienes una cuenta?</Text>
                    <Text 
                        status="primary" 
                        category="s1"
                        onPress={() => navigation.goBack()}
                    >
                        Inicia Sesion
                    </Text>
                </Layout>

            </Layout>
        </ScrollView>
    </Layout>
    )
}