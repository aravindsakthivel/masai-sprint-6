let currentUser = lgdUser.allData()
let footer = document.getElementById('ftr')
let modalHeading = document.getElementById('estimateModalLabel')
let carName
let charge
let finalCharge
let noOfDays


window.onload = () => {
    loadCarPage()
    let selDays = document.getElementById('no_of_days')
    selDays.addEventListener('change', () =>{
        getTotal(event.target.value)
    })
}


const getTotal = (days) =>{
    console.log(days)
    let finalValue = document.getElementById('final_amount')
    finalCharge = Number(charge) * Number(days)
    noOfDays = Number(days)
    setTimeout(() => {
        finalValue.textContent = ""
        finalValue.textContent ='Total: ' + Number(charge) * Number(days)
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
        console.log(whoseCarAllData)
        let carInfo = whoseCarAllData.listed[allCarInfo[selCar].carNo]
        charge = carInfo.Charges
        carName = carInfo.Name
        modalHeading.innerText = carName
        chargeHolder.innerText = 'X ' + Number(charge)
        console.log(carName)
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
    let crnUserDataBase = new UserDataBase(currentUser.UserName)
    let userAllCar = whoseCar.allData()
    console.log(userAllCar.listed[id])
    console.log(carLedger[car])
    let finalMsg = document.getElementById('estimate_hld')
    footer.style.display = 'none'
    finalMsg.innerHTML = ""
    finalMsg.innerHTML +=`
        <div class="spinner-grow" role="status">
            <span class="sr-only">Loading...</span>
        </div>`
    let crnUserRequests = crnUserDataBase.allData()
    console.log(crnUserRequests.requested)
    if(crnUserRequests.requested.length === 0){
        setTimeout(()=> {
            finalMsg.innerHTML = ""
            let billModalBody = document.getElementById('estimate_hld')
            modalHeading.innerText = 'Final Invoice'
            billModalBody.innerHTML += `
                <div class="card border-0">
                    <div class='card-title text-success align-self-center'><h4>Success</h4></div>
                    <div class="card-body">
                    <p><u>Charges Per Day: </u>${charge}</p>
                    <p><u>total days: </u>${noOfDays}</p>
                    <p><u>Total charges: </u>${finalCharge}</p>
                    </div>
                </div>`
            let rentBtn = document.getElementById('rent_btn')
            rentBtn.textContent = 'Rented'
            rentBtn.disabled = true
            whoseCar.carRented(id, currentUser.UserName)
            crnUserDataBase.carRequested(carLedger[car])
        },1000 )
    }
    else{
        setTimeout(() =>{
            finalMsg.innerHTML = ""
            let billModalBody = document.getElementById('estimate_hld')
            modalHeading.innerText = 'Report'
            billModalBody.innerHTML += `
                <div class="card border-0">
                    <div class='card-title text- align-self-center'><h4>You already rented ${carLedger[car].CarName} from ${carLedger[car].FullName}</h4></div>
                </div>`
            let rentBtn = document.getElementById('rent_btn')
            rentBtn.textContent = 'Rented'
            rentBtn.disabled = true
        }, 1000)
    }
}