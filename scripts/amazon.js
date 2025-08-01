import { cart } from '../data/cart-class.js';

import { products, loadProductsFetch } from '../data/products.js';

updateCartQuantity();

async function loadAmazonPage() {
  await loadProductsFetch();
  renderProductsGrid();
}

loadAmazonPage();

function renderProductsGrid() {

  let productsHTML = '';

  const url = new URL(window.location.href);
  const searchFilter = url.searchParams.get('search');

  // If a search exists in the URL parameters,
  // filter the products that match the search.

  let filteredProducts = products;
  if(searchFilter){
    filteredProducts = products.filter((product)=>{
      return product.name.toLowerCase().includes(searchFilter) ||
      product.keywords.includes(searchFilter);
    })
  }
    filteredProducts.forEach((products) => {

    productsHTML += ` 
    <div class="product-container">
      <div class="product-image-container">
        <img class="product-image"
          src="${products.image}">
      </div>

      <div class="product-name limit-text-to-2-lines">
        ${products.name}
      </div>

      <div class="product-rating-container">
        <img class="product-rating-stars"
          src="${products.getStarsUrl()}">
        <div class="product-rating-count link-primary">
          ${products.rating.count}
        </div>
      </div>

      <div class="product-price">
        ${products.getPrice()}
      </div>

      <div class="product-quantity-container">
        <select>
          <option selected value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
        </select>
      </div>

      ${products.extraInfoHTML()}

      <div class="product-spacer"></div>

      <div class="added-to-cart">
        <img src="images/icons/checkmark.png">
        Added
      </div>

      <button class="add-to-cart-button button-primary js-add-to-cart" 
      data-product-id="${products.id}">
        Add to Cart
      </button>
    </div>
  `;

  });
  console.log(productsHTML);

  document.querySelector('.js-products-grid').innerHTML = productsHTML;

  document.querySelectorAll('.js-add-to-cart')
    .forEach((button) => {
      button.addEventListener('click', () => {
        const productId = button.dataset.productId;

        cart.addToCart(productId);

        updateCartQuantity();

      });
    });
}

document.querySelector('.js-search-button').addEventListener('click', () => {
  //to save the value from input tag(ie...js-search-bar)
  const searchValue = document.querySelector('.js-search-bar').value.toLowerCase();
  //to redirect to origin page with the saved value
  window.location.href = `index.html?search=${searchValue}`;
})

function updateCartQuantity() {
  const cartQuantity = cart.calculateCartQuantity();//calculateCartQuantity() from the cart-class.js

  document.querySelector('.js-cart-quantity').innerHTML = cartQuantity;
};
updateCartQuantity();


