let pizzaService = new PizzaService();
let userService = new UserService();
let pizzaBtnClicked = false;
let myCartBtnClicked = false;
let cart = new Cart();

let pizza = new Pizza();
pizza.id = 1;
pizza.name = "Chicken Pizza";
pizza.price = 400;
pizza.toppings = ["chicken","sausages","olives","salami"];

pizzaService.insert(pizza);

let pizza2 = new Pizza();
pizza2.id = 2;
pizza2.name = "Veg Pizza";
pizza2.price = 300;
pizza2.toppings = ["mushroom","paneer","tomatoes","onions","pickled viggies"];

pizzaService.insert(pizza2);

let pizza3 = new Pizza();
pizza3.id = 3;
pizza3.name = "Mixed Pizza";
pizza3.price = 600;
pizza3.toppings = ["chicken","bacon","sausages","pork","mushroom","paneer","tomatoes","onions","pickled viggies"];

pizzaService.insert(pizza3);


let user = new User();
user.id = 1;
user.name = "Roit";
user.username = "admin";
user.password = "admin";
user.role = "admin";

userService.insert(user);






function myOrder(id) {
    let newPizza = pizzaService.getById(id);
    newPizza.order();
    cart.addItem(newPizza);
    console.log(cart);
    alert(newPizza.name+" added to cart");

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
            let title = document.createElement('h4');
            let topping = document.createElement('p');
            
            topping.setAttribute('class','pizza-desc');


            title.textContent = element.name + " Rs " + element.price;
            topping.textContent = element.viewToppings();

            let btn = document.createElement('button');
            btn.setAttribute('onClick', 'myOrder(' + element.id + ')');
            btn.textContent = "Order";
            div.appendChild(title);
            div.appendChild(topping);
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
        pizzaBtnClicked = false;
        myCartBtnClicked = false;
    }

}

function loginPage(){
    document.getElementById('items').innerHTML = '';
    pizzaBtnClicked = false;
    myCartBtnClicked = false;

    let loginBox = document.createElement('div');
    let username = document.createElement('input');
    let usernameLabel = document.createElement('label');
    let password = document.createElement('input');
    let passwordLabel = document.createElement('label');
    let login = document.createElement('button');

    username.setAttribute('type','text');
    username.setAttribute('id','username');
    username.setAttribute('required','required');
    username.setAttribute('class','input');

    password.setAttribute('type','password');
    password.setAttribute('id','password');
    password.setAttribute('required','required');
    password.setAttribute('class','input');

    login.setAttribute('onClick','checksignIn()');
    login.setAttribute('class','signinBtn');

    usernameLabel.setAttribute('class','lbl');
    passwordLabel.setAttribute('class','lbl');

    usernameLabel.textContent = 'Username';
    passwordLabel.textContent = 'Password';
    login.textContent = "Sign In";

    loginBox.setAttribute('class','loginBox');

    loginBox.appendChild(usernameLabel);
    loginBox.appendChild(username);
    loginBox.appendChild(passwordLabel);
    loginBox.appendChild(password);
    loginBox.appendChild(login);

    document.getElementById('items').appendChild(loginBox);

}

function checksignIn() {
    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;

    if(userService.getByUsername(username) != null){
        let user = userService.getByUsername(username);
        if(user.password === password) signIn(user);
        else alert("Invalid Password !!!");
    }else{
        alert("Invalid Username !!!");
        
    }  
}

function adminPanel() {
    document.getElementById('nav').style.display = "none";
    
    let users = document.createElement('button');
    let pizza = document.createElement('button');
    let heading = document.createElement('h4');
    let logout = document.createElement('button');

    let loggedInUser = userService.getByUsername(localStorage.getItem('username'));

    logout.textContent = "Logout";
    heading.textContent = "Welcome "+loggedInUser.name; 
    users.textContent = "View Users";
    pizza.textContent = "View Pizza";

    users.setAttribute('onClick','getAdminPizza');
    pizza.setAttribute('onClick','getAdminUsers');
    logout.setAttribute('onClick','logout()');
    logout.setAttribute('class','pull-rignt');

    document.getElementById('adminNav').appendChild(heading);
    document.getElementById('adminNav').appendChild(users);
    document.getElementById('adminNav').appendChild(pizza);
    document.getElementById('adminNav').appendChild(logout);
}


function signIn(user) {
    localStorage.setItem('username',user.username);
    localStorage.setItem('role',user.role);

    adminPanel();
}

function logout() {
    localStorage.clear();
    loginPage();
    document.getElementById('nav').style.display = "block";
    document.getElementById('adminNav').style.display = "none";
}





