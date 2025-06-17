import { formatCurrency } from '../scripts/utils/money.js'

export function getProduct(productId) {
  let matchingProduct;

  products.forEach((product) => {
    if (product.id === productId) {
      matchingProduct = product;
    }
  });
  return matchingProduct;
}

export class Product {
  id;
  image;
  name;
  rating;
  priceCents;
  keywords;

  constructor(productDetails) {
    this.id = productDetails.id;
    this.image = productDetails.image;
    this.name = productDetails.name;
    this.rating = productDetails.rating;
    this.priceCents = productDetails.priceCents;
    this.keywords = productDetails.keywords;
  }

  getStarsUrl() {
    return `images/ratings/rating-${this.rating.stars * 10}.png`;
  }

  getPrice() {
    return `$${formatCurrency(this.priceCents)}`;
  }

  extraInfoHTML() {
    return '';
  }
}

// using inheritance to run/use parent class code along with addtional property of products

export class Clothing extends Product {
  sizeChartLink;

  constructor(productDetails) {
    super(productDetails);
    this.sizeChartLink = productDetails.sizeChartLink;
  }

  extraInfoHTML() {
    return `<a href="${this.sizeChartLink}" target="_blank">size chart</a>`;
  }
};

/*
date is a inbuilt class 
const date = new Date();
console.log(date.toLocaleTimeString());


console.log(this);

const obj2 = {
  a:2,
  b:this.a,
}

function logThis(){
  console.log(this);
}
logThis();
logThis.call('hello');



// basically "this" keeps/holds the value that it had outside the function
this
const obj3 = {
  method(){
    console.log(this);
  }
}
obj3.method();


console.log(this);
[1,2,3].forEach(()=>{
  console.log(this);
});
*/


export class Appliance extends Product {

  instructionsLink;
  warrantyLink;

  constructor(productDetails) {
    super(productDetails);
    this.instructionsLink = productDetails.instructionsLink;
    this.warrantyLink = productDetails.warrantyLink;
  }

  extraInfoHTML() {
    return `
    <a href="${this.instructionsLink}" target="_blank">
    Instructions
    </a>
    <a href="${this.warrantyLink}" target="_blank">
    Warranty
    </a>
    `;
  }
}

//loading products from backend using fetch()-> which uses promises
export let products = [];

export function loadProductsFetch() {
  const promise = fetch('https://supersimplebackend.dev/products')
  .then((response) => {
    return response.json()
  }).then((productsData) => {
    products = productsData.map((productDetails) => {
      if (productDetails.type === 'clothing') {
        return new Clothing(productDetails);
      } else if (productDetails.type === 'appliance') {
        return new Appliance(productDetails);
      }
      return new Product(productDetails);
    });

    console.log('load products');
  }).catch((error)=>{
    console.log('unexpected error.please try later')
  });
  return promise;
}


/*
//no need of this . the above does the same using fetch.then


//loading products from backend using XMLhttpsrequest -> which use callbacks
export function loadProducts(fun) {
  const xhr = new XMLHttpRequest();

  xhr.addEventListener('load', () => {
    products = JSON.parse(xhr.response).map((productDetails) => {
      if (productDetails.type === 'clothing') {
        return new Clothing(productDetails);
      } else if (productDetails.type === 'appliance') {
        return new Appliance(productDetails);
      }
      return new Product(productDetails);
    });

    console.log('load products');
    fun();
  });

  xhr.addEventListener('error',(error) => {
    console.log('unexpected error.please try later');
  })

  // to get the products data list from the url(backend) instead of writing all productsdata in code

  xhr.open('GET', 'https://supersimplebackend.dev/products');
  xhr.send();
}
*/
