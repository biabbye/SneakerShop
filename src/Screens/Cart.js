import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { COLOURS } from '../constants';
import { Products } from '../Database/Database';
import { useToast } from "react-native-toast-notifications";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Cart = ({navigation}) => {
  const toast = useToast();
  const [products, setProducts] = useState([]);
  const [totalCost, setTotalCost] = useState(0);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchProductsFromStorage();
    });

    return unsubscribe;
  }, [navigation]);

  const fetchProductsFromStorage = async () => {
    let existingProducts = await AsyncStorage.getItem('cartItems');
    existingProducts = JSON.parse(existingProducts);
    let productsArray = []

    if (existingProducts) {
      console.log(existingProducts);
      Products.forEach(product => {
        existingProducts.forEach((existingProduct) => {
          if(existingProduct.id == product.id){
            productsArray.push(product)
          }
        })
      })

      setProducts(productsArray);
      getTotalCost(productsArray);

    } else {
      setProducts(null);
      getTotalCost(null);
    }
  };

  const getTotalCost = (productsData) => {
    let totalCost = 0;
    for (let i = 0; i < productsData?.length; i++) {
      let productsPrice = productsData[i].productPrice;
      totalCost += productsPrice;
    }
    setTotalCost(totalCost);
  };

  const deleteCartItem = async (id) => {
    try {
      const existingCartItems = await AsyncStorage.getItem('cartItems');
  
      if (existingCartItems) {
        let cartItems = JSON.parse(existingCartItems);
  
        cartItems = cartItems.filter((item) => item.id !== id);
  
        await AsyncStorage.setItem('cartItems', JSON.stringify(cartItems))
        fetchProductsFromStorage();
  
        toast.show("Item removed from cart successfully.", {
          type: 'success'
        });
      }
    } catch (error) {
      console.error('Error deleting item from cart:', error);
    }
  };

  const clearCart = async () => {
    try {
      await AsyncStorage.removeItem('cartItems');
      toast.show("Cart cleared successfully.", {
        type: 'success'
      });
    } catch (error) {
      console.error('Error clearing cart:', error);
    }
  };

  const checkOut = async () => {
    try {
      await AsyncStorage.removeItem('cartItems');
    } catch (error) {
      console.error('Error checking out:', error);
    }

    toast.show("Sneakers will be delivered right after completing payment. Thank you for shopping with us!", {
      type: 'success'
    });

    navigation.navigate('Home');
  };

  const renderProducts = (item, index) => {
    return (
      <TouchableOpacity
        key={item.key}
        onPress={() => navigation.navigate('ProductDetails', {productId: item.id})}
        style={{
          width: '100%',
          height: 100,
          marginVertical: 6,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <View
        key={index}
          style={{
            width: '30%',
            height: 100,
            padding: 14,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: COLOURS.backgroundLight,
            borderRadius: 10,
            marginRight: 22,
          }}>
          <Image
            source={item.productImage}
            style={{
              width: '100%',
              height: '100%',
              resizeMode: 'contain',
            }}
          />
        </View>
        <View
          style={{
            flex: 1,
            height: '100%',
            justifyContent: 'space-around',
          }}>
          <View style={{}}>
            <Text
              style={{
                fontSize: 14,
                maxWidth: '100%',
                color: COLOURS.black,
                fontWeight: '600',
                letterSpacing: 1,
              }}>
              {item.productName}
            </Text>
            <View
              style={{
                marginTop: 4,
                flexDirection: 'row',
                alignItems: 'center',
                opacity: 0.6,
              }}>
              {item.onSale ?
               ( 
               <View style={{flexDirection:'row'}}>
                  <Text
                  style={{
                    fontSize: 14,
                    fontWeight: '400',
                    maxWidth: '85%',
                    marginRight: 4,
                    color:'red'
                  }}>
                    RON {(item.productPrice - (item.productPrice * item.salePercentage) / 100).toFixed(2)}
                  </Text>
                  <Text style={{
                    fontSize: 14,
                    fontWeight: '400',
                    maxWidth: '85%',
                    marginRight: 4,
                  }}>(RON {item.productPrice})</Text>
                </View>
                
              ) : (
                <Text>RON {item.productPrice}</Text>
              )}
            
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <View
                style={{
                  borderRadius: 100,
                  marginRight: 20,
                  padding: 4,
                  borderWidth: 1,
                  borderColor: COLOURS.backgroundMedium,
                  opacity: 0.5,
                }}>
                <MaterialCommunityIcons
                  name="minus"
                  style={{
                    fontSize: 16,
                    color: COLOURS.backgroundDark,
                  }}
                />
              </View>
              <Text>1</Text>
              <View
                style={{
                  borderRadius: 100,
                  marginLeft: 20,
                  padding: 4,
                  borderWidth: 1,
                  borderColor: COLOURS.backgroundMedium,
                  opacity: 0.5,
                }}>
                <MaterialCommunityIcons
                  name="plus"
                  style={{
                    fontSize: 16,
                    color: COLOURS.backgroundDark,
                  }}
                />
              </View>
            </View>
            <TouchableOpacity onPress={() => {deleteCartItem(item.id)}}>
              <MaterialCommunityIcons
                name="delete-outline"
                style={{
                  fontSize: 16,
                  color: COLOURS.backgroundDark,
                  backgroundColor: COLOURS.backgroundLight,
                  padding: 8,
                  borderRadius: 100,
                }}
              />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    );
  };


  return (
    <View
      style={{
        flex:1,
        backgroundColor: COLOURS.white,
        position: 'relative',
      }}>
      <ScrollView>
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            paddingTop: 40,
            paddingHorizontal: 16,
            justifyContent: 'left',
            alignItems: 'center',
          }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <MaterialCommunityIcons
              name="chevron-left"
              style={{
                fontSize: 25,
                color: COLOURS.backgroundDark,
                padding: 12,
                backgroundColor: COLOURS.white,
                borderRadius: 12,
              }}
            />
          </TouchableOpacity>
          <Text
            style={{
              fontSize: 18,
              color: COLOURS.black,
              fontWeight: '500',
              letterSpacing: 1,
              paddingTop: 10,
              marginBottom: 10,
            }}>
            Return
          </Text>
        </View>
          <Text
            style={{
              fontSize: 20,
              color: COLOURS.black,
              fontWeight: '500',
              letterSpacing: 1,
              paddingTop: 10,
              paddingLeft: 16,
              marginBottom: 10,
            }}>
            My Cart
          </Text>
        
        <View style={{paddingHorizontal: 16}}>
          {products ? products.map(renderProducts) : <Text style={{fontSize: 16,
              color: COLOURS.black,
              fontWeight: '400',
              letterSpacing: 1,
              paddingTop: 10,
              marginBottom: 10,}}>No products added.</Text>}
        </View>
        <View>
          <View
            style={{
              paddingHorizontal: 16,
              marginVertical: 10,
            }}>
              <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                <Text
                  style={{
                    fontSize: 16,
                    color: COLOURS.black,
                    fontWeight: '500',
                    letterSpacing: 1,
                    marginBottom: 20,
                  }}>
                  Delivery Location
                </Text>
                {products && <TouchableOpacity onPress={clearCart}>
                  <Text style={{
                    fontSize: 16,
                    color: COLOURS.blue,
                    fontWeight: '500',
                    marginBottom: 20,
                  }}>Clear Cart</Text>
                </TouchableOpacity>}
                
              </View>
            
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
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
                    borderRadius: 10,
                    marginRight: 18,
                  }}>
                  <MaterialCommunityIcons
                    name="truck-delivery-outline"
                    style={{
                      fontSize: 18,
                      color: COLOURS.blue,
                    }}
                  />
                </View>
                <View>
                  <Text
                    style={{
                      fontSize: 14,
                      color: COLOURS.black,
                      fontWeight: '500',
                    }}>
                    TO BE DONE AFTER LOGIN PAGE
                  </Text>
                  <Text
                    style={{
                      fontSize: 12,
                      color: COLOURS.black,
                      fontWeight: '400',
                      lineHeight: 20,
                      opacity: 0.5,
                    }}>
                    User will add its address for delivery
                  </Text>
                </View>
              </View>
              
            </View>
          </View>
          <View
            style={{
              paddingHorizontal: 16,
              marginVertical: 10,
            }}>
            <Text
              style={{
                fontSize: 16,
                color: COLOURS.black,
                fontWeight: '500',
                letterSpacing: 1,
                marginBottom: 20,
              }}>
              Payment Method
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
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
                    borderRadius: 10,
                    marginRight: 18,
                  }}>
                  <Text
                    style={{
                      fontSize: 10,
                      fontWeight: '900',
                      color: COLOURS.blue,
                      letterSpacing: 1,
                    }}>
                    VISA
                  </Text>
                </View>
                <View>
                  <Text
                    style={{
                      fontSize: 14,
                      color: COLOURS.black,
                      fontWeight: '500',
                    }}>
                    Visa Classic
                  </Text>
                  <Text
                    style={{
                      fontSize: 12,
                      color: COLOURS.black,
                      fontWeight: '400',
                      lineHeight: 20,
                      opacity: 0.5,
                    }}>
                    ****-9999
                  </Text>
                </View>
              </View>
              <MaterialCommunityIcons
                name="chevron-right"
                style={{fontSize: 22, color: COLOURS.black}}
              />
            </View>
          </View>
          <View
            style={{
              paddingHorizontal: 16,
              marginTop: 10,
              marginBottom: 80,
            }}>
            <Text
              style={{
                fontSize: 16,
                color: COLOURS.black,
                fontWeight: '500',
                letterSpacing: 1,
                marginBottom: 20,
              }}>
              Order Info
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: 8,
              }}>
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: '400',
                  maxWidth: '80%',
                  color: COLOURS.black,
                  opacity: 0.5,
                }}>
                Subtotal
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: '400',
                  color: COLOURS.black,
                  opacity: 0.8,
                }}>
                RON{totalCost}.00
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: 22,
              }}>
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: '400',
                  maxWidth: '80%',
                  color: COLOURS.black,
                  opacity: 0.5,
                }}>
                Shipping Tax
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: '400',
                  color: COLOURS.black,
                  opacity: 0.8,
                }}>
                RON{(totalCost*1/100)}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: '400',
                  maxWidth: '80%',
                  color: COLOURS.black,
                  opacity: 0.5,
                }}>
                Total
              </Text>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: '500',
                  color: COLOURS.black,
                }}>
                RON{totalCost + totalCost*1/100}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>

      <View
        style={{
          position: 'absolute',
          bottom: 30,
          height: '8%',
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <TouchableOpacity
          onPress={() => (totalCost != 0 ? checkOut() : null)}
          
          style={{
            width: '86%',
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
            CHECKOUT (RON {totalCost + totalCost*1/100} )
     
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default Cart