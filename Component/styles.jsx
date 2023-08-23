import { StyleSheet, Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },

  searchProduct: {
    width: '100%',
    padding: 10,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 20,
  },

  productContainer: {
    width: screenWidth / 2 - 20,
    alignItems: 'center',
    marginBottom: 20,
    marginRight: 10,
  },

  imageContainer: {
    position: 'relative',
    width: '100%',
  },

  productImage: {
    width: '100%',
    height: 100,
    marginBottom: 10,
  },

  productName: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
    paddingVertical: 5,
  },

  shoppingContainer: {
    backgroundColor: 'gainsboro',
    padding: 10,
    borderRadius: 5,
  },


  backgroundContainer: {
    backgroundColor: 'white', 
  },
});