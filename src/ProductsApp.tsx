
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native'
import { StackNavigator } from './presentation/navigation/StackNavigator';
import { ApplicationProvider, IconRegistry, Layout, Text } from '@ui-kitten/components';
import * as eva from '@eva-design/eva';
import { useColorScheme } from 'react-native';
import { EvaIconsPack } from '@ui-kitten/eva-icons';

export const ProductsApp = () => {
    const colorScheme = useColorScheme();
    const theme = colorScheme === 'dark' ? eva.dark : eva.light
    // Evita el flashaso blanco al navegar entre pantallas, para que el fondo del navigation sea el mismo del tema
    const backgroundColor = colorScheme === 'dark' ?  theme['color-basic-800'] :  theme['color-basic-100']

    return (
        <>
            <IconRegistry icons={EvaIconsPack} />
            <ApplicationProvider {...eva} theme={ theme }>
                <NavigationContainer theme={{
                    dark: colorScheme === 'dark' ? eva.dark : eva.light,
                    colors: { 
                        primary: theme['color-primary-500'], 
                        background: backgroundColor, 
                        card: theme['text-basic-color'],
                        text: theme['text-basic-color'],
                        border: theme['color-primary-500'],
                        notification: theme['color-primary-500'],
                    },
                }}>
                    <StackNavigator />
                </NavigationContainer>
            </ApplicationProvider>
        </>
    )
}