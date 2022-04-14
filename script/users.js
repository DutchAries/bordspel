async function fetchUsers() {
    const response = await fetch("https://reqres.in/api/users?page=2");
    const result = await response.json();
    
    // HIER: zorg dat je de Users uit onze database (ook) fetcht.

    const mappedData = result.data.map((item) => {
        return {
            firstName: item.first_name,
            password: item.last_name,
            email: item.email,
            avatar: item.avatar
        };
    });
    return mappedData;
}

// deze functie haalt de gebruikersDTOs op om weer te geven op een gebruikerspagina
async function fetchUserDTO(currUser){
    const response = await fetch(baseURL+"/api/gebruikers/vind/"+currUser.firstName);
    const result = await response.json();
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
    const users = await fetchUsers(); // haal de 6 api gebruikers op
    
    for (const user of users) { // en post ze naar de backend
        const endPoint = await fetch(baseURL+"/api/gebruikers", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                gebruikersNaam: user.email,
                wachtwoord: user.password,
                displayNaam: user.firstName,
                beschrijving: "",
                profilePicture: user.avatar
            })
        });
    };
    let currentUser = localStorage.getItem("user"); // set currentUser op item in local storage genaamd "user"
    if (!currentUser) {             
        localStorage.setItem("user", JSON.stringify(users[0]));  // zet hier een localstorageitem genaamd "user" als die er niet is
        logIn(users[0], (id) => {
            localStorage.setItem("ID",id);

            window.location.reload();
        });
    } else {
        currentUser = JSON.parse(currentUser);

        setUserAvatar(currentUser);
        if (window.location.href.indexOf("user.html") > -1){  //als het de user pagina is
            fetchUserDTO(currentUser);
        }  
        let temp = `<select id="userSelect">`;  // creeert hier de drop down menu
        users.forEach((user) => {
            let selected = false;
            if (currentUser.firstName === user.firstName) {
                selected = true;
            }
            temp += `
            <option ${selected ? "selected" : ""} value="${user.firstName}">${user.firstName}</option>
          `;
        });
        temp += `</select>`;
        document.body.innerHTML += temp; // voegt de drop down hier toe aan de pagina 
        const userSelect = document.getElementById("userSelect");
        userSelect.addEventListener("change", (ev) => { // verandert hier de huidige user middels het menuutje
            const selectedUser = users.find((user) => {
                return user.firstName === ev.target.value
            });
            localStorage.setItem("user", JSON.stringify(selectedUser)); // zet hier de huidige user in local storage
            logIn(selectedUser, (id) => {
                localStorage.setItem("ID",id);  // zet hier id van huidige user in lokale storage

                //document.location.reload(); // quick fix voor het laten zien van checkins: weg te halen

            });
            setUserAvatar(selectedUser);
            if (window.location.href.indexOf("user.html") > -1){
                fetchUserDTO(selectedUser);
            }   
        });
    }
}


function setUserAvatar(user) {
    document.getElementById("userAvatar").setAttribute("src", user.avatar)
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