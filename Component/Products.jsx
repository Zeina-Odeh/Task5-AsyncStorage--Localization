import React, { useState } from 'react';
import { View, Text, Image, Modal, TouchableOpacity, StyleSheet } from 'react-native';
import { I18n } from "i18n-js";
import translations from "./translation.json";
const i18n = new I18n(translations);
import * as Localization from 'expo-localization';

const Products = ({ product, onClose, addToCart }) => {
  i18n.locale = Localization.locale;

  const [quantity, setQuantity] = useState(1);

  const increment = () => {
    setQuantity(quantity + 1);
  };

  const decrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const updateAddToCart = () => {
    const updatedProduct = { ...product, quantity };
    addToCart(updatedProduct);
   
  };

  return (
    <Modal transparent={true} animationType="fade">
      <View style={styles.modalContainer}>
        <View style={styles.productContainer}>
          <Text style={styles.productName}>{i18n.t('name')} {product.name}</Text>
          <Text style={styles.productId}>{i18n.t('id')} {product.id}</Text>
          <Text style={styles.productPrice}>{i18n.t('price')} {product.price}</Text>
          <Text style={styles.productDescription}>{i18n.t('description')} {product.description}</Text>
          <Image source={{ uri: product.image }} style={styles.productImage} />

          <View style={styles.quantityContainer}>
            <TouchableOpacity onPress={decrement} style={styles.quantityButton}>
              <Text>-</Text>
            </TouchableOpacity>
            <Text style={styles.quantityText}>{quantity}</Text>
            <TouchableOpacity onPress={increment} style={styles.quantityButton}>
              <Text>+</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            onPress={updateAddToCart}
            style={[styles.addToCartButton]}
          >
            <Text style={styles.addToCartButtonText}>
              {i18n.t('addToCart')}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Text style={styles.closeText}>{i18n.t('close')}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  
  productContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },

  productImage: {
    width: 200,
    height: 200,
    marginBottom: 5,
  },

  productName: {
    fontSize: 18,
    marginBottom: 10,
  },

  productId: {
    fontSize: 16,
    marginBottom: 5,
    color: '#666',
  },

  productPrice: {
    fontSize: 16,
    marginBottom: 5,
    color: 'green',
  },

  productDescription: {
    fontSize: 14,
    marginBottom: 10,
  },

  closeButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: 'gray',
    borderRadius: 5,
  },

  closeText: {
    color: 'white',
    fontWeight: 'bold',
  },

  addedToCartButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#f3f3f4',
    borderRadius: 5,
  },

  addToCartButtonText: {
    color: 'black',
    fontWeight: 'bold',
  },

  addToCartButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#9fbca2',
    borderRadius: 5,
  },

  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },

  quantityButton: {
    paddingHorizontal: 15,
    paddingVertical: 5,
    marginTop: 10,
    backgroundColor: '#d3d3c4a2',
    borderRadius: 5,
  },
 
  quantityText: {
    fontSize: 18,
    marginHorizontal: 10,
  },
});

export default Products;