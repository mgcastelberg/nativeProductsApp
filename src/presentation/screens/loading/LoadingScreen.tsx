import { Button, Input, Layout, Text } from "@ui-kitten/components"
import { useWindowDimensions } from "react-native"
import { ScrollView } from "react-native-gesture-handler"


export const LoadingScreen = () => {

    const { height} = useWindowDimensions();

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
                        style={{ marginBottom: 10 }}
                    />
                    <Input placeholder='Contraseña'
                        secureTextEntry
                        autoCapitalize='none'
                        style={{ marginBottom: 10 }}
                    />
                    {/* Space */}
                    <Layout style={{ height: 20 }} />
                    
                    {/* botton */}
                    <Button 
                        onPress={() => { }}
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
                            onPress={() => { }}
                        >
                            Crea una aquí
                        </Text>
                    </Layout>

                </Layout>
            </ScrollView>
        </Layout>
    )
}