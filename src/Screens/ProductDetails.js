import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Image,
  Dimensions,
  Animated,
} from 'react-native';
import { useToast } from "react-native-toast-notifications";
import { COLOURS } from '../constants';
import { Products } from '../Database/Database';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MapView, {Marker} from 'react-native-maps';


const ProductDetails = ({route,navigation}) => {
  const toast = useToast();
  const {productId} = route.params;

  const [product,setProduct] = useState();

  const width = Dimensions.get('window').width;

  useEffect(() => {
    for(let i = 0; i< Products.length; i++)
    {
      if(Products[i].id == productId)
      {
        setProduct(Products[i]);
      }
    }
  }, [productId]);

  const addToMyCart = async (product) => {
    try{
      const existingProducts = await AsyncStorage.getItem('cartItems');
      let cartItems = [];
  
      if (existingProducts) {

        cartItems = JSON.parse(existingProducts);
        const productExists = cartItems.some((item) => item.id === product.id);

        if (productExists) {
          toast.show("Product already added to cart.", {
            type: 'warning'
          });
          return;
        }
      }
      cartItems.push(product);
      await AsyncStorage.setItem('cartItems', JSON.stringify(cartItems));
      toast.show("Product successfully added to cart.", {
        type: 'success'
      });
      navigation.navigate('Home');
      
    }catch(error){
      console.error('Error adding product to cart:', error);
    }
  };

  const shopRegion = {
    latitude:44.426724,
    longitude:26.122978,
    latitudeDelta:0.005,
    longitudeDelta:0.005
  }


  return (
    <View
      style={{
        flex:1,
        backgroundColor: COLOURS.white,
        position: 'relative',
      }}>
      <StatusBar
        backgroundColor={COLOURS.backgroundLight}
        barStyle="dark-content"
      />
      <ScrollView>
        <View
          style={{
            width: '100%',
            backgroundColor: COLOURS.backgroundLight,
            borderBottomRightRadius: 20,
            borderBottomLeftRadius: 20,
            position: 'relative',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 4,
          }}>
          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingTop: 16,
              paddingLeft: 16,
              borderRadius:10
            }}>
            <TouchableOpacity onPress={() => navigation.goBack('Home')}>
              <Entypo
                name="chevron-left"
                style={{
                  fontSize: 25,
                  color: COLOURS.backgroundDark,
                  padding: 12,
                  marginTop:30,
                  backgroundColor: COLOURS.backgroundLight,
                }}
              />
            </TouchableOpacity>
          </View>
          <View
            style={{
              width: width,
              height: 180,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Image
              source={product?.productImage}
              style={{
                width: '100%',
                height: '100%',
                resizeMode: 'contain',
              }}
            />
          </View>
          
        </View>
        <View
          style={{
            paddingHorizontal: 16,
            marginTop: 6,
          }}>

          <View
            style={{
              flexDirection: 'row',
              marginVertical: 4,
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Text
              style={{
                fontSize: 24,
                fontWeight: '600',
                letterSpacing: 0.5,
                marginVertical: 4,
                color: COLOURS.black,
                maxWidth: '84%',
              }}>
              {product !=null && product.productName}
            </Text>
            <Ionicons
              name="share"
              style={{
                fontSize: 24,
                color: COLOURS.blue,
                backgroundColor: COLOURS.white,
                padding: 8,
                borderRadius: 100,
              }}
            />
          </View>
          <Text
            style={{
              fontSize: 12,
              color: COLOURS.black,
              fontWeight: '400',
              letterSpacing: 1,
              opacity: 0.5,
              lineHeight: 20,
              maxWidth: '85%',
              maxHeight: 44,
              marginBottom: 18,
            }}>
            {product !=null && product.description}
          </Text>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginVertical: 10,
            }}>
            <Entypo
              name="shopping-cart"
              style={{
                fontSize: 18,
                color: COLOURS.blue,
                marginRight: 6,
              }}
            />
            <Text
              style={{
                fontSize: 16,
                fontWeight:500,
                color: COLOURS.black,
              }}>
              {product !=null && product.onStock ? 'On Stock' : 'Not Available'}
            </Text>
          </View>
          <View
            style={{
              paddingHorizontal: 5,
            }}>
            <Text
              style={{
                fontSize: 18,
                fontWeight: '500',
                maxWidth: '85%',
                color: COLOURS.black,
                marginBottom: 4,
              }}>
              RON {product !=null && product.productPrice}.00
            </Text>
            <Text></Text>
          </View>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginVertical: 10,
              borderTopWidth: 1,
              borderTopColor: COLOURS.backgroundLight,
              borderBottomColor: COLOURS.backgroundLight,
              borderBottomWidth: 1,
              paddingBottom:10,
              paddingTop:10
            }}>
            <View
              style={{
                flexDirection: 'row',
                width: '80%',
                alignItems: 'center',
              }}>
              <View
                style={{
                  color: COLOURS.blue,
                  backgroundColor: COLOURS.backgroundLight,
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: 12,
                  borderRadius: 100,
                  marginRight: 10,
                }}>
                <Entypo
                  name="location-pin"
                  style={{
                    fontSize: 16,
                    color: COLOURS.blue,
                  }}
                />
              </View>
              <Text style={{fontSize:16, fontWeight:'500'}}> Bulevardul Unirii Nr. 1 , Bucharest</Text>
            </View>
          </View> 
          <View>
            <MapView style={{width:width - 30, height:180,marginBottom:20, borderRadius:15}} initialRegion={shopRegion}>
              <Marker coordinate={{ latitude: shopRegion.latitude, longitude: shopRegion.longitude }} />
            </MapView>
          </View>
        </View>
      </ScrollView>

      <View
        style={{
          position: 'absolute',
          bottom: 30,
          height: '7%',
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <TouchableOpacity
          onPress={() => (product.onStock ? addToMyCart(product) : null)}
          style={{
            width: '85%',
            height: '90%',
            backgroundColor: COLOURS.blue,
            borderRadius: 20,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontSize: 12,
              fontWeight: '500',
              letterSpacing: 1,
              color: COLOURS.white,
              textTransform: 'uppercase',
            }}>
            {product !=null && product.onStock ? 'Add to cart' : 'Not Available'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default ProductDetails



{/* <View
            style={{
              width: '100%',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 16,
              marginTop: 32,
            }}>
            {product.productImageList
              ? product.productImageList.map((data, index) => {
                  let opacity = position.interpolate({
                    inputRange: [index - 1, index, index + 1],
                    outputRange: [0.2, 1, 0.2],
                    extrapolate: 'clamp',
                  });
                  return (
                    <Animated.View
                      key={index}
                      style={{
                        width: '16%',
                        height: 2.4,
                        backgroundColor: COLOURS.black,
                        opacity,
                        marginHorizontal: 4,
                        borderRadius: 100,
                      }}></Animated.View>
                  );
                })
              : null} 
          </View> */}