import { getProduct, loadProductsFetch } from '../data/products.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { getOrder } from '../data/orders.js';


async function renderTrackPage() {

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
    if (product.productId === productId) {
      productDetails = product
    }
  });

  // here estimateddeliverytime is from the orderlist that is from backend when using the orders in data/order.js
  let date = dayjs(productDetails.estimatedDeliveryTime).format('dddd, MMMM D')

  let orderTime = dayjs(order.orderTime);
  let deliveryTime = dayjs(productDetails.estimatedDeliveryTime);
  let currentTime = dayjs();
  const trackPercent = ((currentTime - orderTime) / (deliveryTime - orderTime)) * 100;

  function shippingStatus() {

    if (trackPercent< 50 ) {
      document.querySelector('.js-progress-label-1').classList.add('current-status');
    }else if(trackPercent > 50 && trackPercent <99){
      document.querySelector('.js-progress-label-2').classList.add('current-status');
    }else{
      document.querySelector('.js-progress-label-3').classList.add('current-status');
    }
  }

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
          <div class="progress-label js-progress-label-1">
            Preparing
          </div>
          <div class="progress-label  js-progress-label-2">
            Shipped
          </div>
          <div class="progress-label js-progress-label-3">
            Delivered
          </div>
        </div>
  
        <div class="progress-bar-container">
          <div class="progress-bar " style = "width:${trackPercent}%" ></div>
        </div>
      </div>
    `;
  document.querySelector('.js-main').innerHTML = trackingPage;

  shippingStatus();
}
renderTrackPage();

