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
    let carDetails = {
        Name:carName,
        Description:description,
        Charges:charges,
        Location:location
    }
    console.log(carDetails)
    crnUserDataBase.listCars(carDetails)
}