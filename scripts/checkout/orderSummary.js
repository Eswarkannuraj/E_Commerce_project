import { cart, removeFromCart, calculateCartQuantity, updateQuantity, updateDeliveryOption } from '../../data/cart.js';
import { products ,getProduct} from '../../data/products.js';
import { formatCurrency } from '../utils/money.js';
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';
import { deliveryOptions ,getDeliveryOption,calculateDeliveryDate} from '../../data/deliveryOptions.js';
import { renderPaymentSummary } from './paymentSummary.js';
import{renderCheckoutHeader} from './checkoutHeader.js';


export function renderorderSummary() {
  let cartSummaryHTML = '';

  cart.forEach((cartItem) => {

    const productId = cartItem.productId;
    const matchingProduct = getProduct(productId);

    const deliveryOptionId = cartItem.deliveryOptionId;

    const deliveryOption = getDeliveryOption(deliveryOptionId);

    const dateString=calculateDeliveryDate(deliveryOption);

    cartSummaryHTML +=
      `
    <div class="cart-item-container 
    js-cart-item-container js-cart-item-container-${matchingProduct.id}">
      <div class="delivery-date">
        Delivery date:${dateString}
      </div>

      <div class="cart-item-details-grid">
        <img class="product-image" src="${matchingProduct.image}">

        <div class="cart-item-details">
          <div class="product-name js-product-name-${matchingProduct.id}">
          ${matchingProduct.name}
          </div>
          <div class="product-price js-product-price-${matchingProduct.id}">
            $${formatCurrency(matchingProduct.priceCents)}
          </div>
          <div class="product-quantity js-product-quantity-${matchingProduct.id}">
            <span>
              Quantity: <span class="quantity-label js-quantity-label-${matchingProduct.id}">${cartItem.quantity}</span>
            </span>
            <span class="update-quantity-link link-primary  js-update-quantity-link" data-product-id="${matchingProduct.id}">
              Update
            </span>
            <input class="quantity-input js-quantity-input-${matchingProduct.id}" data-Product-id="${matchingProduct.id}">
            <span class="save-quantity-link link-primary js-save-quantity-link"data-Product-id="${matchingProduct.id}">Save</span>
            <span class="delete-quantity-link link-primary             js-delete-link
            js-delete-link-${matchingProduct.id}" 
            data-product-id="${matchingProduct.id}">
              Delete
            </span>
          </div>
        </div>

        <div class="delivery-options">
          <div class="delivery-options-title">
            Choose a delivery option:
          </div>
          ${deliveryOptionsHTML(matchingProduct, cartItem)}
        </div>
      </div>
    </div>
  `;
  });

  function deliveryOptionsHTML(matchingProduct, cartItem) {

    let html = '';
    deliveryOptions.forEach((deliveryOption) => {

      calculateDeliveryDate(deliveryOption);
      const dateString=calculateDeliveryDate(deliveryOption);

      const priceString = deliveryOption.priceCents === 0 ? 'Free' : `$${formatCurrency(deliveryOption.priceCents)} `;

      const isChecked = deliveryOption.id === cartItem.deliveryOptionId;

      html +=

        `<div class="delivery-option js-delivery-option" data-product-id =   "${matchingProduct.id}" data-delivery-option-id="${deliveryOption.id}">
      <input type="radio" ${isChecked ? 'checked' : ''}
      class="delivery-option-input " name="delivery-option-${matchingProduct.id}">
      <div>
        <div class="delivery-option-date">
          ${dateString}
        </div>
        <div class="delivery-option-price">
          ${priceString} Shipping
        </div>
      </div>
    </div>
    `
    });
    return html;
  }

  document.querySelector('.js-order-summary').innerHTML = cartSummaryHTML;


  document.querySelectorAll('.js-delete-link')
    .forEach((link) => {
      link.addEventListener('click', () => {
        const productId = link.dataset.productId;
        removeFromCart(productId);
        renderCheckoutHeader();
        renderPaymentSummary();  
        renderorderSummary();
        // updateCartQuantity();
      });
    });

    

  document.querySelectorAll('.js-delivery-option')
    .forEach((element) => {
      element.addEventListener('click', () => {
        //shorthand property to access the data attribute
        const { productId, deliveryOptionId } = element.dataset;
        // or use general way to access data attribute
        //const productId=element.dataset.productId;
        // const deliveryOptionId=element.dataset.deliveryOptionId
        updateDeliveryOption(productId, deliveryOptionId);
        renderorderSummary();

      })
    })

  function updateCartQuantity() {
    const cartQuantity = calculateCartQuantity();

    const cq = document.querySelector('.js-return-to-home-link')
    if (!cq) {
      return;
    } 
    if(cartQuantity){
      cq.innerHTML='';
    }
    else {
      cq.innerHTML = `${cartQuantity}items`;
    }
  }
  updateCartQuantity();

  document.querySelectorAll('.js-update-quantity-link')
    .forEach((updateId) => {
      updateId.addEventListener('click', () => {
        const productId = updateId.dataset.productId;

        const container = document.querySelector(`.js-cart-item-container-${productId}`);
        container.classList.add('is-editing-quantity');
      });
    })

  document.querySelectorAll('.js-save-quantity-link')
    .forEach((saveId) => {
      saveId.addEventListener('click', () => {
        let productId = saveId.dataset.productId;
        quantityUpdater(productId);
      });
    });

  document.querySelectorAll('.quantity-input')
    .forEach((enterId) => {
      enterId.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
          let productId = enterId.dataset.productId;
          quantityUpdater(productId);
        }
      })
    })

  function quantityUpdater(productId) {
    const quantityInput = document.querySelector(`.js-quantity-input-${productId}`);
    const newQuantity = Number(quantityInput.value);
    if (newQuantity < 0 || newQuantity >= 1000) {
      alert('quantity must be between 0 and 1000');
      return;
    }
    updateQuantity(productId, newQuantity);

    const container = document.querySelector(`.js-cart-item-container-${productId}`);
    container.classList.remove('is-editing-quantity');

    renderCheckoutHeader();
    renderPaymentSummary();
    renderorderSummary();
  };
}


