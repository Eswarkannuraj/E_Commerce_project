import { renderorderSummary } from './checkout/orderSummary.js';
import { renderPaymentSummary } from './checkout/paymentSummary.js';
import { renderCheckoutHeader } from './checkout/checkoutHeader.js'
import { loadProductsFetch } from '../data/products.js';
import { loadCart } from '../data/cart.js';
// import'../data/cart-class.js';
// import'../data/car.js';
// import '../data/backend-practice.js'


// promise.all runs both "promise" at same time and moves to then if both are completed which is done by "resolve"
Promise.all([
  
  loadProductsFetch(),
  // instead of below promise ,we use a fetch function (loadProductsFetch) that returns a promise 

  /*
  new Promise((resolve) => {
    loadProducts(() => { 
      resolve('value1'); 
    });
  }),*/

  new Promise((resolve) => {
    loadCart(() => { 
      resolve(); 
    });
  })
]).then((values) => {
  console.log(values)
  renderCheckoutHeader();
  renderorderSummary();
  renderPaymentSummary();
});

/*
new Promise((resolve) => {
  loadProducts(() => { // first wait till the products gets loaded
    resolve('value1'); // now move the next set of code
  });
})

  .then((value) => {
    console.log(value);

    return new Promise((resolve) => {
      loadCart(() => { // another promise to wait till the cart gets loaded
        resolve(); // now move the next set of code
      });
    });
  })

  .then(() => {  // now render the  page
    renderCheckoutHeader();
    renderorderSummary();
    renderPaymentSummary();
  });

*/

/* 
loadProducts(() => {
  loadCart(() => {
    renderCheckoutHeader();
    renderorderSummary();
    renderPaymentSummary();
  });
});
*/