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
        loadInnerInfo(carInfo, carOwnername)
        let requestBtn = document.getElementById('request_btn')
        requestBtn.addEventListener('click', () => {
            requestCar(whoseCar, allCarInfo[selCar].carNo, allCarInfo, selCar)
        })
    }
}


const loadInnerInfo = (carinfo, name) =>{
    console.log(carinfo)
    let imageHolder =  document.getElementById('car_image')
    let nameHolder = document.getElementById('car_name')
    let descriptionHolder =  document.getElementById('car_description')
    let listerName = document.getElementById('lister_name')
    let typeHolder = document.getElementById('car_type')
    let milesHolder = document.getElementById('car_miles')
    let locationHolder = document.getElementById('car_location')
    let chargeHolder = document.getElementById('car_charges')
    chargeHolder.innerText = 'Per Day: ' + carinfo.Charges
    listerName.innerText = 'Owner: ' + name
    imageHolder.src = carinfo.Image
    descriptionHolder.textContent ="Description: " + carinfo.Description
    nameHolder.textContent = carinfo.Name
    typeHolder.textContent = "Type: " + carinfo.Fuel
    milesHolder.textContent = "Miles: " + carinfo.Miles
    locationHolder.textContent = "Location: " + carinfo.Location
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
    if(crnUserRequests.requested.length === 0){
        setTimeout(()=> {
            finalMsg.innerHTML = ""
            let billModalBody = document.getElementById('estimate_hld')
            modalHeading.innerText = 'Final Invoice'
            billModalBody.innerHTML += `
                <div class="card border-0">
                    <div class='card-title text-success align-self-center'><h4>Success</h4></div>
                    <div class="card-body">
                    <p><b>Charges Per Day: ₹</b>${charge}</p>
                    <p><b>Total no. of Days: </b>${noOfDays}</p>
                    <p><b>Total charge: ₹</b>${finalCharge}</p>
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
                    <div class='card-title text- align-self-center'><h4>You already rented ${crnUserRequests.requested[0].CarName} from ${crnUserRequests.requested[0].FullName}</h4></div>
                </div>`
            let rentBtn = document.getElementById('rent_btn')
            rentBtn.textContent = 'Rented'
            rentBtn.disabled = true
        }, 1000)
    }
}