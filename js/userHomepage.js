let currentUser = lgdUser.allData()
let crnUserDataBase = new UserDataBase(currentUser.UserName)


window.onload = () => {
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
    let fuel = carDataForm.get("car_fuel")
    let mile = carDataForm.get("car_mile")
    let carDetails = {
        Name:carName,
        Description:description,
        Charges:charges,
        Location:location,
        Fuel:fuel,
        Miles:mile 
    }
    console.log(carDetails)
    crnUserDataBase.listCars(carDetails)
}