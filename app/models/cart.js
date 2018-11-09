function Cart() {
    this.items = [];
    this.total = 0;

    this.addItem = (item) => {
        this.items.push(item);
    }
    this.getById = (id) => {
       for(let i =0;i<this.items.length;i++){
           if(this.items[i].id === id){
               return this.items[i];
           }
       }
       return null;
    }
    this.removeItem = (id) => {
        if(this.getById(id) != null){
            let item = this.getById(id);
            let index = this.items.indexOf(item);
            console.log(index);
            this.items.splice(index,1);
            return true;
        }
        return false;
        
    }
    this.getItems = () => {
        return this.items;
    }
    this.calculateTotal = () => {
        this.total = 0;
        this.items.forEach((element) => {
            this.total += element.price;
        })
    }
}