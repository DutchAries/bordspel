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
    const users = await fetchUsers();
    
    for (const user of users) {
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

    let currentUser = localStorage.getItem("user");
    if (!currentUser) {
        localStorage.setItem("user", JSON.stringify(users[0]));
        logIn(users[0], (id) => {
            localStorage.setItem("ID",id);

            window.location.reload();
        });
    } else {
        currentUser = JSON.parse(currentUser);

        setUserAvatar(currentUser);
        if (window.location.href.indexOf("user.html") > -1){
            fetchUserDTO(currentUser);
        }  
        let temp = `<select id="userSelect">`;
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
        document.body.innerHTML += temp;
        const userSelect = document.getElementById("userSelect");
        userSelect.addEventListener("change", (ev) => {
            const selectedUser = users.find((user) => {
                return user.firstName === ev.target.value
            });
            localStorage.setItem("user", JSON.stringify(selectedUser));
            logIn(selectedUser, (id) => {
                localStorage.setItem("ID",id);

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
    fetch(baseURL+"/api/gebruikers/login/"+user.email, {
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

function setUser(user){
    setUserAvatar(user);
    fetchUserDTO(user);
}