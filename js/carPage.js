let currentUser = lgdUser.allData()
window.onload = () => {
    loadCarPage()
}


const loadCarPage = () =>{
    let query = window.location.search
    let url = new URLSearchParams(query)
    let selCar = (url.get('q'))
    if(selCar === null){
        window.location.replace('../html/login.html')
    }
    else{
        let allCarInfo = carLedger.allData()
        let whoseCar = new UserDataBase(allCarInfo[selCar].Name)
        let whoseCarAllData = whoseCar.allData()
        let carInfo = whoseCarAllData.listed[allCarInfo[selCar].carNo]
        let carOwnername = allCarInfo[selCar].FullName
        let requestBtnHld = document.getElementById('request_btn_hld')
        requestBtnHld.innerHTML += `
            <button type="button" class="btn btn-dark float-right" id="request_btn">Request</button>
        `
        let requestBtn = document.getElementById('request_btn')
        requestBtn.addEventListener('click', () => {
            requestCar(whoseCar, allCarInfo[selCar].carNo, allCarInfo, selCar)
        })
    }
}


const requestCar = (whoseCar, id, carLedger, car) =>{
    whoseCar.carRented(id, currentUser.UserName)
    let crnUserDataBase = new UserDataBase(currentUser.UserName)
    crnUserDataBase.carRequested(carLedger[car])
}