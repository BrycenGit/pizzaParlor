function Orders() {
  this.orders = [];
  this.totalOrders = 0;
}

Orders.prototype.addOrder = function(pizzaParameter) {
  this.orders.push(pizzaParameter);
  this.totalOrders += 1;
}

function Pizza(orderName, toppings, size) {
  this.name = orderName;
  this.toppings = toppings;
  this.size = size;
  this.basePrice = 0;
  this.toppingCost = 0;
  this.pizzaTotal = 0;
}

function pizzaSize(pizzaParameter) {
  if (pizzaParameter.size === "large") {
    alert("large0!");
    pizzaParameter.basePrice = 12;
  } else if (pizzaParameter.size === "medium") {
    alert('medium');
    pizzaParameter.basePrice = 10;
  } else {
    alert('small');
    pizzaParameter.basePrice = 8;
  }
}

Pizza.prototype.addToppings = function() {
  this.toppingCost +=2;
}

Pizza.prototype.addPizzaTotal = function() {
  this.pizzaTotal = this.basePrice + this.toppingCost;
}

let pizzaOrders = new Orders();
console.log(pizzaOrders);
let pizza = new Pizza("brycen", ["pepperoni", 'peppers', 'sausage'], "medium")
console.log(pizza);
pizzaOrders.addOrder(pizza);
console.log(pizzaOrders);
console.log(pizza);
pizza.addPizzaTotal();
console.log(pizza);
pizzaSize(pizza);
console.log(pizza);