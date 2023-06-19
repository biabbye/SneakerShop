import { View, Text,ScrollView,TouchableOpacity,Image,StatusBar,StyleSheet,TextInput} from 'react-native'
import React,{useState,useEffect} from 'react'
import { COLOURS } from '../constants'
import { Products } from '../Database/Database'
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import ProductCard from '../components/ProductCard';

const Home = ({navigation}) => {

    const [productsData, setProductsData] =  useState(null);

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
                getDataFromDatabase();
        });
        
        console.log(productsData);
        return unsubscribe;
    },[navigation]);

    const getDataFromDatabase = () => {
        let productList = [];
        for (let index = 0; index < Products.length; index++) {
              productList.push(Products[index]);
          }
      
          setProductsData(productList);
    }

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={COLOURS.white} barStyle="dark-content" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.headerBar}>
            <View style={styles.usernameContainer}>
                <View style={{flexDirection:'row', paddingTop:10}}>
                    <View style={styles.usernameIconContainer}>
                        <Text style={styles.usernameIconText}>B</Text>
                    </View>
                    <Text style={styles.greetingText}>Hello Bianca</Text>
                </View>
                
                <Text style={styles.greetingDescription}>Find the perfect sneakers for you</Text>
            </View>
          
          <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
            <MaterialCommunityIcons
              name="cart"
              style={styles.headerRightIcon}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.searchContainer}>
            <View style={styles.searchWrapper}>
                <TextInput
                    style={styles.searchInput}
                    placeholder='What are you looking for?'
                />
            </View>

            <TouchableOpacity style={styles.searchBtn}>
                <Image
                    source={require('../Database/products/search.png')}
                    resizeMode='contain'
                    style={styles.searchBtnImage}
                />
            </TouchableOpacity>
        </View>
        <View
          style={{
            marginBottom: 10,
            padding: 16,
          }}>
          <Text
            style={{
              fontSize: 26,
              color: COLOURS.black,
              fontWeight: '500',
              letterSpacing: 1,
              marginBottom: 10,
            }}>
            Sneakers Outlet
          </Text>
          <Text
            style={{
              fontSize: 14,
              color: COLOURS.black,
              fontWeight: '400',
              letterSpacing: 1,
              lineHeight: 24,
            }}>
            Sneakers shop on Bulevardul Unirii Nr 1.
            {'\n'}This shop offers the best value for the most famous sneakers.
          </Text>
        </View>
        <View
          style={{
            padding: 16,
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontSize: 18,
                  color: COLOURS.black,
                  fontWeight: '500',
                  letterSpacing: 1,
                }}>
                Shoes
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  color: COLOURS.black,
                  fontWeight: '400',
                  opacity: 0.5,
                  marginLeft: 10,
                }}>
                {/* {productsData != null && productsData.length} */}
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: 'space-around',
            }}>
            {productsData !=null && productsData.map(item => {
              return <ProductCard item={item} key={item.id} navigation={navigation} />;
            })}
          </View>
        </View>
      </ScrollView>
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
    container: {
      flex:1,
      backgroundColor: COLOURS.white,
      
    },
    headerBar: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems:'center',
        paddingHorizontal: 16,
        paddingVertical:16,
        marginBottom:-10,
        marginTop:35
    },
    headerRightIcon:{
        fontSize: 18,
        color: COLOURS.backgroundMedium,
        padding: 12,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: COLOURS.backgroundLight,
    },
    usernameContainer: {
    
    },
    greetingText: {
        fontSize: 24,
        color: COLOURS.black,
        fontWeight: '500',
        letterSpacing: 1,
        marginBottom: 10,
      },
      greetingDescription: {
        fontSize: 18,
        color: COLOURS.black,
        fontWeight: '400',
        letterSpacing: 0.5,
        marginBottom: 5,
      },
      usernameIconContainer: {
        width: 26,
        height: 26,
        borderRadius: 13,
        backgroundColor: 'grey',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 5,
      },
      usernameIconText: {
        fontSize: 16,
        color: 'white',
        fontWeight: 'bold',
      },
      searchContainer: {
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        marginTop: 20,
        height: 50,
      },
      searchWrapper: {
        flex: 1,
        backgroundColor: COLOURS.backgroundLight,
        marginRight: 10,
        marginLeft:8,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 16,
        height: "100%",
      },
      searchInput: {
        fontSize: 18,
        fontWeight: '400',
        width: "100%",
        height: "100%",
        paddingHorizontal: 16,
      },
      searchBtn: {
        width: 50,
        height: "100%",
        backgroundColor: COLOURS.backgroundLight,
        borderRadius: 16,
        marginRight:10,
        justifyContent: "center",
        alignItems: "center",
      },
      searchBtnImage: {
        width: "50%",
        height: "50%",
        tintColor: COLOURS.backgroundMedium,
      },
      
  });




  {/* <View
          style={{
            padding: 16,
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontSize: 18,
                  color: COLOURS.black,
                  fontWeight: '500',
                  letterSpacing: 1,
                }}>
                Accessories
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  color: COLOURS.black,
                  fontWeight: '400',
                  opacity: 0.5,
                  marginLeft: 10,
                }}>
                78
              </Text>
            </View>
            <Text
              style={{
                fontSize: 14,
                color: COLOURS.blue,
                fontWeight: '400',
              }}>
              SeeAll
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: 'space-around',
            }}>
            {accessory.map(data => {
              return <ProductCard data={data} key={data.id} />;
            })}
          </View>
        </View> */}

