export const orders = JSON.parse(localStorage.getItem('orders'))|| [];

export function addOrder(order) {
  orders.unshift(order);
  saveToStorage();
}

function saveToStorage(){
  localStorage.setItem ('orders',JSON.stringify(orders));
}

// to checkOrder -> it check all orders and finds the one that matches the orderId from url -> in tracking.js

export function getOrder(orderId) {
  let matchingOrder;

  orders.forEach((order) => {
    if (order.id === orderId) {
      matchingOrder = order;
    }
  });
  return matchingOrder;
}