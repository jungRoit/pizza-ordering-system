let pizzaService = new PizzaService();
let pizzaBtnClicked = false;
let myCartBtnClicked = false;
let cart = new Cart();

let pizza = new Pizza();
pizza.id = 1;
pizza.name = "chicken pizza";
pizza.price = 400;
console.log(pizza.order());

pizzaService.insert(pizza);

let pizza2 = new Pizza();
pizza2.id = 2;
pizza2.name = "Veg pizza";
pizza2.price = 300;

pizzaService.insert(pizza2);

let pizza3 = new Pizza();
pizza3.id = 3;
pizza3.name = "mutton pizza";
pizza3.price = 400;

pizzaService.insert(pizza3);



console.log(pizzaService.getAll());
let test = pizzaService.getById(3);
test.name = "mixed pizza";
test.price = 550;

pizzaService.update(test);
console.log(pizzaService.getById(2));





function myOrder(id) {
    let newPizza = pizzaService.getById(id);
    newPizza.order();
    cart.addItem(newPizza);
    console.log(cart);

}
function viewAll() {
    document.getElementById('items').innerHTML = '';
    if (myCartBtnClicked == true) {
        myCartBtnClicked = false;
    }
    let pizzas = [];
    if (pizzaBtnClicked == false) {
        pizzaBtnClicked = true;
        pizzas = pizzaService.getAll();

        pizzas.forEach(element => {
            let div = document.createElement('div');
            let para = document.createElement('p');
            para.textContent = element.name + " Rs " + element.price;

            let btn = document.createElement('button');
            btn.setAttribute('onClick', 'myOrder(' + element.id + ')');
            btn.textContent = "Order";

            div.appendChild(para);
            div.appendChild(btn);
            document.getElementById('items').appendChild(div);
            console.log(div);
        })
    } else {
        pizzaBtnClicked = false;
        pizzas = [];
        document.getElementById('items').innerHTML = '';


    }

}

function viewCart() {
    document.getElementById('items').innerHTML = '';
    if (pizzaBtnClicked == true) {
        pizzaBtnClicked = false;
    }
    let items = [];
    if (myCartBtnClicked == false) {
        myCartBtnClicked = true;


        items = cart.getItems();

        items.forEach(element => {
            let div = document.createElement('div');
            let para = document.createElement('p');
            para.textContent = element.name + " Rs " + element.price;

            let btn = document.createElement('button');
            btn.setAttribute('onClick', 'removeFromCart(' + element.id + ')');
            btn.textContent = "Remove from cart";



            div.appendChild(para);
            div.appendChild(btn);
            document.getElementById('items').appendChild(div);
            console.log(div);
        });
        let h3 = document.createElement('h3');
        cart.calculateTotal();
        h3.textContent = "Total: " + cart.total;
        document.getElementById('items').appendChild(h3);

    } else {
        myCartBtnClicked = false;
        items = [];
        document.getElementById('items').innerHTML = '';
    }


}

function removeFromCart(id) {
    document.getElementById('items').innerHTML = '';
    if (confirm("Are you sure you want to remove " + pizzaService.getById(id).name + " from the cart")) {
        cart.removeItem(id);
        cart.calculateTotal();
        console.log(cart.items);
    }

}



