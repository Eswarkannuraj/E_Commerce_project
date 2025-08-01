import { validDeliveryoptionId } from "./deliveryOptions.js";

function Cart(localStorageKey) {

  const cart = {
    cartItems: undefined,

    //below is a function named loadfromstorage
    loadFromStorage() {
      this.cartItems = JSON.parse(localStorage.getItem('localStorageKey'));

      if (!this.cartItems) {
        this.cartItems = [{
          productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
          quantity: 2,
          deliveryOptionId: '1'
        }, {
          productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
          quantity: 1,
          deliveryOptionId: '2'
        }];
      };
    },

    //below is a function named savetostorage
    saveToStorage() {
      localStorage.setItem(localStorageKey, JSON.stringify(this.cartItems));
    },

    addToCart(productId) {
      let matchingItem;

      this.cartItems.forEach((cartItem) => {
        if (productId === cartItem.productId) {
          matchingItem = cartItem;
        }
      });

      if (matchingItem) {
        matchingItem.quantity += 1;
      } else {
        this.cartItems.push({
          productId: productId,
          quantity: 1,
          deliveryOptionId: '1'
        });
      }
      this.saveToStorage();// to access the function(savetostorage) which is inside a object
    },

    removeFromCart(productId) {
      const newCart = [];
      this.cartItemst.forEach((cartItem) => {
        if (cartItem.productId !== productId) {
          newCart.push(cartItem);
        }
      });
      this.cartItems = newCart;
      this.saveToStorage();// to access the function(savetostorage) which is inside a object
    },

    updateDeliveryOption(productId, deliveryOptionId) {
      let matchingItem;

      this.cartItems.forEach((cartItem) => {
        if (productId === cartItem.productId) {
          matchingItem = cartItem;
        }
      });

      if (!matchingItem) {
        return;
      }

      if (!validDeliveryoptionId(deliveryOptionId)) {
        return;
      }
      matchingItem.deliveryOptionId = deliveryOptionId;

      this.saveToStorage();
    },

    calculateCartQuantity() {
      let cartQuantity = 0;

      this.cartItems.forEach((cartItem) => {
        cartQuantity += cartItem.quantity;
      });
      return cartQuantity;
    },


    updateQuantity(productId, newQuantity) {
      let matchingItem;

      this.cartItems.forEach((cartItem) => {
        if (productId === cartItem.productId) {
          matchingItem = cartItem;
        }
      });

      matchingItem.quantity = newQuantity;
      this.saveToStorage();
    }
  };

  return cart;
}

const cart = Cart('cart-oop');
const buisnessCart = Cart('cart-buisness');

cart.loadFromStorage();
buisnessCart.loadFromStorage();

console.log(cart)
console.log(buisnessCart)
















