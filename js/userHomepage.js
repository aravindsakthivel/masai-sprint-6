let currentUser = lgdUser.allData()
let crnUserDataBase = new UserDataBase(currentUser.UserName)


window.onload = () => {
    pageLoad()
    let addCars = document.querySelector('form')
    addCars.addEventListener('submit', listCars)
}



const listCars = () => {
    event.preventDefault()
    let carDataForm = new FormData(event.target)
    let carName = carDataForm.get("car_name")
    let description = carDataForm.get("car_description")
    let charges = carDataForm.get("car_charges")
    let location = carDataForm.get("car_location")
    let carDetails = {
        Name:carName,
        Description:description,
        Charges:charges,
        Location:location
    }
    console.log(carDetails)
    let carId = crnUserDataBase.listCars(carDetails)
    carLedger.addToLedger({Name:currentUser.UserName, carNo:carId})
}


const pageLoad = () =>{
    let allUserInfo = carLedger.allData()
    for(let i = 0; i < allUserInfo.length; i++){
        console.log(allUserInfo[i].Name)
        if(currentUser.UserName === allUserInfo[i].Name){
            continue
        }
        else{
            let indivUser = new UserDataBase(allUserInfo[i].Name)
            let indivUserAllData = indivUser.allData()
            console.log(indivUserAllData)
            let carId = Number(allUserInfo[i].carNo)
            console.log(indivUserAllData)
            if(indivUserAllData.listed[carId].requestedBy.length === 0){
                renderDom(indivUserAllData.listed[carId])
            }
        }
    }
}


const renderDom = (carInfo) =>{
    let carsHolder = document.getElementById('cars_holder')
    carsHolder.innerHTML += `
        <div class="card">
            <div class="card-title">${carInfo.Name}</div>
            <div class="card-body">
                ${carInfo.Description}
            </div>
        </div>`
}