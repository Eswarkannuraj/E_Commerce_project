import { cart,} from '../../data/cart-class.js';

describe('test suite: addToCart', () => {

  beforeEach(() => {

    spyOn(localStorage, 'setItem');
  });

  it('adds an existing product to cart', () => {

    cart.cartItems = [{
      productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
      quantity: 1,
      deliveryOptionId: '1'
    }];

    cart.addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart.cartItems.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(cart.cartItems[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart.cartItems[0].quantity).toEqual(2);
    expect(localStorage.setItem).toHaveBeenCalledWith('cart-oop', JSON.stringify([{
      productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
      quantity: 2,
      deliveryOptionId: '1'
    }]));
  });

  it('adds an new product to cart', () => {

    cart.cartItems = [];


    cart.addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart.cartItems.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(cart.cartItems[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart.cartItems[0].quantity).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledWith('cart-oop', JSON.stringify([{
      productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
      quantity: 1,
      deliveryOptionId: '1'
    }]));
  });
});

describe('test suite: removeFromCart', () => {

  beforeEach(() => {

    spyOn(localStorage, 'setItem');
  });

  it('remove a product from cart', () => {
      cart.cartItems = [{
        productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 1,
        deliveryOptionId: '1'
      }];

    cart.removeFromCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart.cartItems.length).toEqual(0);
    expect(localStorage.setItem).toHaveBeenCalledWith('cart-oop', JSON.stringify([]));
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
  });

  it('does nothing if a product is not in cart', () => {
      cart.cartItems = [{
        productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 1,
        deliveryOptionId: '1'
      }];

    cart.removeFromCart('does not exist');
    expect(cart.cartItems.length).toEqual(1);
    expect(cart.cartItems[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart.cartItems[0].quantity).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledWith('cart-oop',
      JSON.stringify([{
        productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 1,
        deliveryOptionId: '1'
      }]));
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
  });
})

describe('test suite: updateDeliveryOption', () => {
  beforeEach(() => {
    spyOn(localStorage, 'setItem');
  });

  it('updates delivery Options', () => {
      cart.cartItems =[{
        productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 1,
        deliveryOptionId: '1'
      }];
    

    cart.updateDeliveryOption('e43638ce-6aa0-4b85-b27f-e1d07eb678c6', '3');
    expect(cart.cartItems.length).toEqual(1);
    expect(cart.cartItems[0].deliveryOptionId).toEqual('3');
    expect(cart.cartItems[0].quantity).toEqual(1);
    expect(cart.cartItems[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(localStorage.setItem).toHaveBeenCalledWith('cart-oop',
      JSON.stringify([{
        productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 1,
        deliveryOptionId: '3'
      }]));
  });

  it('does nothing if product is not in cart', () => {
      cart.cartItems =[{
        productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 1,
        deliveryOptionId: '1'
      }];

    cart.updateDeliveryOption('does not exist', '3');
    expect(cart.cartItems.length).toEqual(1);
    expect(cart.cartItems[0].deliveryOptionId).toEqual('1');
    expect(cart.cartItems[0].quantity).toEqual(1);
    expect(cart.cartItems[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(localStorage.setItem).toHaveBeenCalledTimes(0);
  });


  it('does nothing if deliveryOption doesnot exist', () => {
      cart.cartItems = [{
        productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 1,
        deliveryOptionId: '1'
      }];

    cart.updateDeliveryOption('e43638ce-6aa0-4b85-b27f-e1d07eb678c6', 'does not exist');
    expect(cart.cartItems.length).toEqual(1);
    expect(cart.cartItems[0].deliveryOptionId).toEqual('1');
    expect(cart.cartItems[0].quantity).toEqual(1);
    expect(cart.cartItems[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(localStorage.setItem).toHaveBeenCalledTimes(0);
  });
});