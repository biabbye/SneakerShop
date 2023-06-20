import React,{useState,useEffect} from 'react';
import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from './src/Screens/Login';
import Register from './src/Screens/Register';
import Home from './src/Screens/Home';
import Cart from './src/Screens/Cart';
import ProductDetails from './src/Screens/ProductDetails';
import { ToastProvider } from 'react-native-toast-notifications'
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createNativeStackNavigator();

const App = () => {
  
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    checkLoginStatus();
  }, []);

  const checkLoginStatus = async () => {
    try {
      const storedUsers = await AsyncStorage.getItem('users');
      if (storedUsers) {
        const users = JSON.parse(storedUsers);
        const loggedInUser = users.find((user) => user.isLoggedIn === true);
        if (loggedInUser) {
          setIsLoggedIn(true);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

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
                    {isLoggedIn ? (
                      <>
                        <Stack.Screen name="Home" component={Home} />
                        <Stack.Screen name="Cart" component={Cart} />
                        <Stack.Screen name="ProductDetails" component={ProductDetails} />
                        <Stack.Screen name="Login" component={Login} />
                        <Stack.Screen name="Register" component={Register} />
                      </>

                    ):(
                      <>
                        <Stack.Screen name="Login" component={Login} />
                        <Stack.Screen name="Register" component={Register} />
                        <Stack.Screen name="Home" component={Home} />
                        <Stack.Screen name="Cart" component={Cart} />
                        <Stack.Screen name="ProductDetails" component={ProductDetails} />
                        
                      </>
                    )}
                 
              </Stack.Navigator>
            
        </ToastProvider>
      
    </NavigationContainer>
  );
};

export default App;