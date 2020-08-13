let currentUser = lgdUser.allData()
let footer = document.getElementById('ftr')
let charge

window.onload = () => {
    loadCarPage()
    let selDays = document.getElementById('no_of_days')
    selDays.addEventListener('change', () =>{
        getTotal(event.target.value)
    })
}


const getTotal = (value) =>{
    console.log(value)
    let finalValue = document.getElementById('final_amount')
    setTimeout(() => {
        finalValue.textContent = ""
        finalValue.textContent ='Total: ' + Number(charge) * Number(value)
        footer.style.display = ''
    }, 500)
    
}

const loadCarPage = () =>{
    let chargeHolder = document.getElementById('charges_hld')
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
        charge = carInfo.Charges
        chargeHolder.innerText = 'X ' + Number(charge)
        console.log(charge)
        let carOwnername = allCarInfo[selCar].FullName
        let estimateHld = document.getElementById('estimate_hld')
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
    
    let finalMsg = document.getElementById('estimate_hld')
    footer.style.display = 'none'
    finalMsg.innerHTML = ""
    finalMsg.innerHTML +=`
        <div class="spinner-grow" role="status">
            <span class="sr-only">Loading...</span>
        </div>`
    setTimeout(()=>{
        finalMsg.innerHTML = ""
        finalMsg.innerText = 'Success'
        let rentBtn = document.getElementById('rent_btn')
        rentBtn.textContent = 'Rented'
        rentBtn.disabled = true
    }, 1000)
    
}