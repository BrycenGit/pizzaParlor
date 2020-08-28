function Orders() {
  this.pizzas = [];
  this.currentId = 0;
}

Orders.prototype.addOrder = function(pizzaParameter) {
  pizzaParameter.id = this.assignId();
  this.pizzas.push(pizzaParameter);
}

Orders.prototype.assignId = function() {
  this.currentId += 1;
  return this.currentId;
}

function Pizza(orderName, toppings, size) {
  this.name = orderName;
  this.toppings = toppings;
  this.size = size;
  this.basePrice = 0;
  this.toppingCost = 0;
  this.pizzaTotal = 0;
  pizzaSize(this);
}

function pizzaSize(pizzaParameter) {
  if (pizzaParameter.size === "large") {
    pizzaParameter.basePrice = 12;
  } else if (pizzaParameter.size === "medium") {
    pizzaParameter.basePrice = 10;
  } else {
    pizzaParameter.basePrice = 8;
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

function displayOrderDetails(orderToDisplay) {
  let pizzasList = $("ul#order-list");
  let htmlForOrderInfo = "";
  orderToDisplay.pizzas.forEach(function(pizza) {
    htmlForOrderInfo += "<li id=" + pizza.id + ">" + "Pizza #" + pizza.id + ':' + "</li>";
  });
  pizzasList.html(htmlForOrderInfo); 
};


let pizzaOrders = new Orders();

$(document).ready(function() {
  $('form#pizza-order').submit(function(event) {
    event.preventDefault();
    const inputtedFirstName = $('input#first-name').val();
    let toppingsArray = [];
    $('input[type=checkbox][name="toppings"]:checked').each(function() {
      toppingsArray.push($(this).val());
    })

    console.log(toppingsArray);
    const inputtedSize = $('input[name="size"]:checked').val();

    let pizza = new Pizza(inputtedFirstName, toppingsArray, inputtedSize);
    pizzaOrders.addOrder(pizza);
    pizza.addToppings();
    pizza.addPizzaTotal();
    console.log(pizza.pizzaTotal);
    console.log(pizzaOrders);
    console.log(pizza.name);
    displayOrderDetails(pizzaOrders);
    $('.order-name').text(pizza.name);
  })
})