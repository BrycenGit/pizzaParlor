// order logic

function Orders() {
  this.pizzas = [];
  this.currentId = 0;
  this.total = 0;
}

Orders.prototype.addOrder = function(pizzaParameter) {
  pizzaParameter.id = this.assignId();
  this.pizzas.push(pizzaParameter);
}

Orders.prototype.assignId = function() {
  this.currentId += 1;
  return this.currentId;
}

Orders.prototype.findPizza = function(id) {
  for (let i=0; i< this.pizzas.length; i++) {
    if (this.pizzas[i]) {
      if (this.pizzas[i].id == id) {
        return this.pizzas[i];
      }
    }
  };
  return false;
}

Orders.prototype.deletePizza = function(id) {
  for (let i=0; i< this.pizzas.length; i++) {
    if (this.pizzas[i]) {
      if (this.pizzas[i].id == id) {
        delete this.pizzas[i];
        return true;
      }
    }
  };
  return false;
}

function addAllPizzas(parameter) {
  let orderTotal = 0;
  parameter.pizzas.forEach(function(pizza) {
    return (orderTotal += pizza.pizzaTotal )
  })
  parameter.total = orderTotal;
}

function Pizza(orderName, toppings, size) {
  this.name = orderName;
  this.toppings = toppings;
  this.size = size;
  this.basePrice = 0;
  this.toppingCost = 0;
  this.pizzaTotal = 0;
  this.sizing();
}

Pizza.prototype.sizing = function () {
  if (this.size === "large") {
    this.basePrice = 12;
  } else if (this.size === "medium") {
    this.basePrice = 10;
  } else {
    this.basePrice = 8;
  }
}

Pizza.prototype.addToppings = function() {
  let toppingCost = 0;
  if (this.toppings) {
    this.toppings.forEach(function() {
    return (toppingCost += 2);
  })
    this.toppingCost = toppingCost
  } else {
    this.toppingCost = 0;
  }
}

Pizza.prototype.addPizzaTotal = function() {
  this.pizzaTotal = this.basePrice + this.toppingCost;
}

// UI Logic

let pizzaOrders = new Orders();

function displayOrderDetails(orderToDisplay) {
  let pizzasList = $("ul#order-list");
  let htmlForOrderInfo = "";
  orderToDisplay.pizzas.forEach(function(pizza) {
    htmlForOrderInfo += "<li id=" + pizza.id + ">" +"$" + pizza.pizzaTotal + " " + "Pizza #" + pizza.id + ': ' + (pizza.toppings.join(", ")).replace(/-/g, ' ') + "</li>";
  });
  pizzasList.html(htmlForOrderInfo);
};

function addAllPizzas(parameter) {
  let orderTotal = 0;
  parameter.pizzas.forEach(function(pizza) {
    return (orderTotal += pizza.pizzaTotal )
  })
  parameter.total = orderTotal;
}

function attachPizzaListeners() {
  $("ul#order-list").on("click", "li", function() {
    pizzaOrders.deletePizza(this.id);
    displayOrderDetails(pizzaOrders);
    addAllPizzas(pizzaOrders);
    $('.total').text(pizzaOrders.total);
  });
}

$(document).ready(function() {
  attachPizzaListeners();
  $('form#pizza-order').submit(function(event) {
    event.preventDefault();
    const inputtedFirstName = $('input#first-name').val();
    let toppingsArray = [];
    $('input[type=checkbox][name="toppings"]:checked').each(function() {
      toppingsArray.push($(this).val());
    })
    const inputtedSize = $('input[name="size"]:checked').val();
    let pizza = new Pizza(inputtedFirstName, toppingsArray, inputtedSize);
    pizzaOrders.addOrder(pizza);
    pizza.addToppings();
    pizza.addPizzaTotal();
    displayOrderDetails(pizzaOrders);
    $('.order-name').text(pizza.name);
    addAllPizzas(pizzaOrders);
    $('#show').show();
    $('#total').show();
    $('.total').text(pizzaOrders.total);
  })
})