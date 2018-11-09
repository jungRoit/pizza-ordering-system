function PizzaService(){
    this.pizzaList = [];

    this.insert = (pizza) => this.pizzaList.push(pizza);
    
    this.getAll = () => this.pizzaList;

    this.getById = (id) => {
        for(let i = 0;i<this.pizzaList.length;i++){
            let pizza = this.pizzaList[i]
            if(pizza.id == id){
                return pizza;
            }  
        }
        return null;
    }

    this.delete = (id) => {
        if(this.getById(id) != null){
            let pizza = this.getById(id);
            let index = this.pizzaList.indexOf(pizza);
            console.log(index);
            this.pizzaList.splice(index,1);
            return true;
        }
            return false;
        
    }

    this.update = (pizza) => {
        let index = this.pizzaList.indexOf(pizza);
        this.pizzaList.splice(index,1,pizza);
    }

   
}