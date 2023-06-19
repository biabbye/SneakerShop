import React from 'react';
import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from './src/Screens/Home';
import Cart from './src/Screens/Cart';
import ProductDetails from './src/Screens/ProductDetails';
import { ToastProvider } from 'react-native-toast-notifications'

const App = () => {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
        <ToastProvider 
            placement="bottom"
            duration={5000}
            animationType='slide-in'
            animationDuration={250}
            successColor="#0043F9"
            textStyle={{ fontSize: 16 }}
            offsetBottom={100}
            swipeEnabled={true}>
            <Stack.Navigator
                screenOptions={{
                headerShown: false,
                }}>
                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen name="Cart" component={Cart} />
                <Stack.Screen name="ProductDetails" component={ProductDetails} />
            </Stack.Navigator>
        </ToastProvider>
      
    </NavigationContainer>
  );
};

export default App;