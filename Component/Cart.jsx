import React from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, StyleSheet, Modal } from 'react-native';
import { I18n } from "i18n-js";
import translations from "./translation.json";
const i18n = new I18n(translations);
import * as Localization from 'expo-localization';

const ShoppingCart = ({ cart, onClose, updateQuantity }) => {
  
  i18n.locale = Localization.locale;

  let totalPrice = 0;

  for (const item of cart) {
    totalPrice += item.price * item.quantity;
  }

  return (
  <Modal transparent={true} animationType="none">
  <View style={styles.modalContainer}>
      <View style={styles.cartContainer}>
        <Text style={styles.cartTitle}>{i18n.t('shoppingCart')}</Text>
        <FlatList
          data={cart}
          renderItem={({ item }) => (
            <View style={styles.cartItem}>
            <View style={styles.cartItemImageContainer}>
              <Image source={{ uri: item.image }} style={styles.cartItemImage} />
            </View>
              <View style={styles.cartItemDetails}>
                <Text>{i18n.t('name')} {item.name}</Text>
                <Text>{i18n.t('price')} {item.price}</Text>
                <Text>{i18n.t('description')} {item.description}</Text>

                <View style={styles.quantityContainer}>
                      <TouchableOpacity onPress={() => updateQuantity(item, -1)} style={styles.quantityButton}>
                        <Text>-</Text>
                      </TouchableOpacity>
                      <Text>{item.quantity}</Text>
                      <TouchableOpacity onPress={() => updateQuantity(item, 1)} style={styles.quantityButton}>
                        <Text>+</Text>
                      </TouchableOpacity>
                </View>
              </View>
            </View>
          )}
        />

        <Text style={styles.totalText}>{i18n.t('total')} {totalPrice}</Text>
        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
          <Text style={styles.closeText}>{i18n.t('close')}</Text>
        </TouchableOpacity>
        
      </View>
  </View>
  </Modal>
  );
};


const styles = StyleSheet.create ({
  
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },

  cartContainer: {
    backgroundColor: 'white',
    padding: 20,
    flex: 1,
    width: '100%',

  },

  closeButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: 'gray',
    borderRadius: 5,
    alignItems: 'center',
  },

  closeText: {
    color: 'white',
    fontWeight: 'bold',
  },

  cartItem: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },

  cartItemImageContainer: {
    width: '30%',
    paddingRight: 10,
  },

  cartItemImage: {
    width: '100%',
    height: 80,
  },

  cartItemDetails: {
    flex: 1,
    justifyContent: 'center',
  },

  cartTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },

  totalText: {
    marginRight: 5,
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },

  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },

  quantityButton: {
    paddingHorizontal: 10,
    backgroundColor: '#d3d3c4a2',
    borderRadius: 5,
    marginLeft: 5,
    marginRight: 5,
  },

});

export default ShoppingCart;