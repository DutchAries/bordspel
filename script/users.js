async function fetchUsers() {
    //const response = await fetch("https://reqres.in/api/users?page=2");
    //const result = await response.json();
    
    // const mappedData = result.data.map((item) => {
    //     return {
    //         firstName: item.first_name,
    //         password: item.last_name,
    //         email: item.email,
    //         avatar: item.avatar
    //     };
    // });
   
    return mappedData;
}

// deze functie haalt de gebruikersDTOs op om weer te geven op een gebruikerspagina
// a.k.a. deze functie veel de body van de user.html pagina

var result;

async function fetchUser(userId){ 
    // fetch(baseURL+"/api/gebruikers/"+userId, { // dit werkt dus alleen voor de reqres users, wegens deze email
    //     method: "GET",
    //     headers: {
    //         "Accept": "application/json",
    //         "Content-Type": "application/json"
    //     },
    // })
    // .then(response => response.json()) 
    //.then(result => JSON.parse(result))
    // .then(data => {
    //     JSON.stringify(data);
    //     console.log(data);
    // })

    // const response = await fetch(baseURL+"/api/gebruikers/"+userId);
    // const result = await response.json();
    // console.log(typeof result);
    // const mappedData = result.data.map((item) => {
    //     return {
    //         displayNaam: item.displayNaam,
    //         beschrijving: item.beschrijving,
    //         profilePicture: item.profilePicture,
    //     };
    // });
    // return mappedData;
}


async function setUserHtml(userId){
    result = fetchUser(userId);
    console.log("mag dit" + result);
    console.log(result.profilePicture);
    const profiel = document.getElementById("profileinfo");
    console.log(profiel);
    profiel.innerHTML = `
        <div> 
        <img id=profilePicture src="${result.profilePicture}"/> 
        </div>
        <div>
        <h1>${result.displayNaam}</h1>
        <p>${result.beschrijving}</p>
        </div>
        `
    const userdata = document.getElementById("userdata");
    userdata.innerHTML='';
    let bigString = '';
    for (let i = 0; i < result.checkins.length; i++){
        let checkin = result.checkins[i];
        bigString += `
        <div id="checkin" class="wrapper">
        <h2> ${result.displayNaam} heeft ${checkin.bordspel} gespeeld in ${checkin.locatie}. </h2>
        <p> Rating: ${checkin.rating}<br>${checkin.review}</p>
        `
        if (checkin.foto != null){
            bigString+=`
            <img id="checkinImage" src="${checkin.foto}"> 
            `
        }
        bigString+=`</div>`;
    }
    userdata.innerHTML=bigString;
    // userdata.innerText = JSON.stringify(result.checkins);
}

window.onload=function(){
    run();
}

async function run() {
    // const users = await fetchUsers(); // haal de 6 api gebruikers op
    
    // for (const user of users) {                                          // en post ze naar de backend
    //     const endPoint = await fetch(baseURL+"/api/gebruikers", {
    //         method: "POST",
    //         headers: {
    //             "Accept": "application/json",
    //             "Content-Type": "application/json"
    //         },
    //         body: JSON.stringify({
    //             gebruikersNaam: user.email,
    //             wachtwoord: user.password,
    //             displayNaam: user.firstName,
    //             beschrijving: "",
    //             profilePicture: user.avatar
    //         })
    //     });
    // };

    // let currentUser = localStorage.getItem("user"); // set currentUser op item in local storage genaamd "user"
    let currUserId = localStorage.getItem("ID");
    console.log(currUserId);
    console.log("fetching user: " + fetchUser(currUserId));
    // if (!currentUser) {             
    //     localStorage.setItem("user", JSON.stringify(users[0]));  // zet hier een localstorageitem genaamd "user" als die er niet is
    //     logIn(users[0], (id) => {
    //         localStorage.setItem("ID",id);

    //         window.location.reload();
    //     });
    // } else {
    //     currentUser = JSON.parse(currentUser);

    //     setUserAvatar(currentUser);
    //     if (window.location.href.indexOf("user.html") > -1){  //als het de user pagina is
    //         fetchUserDTO(currentUser);
    //     }  
    //     let temp = `<select id="userSelect">`;  // creeert hier de drop down menu
    //     users.forEach((user) => {
    //         let selected = false;
    //         if (currentUser.firstName === user.firstName) {
    //             selected = true;
    //         }
    //         temp += `
    //         <option ${selected ? "selected" : ""} value="${user.firstName}">${user.firstName}</option>
    //       `;
    //     });
    //     temp += `</select>`;
    //     document.body.innerHTML += temp; // voegt de drop down hier toe aan de pagina 
    //     const userSelect = document.getElementById("userSelect");
    //     userSelect.addEventListener("change", (ev) => { // verandert hier de huidige user middels het menuutje
    //         const selectedUser = users.find((user) => {
    //             return user.firstName === ev.target.value
    //         });
    //         localStorage.setItem("user", JSON.stringify(selectedUser)); // zet hier de huidige user in local storage
    //         logIn(selectedUser, (id) => {
    //             localStorage.setItem("ID",id);  // zet hier id van huidige user in lokale storage

    //             //document.location.reload(); // quick fix voor het laten zien van checkins: weg te halen

    //         });
    //         setUserAvatar(selectedUser);
    //         if (window.location.href.indexOf("user.html") > -1){
    //             fetchUserDTO(selectedUser);
    //         }   
    //     });
    // }

    //fetchUserDTO(currentUser);
    
    // setUserHtml(currUserId);
    // user = fetchUser(currUserId);
    // setUserAvatar(user.profilePicture);
}


function setUserAvatar(user) {
    document.getElementById("userAvatar").setAttribute("src", user.profilePicture)
}

function logIn(user, afterLogin) {
    fetch(baseURL+"/api/gebruikers/login/"+user.email, { // dit werkt dus alleen voor de reqres users, wegens deze email
        method: "GET",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
    })
    .then(response => response.json()) 
    .then(data => afterLogin(data))
    //.then(dto => fetchUserDTO(dto));
}