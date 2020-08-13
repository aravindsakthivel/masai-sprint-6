let currentUser = lgdUser.allData()
let crnUserDataBase = new UserDataBase(currentUser.UserName)
let allCars

window.onload = () =>{
    pageLoad()
    // let carsHolder = document.getElementById('pills-listed')
    // carsHolder.addEventListener('click', removeCars)
}

const pageLoad = () =>{
    let allData = crnUserDataBase.allData()
    // let personalInfo: [{FullName: "Aravind", UserName: "aravind", Email: "a@g.com", Password: "123", id: 2, flag: true}]
    let personalData = allData.personalInfo[0]
    allCars = allData.listed
    let nameHolder = document.getElementById('user_name')
    let emailHolder = document.getElementById('email_holder')
    emailHolder.innerText = personalData.Email
    nameHolder.innerText = personalData.FullName
    if(allCars.length !== 0){
        renderCarListDom(allData.listed)
    }
    
}


const renderCarListDom = (allCars) =>{
    let carsHolder = document.getElementById('pills-listed')
    carsHolder.innerHTML = ''
    console.log(allCars)
    for(let i = 0; i < allCars.length; i++){
        carsHolder.innerHTML += `
            <div class="card mb-2">
                <div class="card-body">
                    <div class="row">
                        <div class="col-2">
                            <div>
                                <img src="${allCars[i].Image}" class="img-fluid"/>
                            </div>
                        </div>
                        <div class="col-9">
                            <h4>${allCars[i].Name}</h4>
                            <span class="ml-1"><small><span class="font-weight-bold" style="color: gray;">Location: </small></span><small><span class="font-weight-bold">${allCars[i].Location}</span></small>
                            <span class="ml-5"><small><span class="font-weight-bold" style="color: gray;">Charges: </small></span><small><span class="font-weight-bold">${allCars[i].Charges}</span></small>
                        </div>
                    </div>
                </div>
            </div> `
    }

}


// const removeCars = () =>{
//     if(event.target.nodeName == 'I'){
//         let entId = event.target.id
//         let [text, id] = entId.split("_")
//         console.log(allCars)

//         let query = new URLSearchParams()
//         query.append('q', event.target.id)
//         setTimeout(() =>{
//             pageLoad()
//         }, 300)
//     }
// }
