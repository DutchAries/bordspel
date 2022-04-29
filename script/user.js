window.onload=function(){
    fetchUserDTO();
}

function fetchCheckinDTO(){
    fetch(baseURL+"/api/gebruikers/allecheckins", { //hier geef ik dus geen RequestBody mee middels POST
        method: "GET",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authentication": getCurrentUser().gebruikersId
        },
    })
    .then(response => response.json()) // je wil hier (in een JSON?) een array aan JSONs teruggeven
    .then(checkinDTO => localStorage.setItem("checkins", JSON.stringify(checkinDTO)))
}

function fetchUserDTO(){
    if(isUserLoggedIn()){
        gebruiker=getCurrentUser();
        console.log(gebruiker);
        fetchCheckinDTO();
        let checkins = JSON.parse(localStorage.getItem("checkins"));
        console.log(typeof checkins, checkins);
        const profiel = document.getElementById("profileinfo");
        profiel.innerHTML = `
            <div> 
            <img id=profilePicture src="${gebruiker.profilePicture}"/> 
            </div>
            <div>
            <h1>${gebruiker.displayNaam}</h1>
            <p>${gebruiker.beschrijving}</p>
            </div>
            `
        const userdata = document.getElementById("userdata");
        userdata.innerHTML='';
        let bigString = '';
        for (let i = 0; i < checkins.length; i++){
            let checkin = checkins[i];
            bigString += `
            <div id="checkin" class="wrapper">
            <h2> ${gebruiker.displayNaam} heeft ${checkin.bordspel} gespeeld in ${checkin.locatie}. </h2>
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
    }
    else(alert("wees ingelogd"))
}