
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

    return (
        <>
            <IconRegistry icons={EvaIconsPack} />
            <ApplicationProvider {...eva} theme={ theme }>
                <NavigationContainer>
                    <StackNavigator />
                </NavigationContainer>
            </ApplicationProvider>
        </>
    )
}