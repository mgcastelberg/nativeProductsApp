import { createStackNavigator, StackCardStyleInterpolator } from '@react-navigation/stack';
import { LoadingScreen } from '../screens/loading/LoadingScreen';
import { LoginScreen } from '../screens/auth/LoginScreen';
import { RegisterScreen } from '../screens/auth/RegisterScreen';
import { ProductScreen } from '../screens/product/ProductScreen';
import { HomeScreen } from '../screens/home/HomeScreen';


export type RootStackParams = {
  HomeScreen: undefined;
  LoadingScreen: undefined;
  LoginScreen: undefined;
  RegisterScreen: undefined;
  ProductScreen: { productId: string };
}

const Stack = createStackNavigator<RootStackParams>();

const fadeAnimation: StackCardStyleInterpolator = ({ current }) => {
  return{
    cardStyle:{
      opacity: current.progress
    }
  }
}

export const StackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName='LoadingScreen' screenOptions={{ headerShown: false }}>
      <Stack.Screen options={{ cardStyleInterpolator: fadeAnimation }} name="HomeScreen" component={HomeScreen} />
      <Stack.Screen options={{ cardStyleInterpolator: fadeAnimation }} name="LoadingScreen" component={LoadingScreen} />
      <Stack.Screen options={{ cardStyleInterpolator: fadeAnimation }} name="LoginScreen" component={LoginScreen} />
      <Stack.Screen options={{ cardStyleInterpolator: fadeAnimation }} name="RegisterScreen" component={RegisterScreen} />
      <Stack.Screen name="ProductScreen" component={ProductScreen} />
    </Stack.Navigator>
  );
}
