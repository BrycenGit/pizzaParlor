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
  let orderList = $('#order-list');
  let htmlForPizzaInfo = "";
  orderToDisplay.orders.forEach(funtion(item)) {
    htmlForPizzaInfo += "<li>" + "pizza" + "</li>";
  };
  orderList.html(htmlForPizzaInfo);
}


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
    $('input#first-name').val('');
    $('input#toppings').val('');
    $('input#size').val('');

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