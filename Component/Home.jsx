import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Image, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import styles from './styles';
import Products from './Products';
import Cart from './Cart';
import _, {debounce} from 'lodash';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { I18n } from "i18n-js";
import translations from "./translation.json";
const i18n = new I18n(translations);
import * as Localization from 'expo-localization';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [productSelection, setProductSelection] = useState(null);
  const [loader, setLoader] = useState(true);
  const [cart, setCart] = useState([]);
  const [cartScreenVisible, setCartScreenVisible] = useState(false);

  useEffect(() => {
    fetchProductsInfo();
    _retrieveData();

  }, []);

  i18n.locale = Localization.locale;

  _retrieveData = async () => {
    try {
      const cartInfo = await AsyncStorage.getItem('cart');
      if (cartInfo) {
        const cartItems = JSON.parse(cartInfo);
        setCart(cartItems);
      }
    } catch (error) {
      alert('Error at Loading Cart Info', error);
    }
  };
  
  async function fetchProductsInfo() {
    try {
      setLoader(true);
      const response = await fetch('https://dummyapi.online/api/products');
      const data = await response.json();
      setProducts(data);
      setLoader(false);
    } catch (error) {
      alert('Error Fetching Products');
      setLoader(false);
    }
  }

  const results = products.filter(product =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );
  
  const handleAddToCart = async (product) => {
    const cartUpdating = [...cart]; 
    
    const cartIndex = cartUpdating.findIndex(item => item.id === product.id);
    
    if (cartIndex !== -1) {
      cartUpdating[cartIndex].quantity += product.quantity;
    } else {
      cartUpdating.push({ ...product });
    } 
    setCart(cartUpdating);
    setProductSelection(null);

    try {
      await AsyncStorage.setItem('cart', JSON.stringify(cartUpdating));
    } catch (error) {
      alert('Error at Saving Cart Info', error);
    }
    
  };
  
  const updateQuantity = (product, change) => {
    const cartUpdating = cart.map(item =>
      item.id === product.id ? { ...item, quantity: Math.max(item.quantity + change, 1) } : item
      );
    setCart(cartUpdating);
  };
  

  const debouncedSearch = debounce((text) => {
    setSearch(text);}, 300); 
  

  return (
    <View style={[styles.container, styles.backgroundContainer]}>
    {loader ? (
        <ActivityIndicator size="large" color="blue" marginBottom="40" />
      ) : (
        <>

    <TextInput
          style={styles.searchProduct}
          placeholder= {i18n.t('search')}
          onChangeText={(text) => debouncedSearch(text)}
          value={search}
    />
            
    <FlatList
          data={results}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => setProductSelection(item)}>
              <View style={styles.productContainer}>
                <View style={styles.imageContainer}>
                  <Image source={{ uri: item.image }} style={styles.productImage} />
                  <Text style={styles.productName}>{item.name}</Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
          numColumns={2}
      />

      {productSelection && (
        <Products
          product={productSelection}
          onClose={() => setProductSelection(null)}
          addToCart={handleAddToCart}
          updateQuantity={updateQuantity}        
        />
      )}

      <View style={styles.shoppingContainer}>
        <TouchableOpacity
          onPress={() => setCartScreenVisible(true)}
          style={styles.cartButton}
        >
          <Text style={styles.cartButtonText}>{i18n.t('shoppingCart')}</Text>
        </TouchableOpacity>
      </View>
    
      {cartScreenVisible && (
        <Cart cart={cart} onClose={() => setCartScreenVisible(false)} updateQuantity={updateQuantity} />
        
        )}
        </>
      )}
    </View>
  );
};

export default Home;