window.onload = () => {
    loadCar()
}


const loadCar = () =>{
    let query = window.location.search
    let url = new URLSearchParams(query)
    let carNo = (url.get('q'))
    if(carNo === null){
        window.location.replace('../html/login.html')
    }
    else{
        let allUserInfo = carLedger.allData()
        let whoseCar = new UserDataBase(allUserInfo[carNo].Name)
        let whoseCarAllData = whoseCar.allData()
        let carInfo = whoseCarAllData.listed[allUserInfo[carNo].carNo]
        // renderDom(carInfo, allUserInfo[carNo].FullName)
    }
}


const renderDom = (carData, name) => {
    console.log(carData, name)
}