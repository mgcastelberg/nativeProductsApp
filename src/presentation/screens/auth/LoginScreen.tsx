
import { Button, Input, Layout, Text } from '@ui-kitten/components';
import { Alert, useWindowDimensions } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';
import { MyIcon } from '../../components/ui/MyIcon';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParams } from '../../navigation/StackNavigator';
import { API_URL, STAGE } from '@env';
import { useState } from 'react';
import { useAuthStore } from '../../store/useAuthStore';

// Tomamos de nuestras properties la navegacion
interface Props extends StackScreenProps<RootStackParams, 'LoginScreen'>{}


export const LoginScreen = ({navigation}:Props) => {

    const { login } = useAuthStore();
    const [isPosting, setisPosting] = useState(false); // Necesitamos saber cuando se esta haciendo un posteo
    const [form, setForm] = useState({
        email:'',
        password:''
    });

    const { height } = useWindowDimensions();

    const onLogin = async() => {
        if ( form.email.length === 0 || form.password.length === 0 ) {
            return;
        }
        setisPosting(true);
        
        const wasSuccessful = await login( form.email, form.password );
        setisPosting(false);
        if ( wasSuccessful ) return;

        Alert.alert('Error', 'Usuario o contraseña incorrectos');
    }

    console.log({ apiUrl: API_URL, stage: STAGE});

    return (
        <Layout style={{flex: 1}}>
            <ScrollView style={{ marginHorizontal: 40 }}>
                <Layout style={{ paddingTop: height * 0.35 }}>
                    <Text category='h1'>Ingresar</Text>
                    <Text category='p2'>Por favor, ingrese para continuar</Text>
                </Layout>
                <Layout style={{ paddingTop: 20 }}>

                    <Input placeholder='Correo Electrónico'
                        keyboardType='email-address'
                        autoCapitalize='none'
                        value={ form.email }
                        onChangeText={(email) => setForm({ ...form, email })}
                        style={{ marginBottom: 10 }}
                        accessoryLeft={ <MyIcon name='email-outline' /> }
                    />
                    <Input placeholder='Contraseña'
                        secureTextEntry
                        autoCapitalize='none'
                        value={ form.password }
                        onChangeText={(password) => setForm({ ...form, password })}
                        style={{ marginBottom: 10 }}
                        accessoryLeft={ <MyIcon name='lock-outline' /> }
                    />

                    <Text>{ JSON.stringify(form, null, 2)}</Text>

                    {/* Space */}
                    <Layout style={{ height: 20 }} />
                    
                    {/* botton */}
                    <Button
                        disabled={isPosting} //para evitar que la persona lance varias peticiones
                        accessoryRight={ <MyIcon name='arrow-forward-outline' white /> }
                        onPress={onLogin}
                        style={{ marginBottom: 10 }}
                    >
                        Ingresar
                    </Button>

                    {/* Info para crear nueva cuenta */}
                    <Layout style={{ alignItems: 'center', flexDirection: 'column', justifyContent:'center' }}>
                        <Text>¿No tiene una cuenta?</Text>
                        <Text 
                            status="primary" 
                            category="s1"
                            onPress={() => navigation.navigate('RegisterScreen')}
                        >
                            Crea una aquí
                        </Text>
                    </Layout>

                </Layout>
            </ScrollView>
        </Layout>
    )
}