import { createStackNavigator } from '@react-navigation/stack';
import { LoadingScreen } from '../screens/loading/LoadingScreen';
import { LoginScreen } from '../screens/auth/LoginScreen';
import { ResgisterScreen } from '../screens/auth/RegisterScreen';
import { ProductScreen } from '../screens/product/ProductScreen';
import { HomeScreen } from '../screens/home/HomeScreen';


export type RootStackParams = {
  HomeScreen: undefined;
  LoadingScreen: undefined;
  LoginScreen: undefined;
  ResgisterScreen: undefined;
  ProductScreen: { productId: string };
}

const Stack = createStackNavigator<RootStackParams>();

export const StackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName='HomeScreen' screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="LoadingScreen" component={LoadingScreen} />
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="ResgisterScreen" component={ResgisterScreen} />
      <Stack.Screen name="ProductScreen" component={ProductScreen} />
    </Stack.Navigator>
  );
}
