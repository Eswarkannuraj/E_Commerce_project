import { getProduct , loadProductsFetch } from '../data/products.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import {getOrder} from '../data/orders.js';


async function renderTrackPage(){

  await loadProductsFetch();

  const url = new URL(window.location.href);
  const orderId = url.searchParams.get('orderId');
  const productId = url.searchParams.get('productId');

  // to checkOrder -> it[getOrder()] check all orders and finds the one that matches the orderId from url
  const order = getOrder(orderId);
  const product = getProduct(productId);

  // tocheckProducts -> it checks all products inside the order and finds one that matches the productid from url
  let productDetails;
  order.products.forEach((product) => {
    if(product.productId === productId){
      productDetails = product
    }
  });

  // here estimateddeliverytime is from the orderlist that is from backend when using the orders in data/order.js
  let date = dayjs(productDetails.estimatedTimeDelivery).format('dddd, MMMM D')


  let trackingPage = 
       `
      <div class="order-tracking">
        <a class="back-to-orders-link link-primary" href="orders.html">
          View all orders
        </a>
  
        <div class="delivery-date">
          Arriving on ${date}
        </div>
  
        <div class="product-info">
          ${product.name}
        </div>
  
        <div class="product-info">
          Quantity: ${productDetails.quantity}
        </div>
  
        <img class="product-image" src="${product.image}">
  
        <div class="progress-labels-container">
          <div class="progress-label">
            Preparing
          </div>
          <div class="progress-label current-status">
            Shipped
          </div>
          <div class="progress-label">
            Delivered
          </div>
        </div>
  
        <div class="progress-bar-container">
          <div class="progress-bar"></div>
        </div>
      </div>
    `;
document.querySelector('.js-main').innerHTML = trackingPage;
}
renderTrackPage();