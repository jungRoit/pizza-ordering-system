function Pizza() {
    id=0;
    name="";
    price = 0;
    toppings = [];
    this.order = () => {
        console.log(this.name +" "+ this.price);
    }
    this.viewToppings = () => {
        let topping = "";
        for(let i = 0;i<this.toppings.length;i++){
            if(i != this.toppings.length-1){
                topping += this.toppings[i]+",";
            }else{
                topping += this.toppings[i];
            }
            
        }
        return topping;
    }
}

   
