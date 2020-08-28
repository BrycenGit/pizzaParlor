function Orders() {
  this.orders = [];
  this.totalOrders = 0;
}

function Pizza(orderName, toppings, size) {
  this.name = orderName;
  this.toppings = toppings;
  this.size = size;
  this.basePrice = 10;
}

Orders.prototype.addOrder = function(pizzaParameter) {
  this.orders.push(pizzaParameter);
  this.totalOrders += 1;
}

let pizzaOrders = new Orders();
console.log(pizzaOrders);
let pizza = new Pizza("brycen", "pepperoni", "large")
console.log(pizza);
pizzaOrders.addOrder(pizza);
console.log(pizzaOrders);