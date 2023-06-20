import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { COLOURS } from '../constants';
import CustomButton from '../components/CustomButton'
import InputField from '../components/InputField'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useToast } from "react-native-toast-notifications";

const Login = ({navigation}) => {

    const toast = useToast();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        checkIfLoggedIn();
      }, []);

    const checkIfLoggedIn = async () => {
        try {
            const storedUsers = await AsyncStorage.getItem('users');
            if (storedUsers) {
                console.log("------------")
                console.log("Stored users:", storedUsers)
                console.log("------------")
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
    
      const handleLogin = async () => {
        try {
          const storedUsers = await AsyncStorage.getItem('users');
          if (storedUsers) {
            console.log(storedUsers);
            const users = JSON.parse(storedUsers);
            const user = users.find((u) => u.email === email && u.password === password);
            if (user) {
                user.isLoggedIn = true;
                await AsyncStorage.setItem('users', JSON.stringify(users));
                setIsLoggedIn(true);
                navigation.replace('Home');
            } else {
                toast.show("Invalid credentials.", {
                    type: 'warning'
                  });
                  return;
            }
          } else {
            toast.show("No users found.", {
                type: 'warning'
              });
              return;
          }
        } catch (error) {
          console.log(error);
        }
      };
    
    return (
        <SafeAreaView style={{flex: 1, justifyContent: 'center'}}>
          <View style={{paddingHorizontal: 25}}>
            <View style={{flexDirection:'row',justifyContent:'center'}}>
                <Text
                    style={{
                        fontSize: 24,
                        fontWeight: '600',
                        letterSpacing: 0.5,
                        marginVertical: 20,
                        color: COLOURS.black,
                        
                      }}>
                    Login
                </Text>
            </View>
            
    
            <InputField
              label={'Email'}
              icon={
                <MaterialIcons
                name="alternate-email"
                size={20}
                color="#666"
                style={{marginRight: 5}}
              />
              }
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
            />
    
            <InputField
              label={'Password'}
              icon={
                <Ionicons
                name="ios-lock-closed-outline"
                size={20}
                color="#666"
                style={{marginRight: 5}}
              />
              }
              inputType="password"
              value={password}
              onChangeText={setPassword}
            />
            
            <CustomButton label={"Login"} onPress={() => {handleLogin()}} />
    
            
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                marginBottom: 30,
              }}>
              <Text>New to the app?</Text>
              <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                <Text style={{color: COLOURS.blue, fontWeight: '800'}}> Register</Text>
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      );
}

export default Login