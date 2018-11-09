function UserService () {
    this.users = [];

    this.insert = (user) => this.users.push(user);

    this.getAll = () => this.users;

    this.getById = (id) => {
        for(let i = 0;i<this.users.length;i++){
            if(this.users[i].id === id)return this.users[i];
        }
        return null;
    }

    this.getByUsername = (username) => {
        for(let i =0;i<this.users.length;i++){
            if(this.users[i].username === username)return this.users[i];
        }
        return null;
    }
    
    this.delete = (id) => {
        if(this.getById(id) != null) {
            let user = this.getById(id);
            let index = users.indexOf(user);
            this.users.splice(index,1);
            return true;
        }
        return false;
    }

    this.update = (user) => {
        let index = this.users.indexOf(user);
        this.users.splice(index,1,user);
    }



}

