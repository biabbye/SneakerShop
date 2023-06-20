import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { COLOURS } from '../constants';
import InputField from '../components/InputField';
import CustomButton from '../components/CustomButton';
import { useToast } from "react-native-toast-notifications";
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';

const Register = ({navigation}) => {
    const toast = useToast();

    const [firstName,setFirstName] = useState();
    const [lastName,setLastName] = useState();
    const [email,setEmail] = useState();
    const [deliveryAddress,setDeliveryAddress] = useState();
    const [password,setPassword] = useState();
    const [confirmPassword,setConfirmPassword] = useState();


    const handleRegister = async () => {
        try {

            console.log('REGISTER CALLED')
            console.log(password)
            console.log(confirmPassword)
            if(!firstName || !lastName || !email || !deliveryAddress || !password || !confirmPassword)
            {
                toast.show("Empty fields.", {
                    type: 'warning'
                });
                return;
            }
            if(password === confirmPassword){
                
                const storedUsers = await AsyncStorage.getItem('users');
                const users = storedUsers ? JSON.parse(storedUsers) : [];
                const userExists = users.find((user) => user.email === email);
                if(!userExists){
                    const newUser = { id: uuid.v4(), firstName,lastName,email,deliveryAddress,password,isLoggedIn:false, cart:[] };
                    users.push(newUser);
                    await AsyncStorage.setItem('users', JSON.stringify(users));
                    toast.show("Successfully registered.Please log in", {
                        type: 'success'
                        });
    
                    navigation.navigate('Login');
                }else{
                    toast.show("Email already in use.", {
                        type: 'warning'
                    });
                }
            }else{
                toast.show("Passwords do not match.", {
                    type: 'warning'
                });
                return;
            }
        } catch (error) {
          console.log(error);
        }
      };

    return (
        <SafeAreaView style={{flex: 1, justifyContent: 'center',marginTop:80}}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{paddingHorizontal: 25}}>
            <Text
              style={{
                fontSize: 24,
                fontWeight: '600',
                letterSpacing: 0.5,
                marginBottom:50,
                color: COLOURS.black,
              }}>
              Register
            </Text>
            <View style={{flexDirection:'column',justifyContent:'center'}}>
                <InputField
                label={'First Name'}
                icon={
                    <Ionicons
                    name="person-outline"
                    size={20}
                    color="#666"
                    style={{marginRight: 5}}
                    />
                }
                value={firstName}
                onChangeText={setFirstName}
                />
                <InputField
                label={'Last Name'}
                icon={
                    <Ionicons
                    name="person-outline"
                    size={20}
                    color="#666"
                    style={{marginRight: 5}}
                    />
                }
                value={lastName}
                onChangeText={setLastName}
                />
        
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
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                />
                <InputField
                label={'Delivery Address'}
                icon={
                    <MaterialIcons
                    name="business"
                    size={20}
                    color="#666"
                    style={{marginRight: 5}}
                    />
                }
                value={deliveryAddress}
                onChangeText={setDeliveryAddress}
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
        
                <InputField
                label={'Confirm Password'}
                icon={
                    <Ionicons
                    name="ios-lock-closed-outline"
                    size={20}
                    color="#666"
                    style={{marginRight: 5}}
                    />
                }
                inputType="password"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                />
            </View>
            
    
            <CustomButton label={'Register'} onPress={() => {handleRegister()}} />
    
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                marginBottom: 30,
              }}>
              <Text>Already registered?</Text>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Text style={{color: COLOURS.blue, fontWeight: '800'}}> Login</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </SafeAreaView>
      );
}

export default Register