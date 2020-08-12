class CreateDataBase{
    constructor(name){
        this.name = name

        this.init = () => {
            let result = JSON.parse(localStorage.getItem(this.name))
            if(!result){
                this.updateDB([])
            }
        }

        this.updateDB = (data) => {
            localStorage.setItem(this.name, JSON.stringify(data))
        }

        this.allData = () => {
            this.init()
            return JSON.parse(localStorage.getItem(this.name))
        }

    }


    addUser(userCreds){
        let allUser = this.allData()
        if(allUser.length === 0){
            userCreds['id'] = allUser.length + 1
            userCreds['flag'] = true
        }
        else{
            userCreds['id'] = allUser.length + 1
            userCreds['flag'] = true
        }
        allUser.push(userCreds)
        this.updateDB(allUser)
    }
}


class CurrentUser extends CreateDataBase{
    constructor(name){
        super(name)
        this.init = () =>{
            let result = JSON.parse(localStorage.getItem(this.name))
            if(!result){
                this.updateDB({})
            }
        }
    }


    userWho(data){
        this.updateDB(data)
    }

    
    checkUser(){
        let data = {}
        this.updateDB(data)
    }
}


let regUsers = new CreateDataBase('Registered_Users')
let lgdUser = new CurrentUser('Current_User')