async function registreer(){
    const endPoint = await fetch(baseURL+"/api/gebruikers/", 
    {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            gebruikersNaam: document.getElementById("eMail").value,
            wachtwoord: document.getElementById("wachtWoord").value,
            displayNaam: document.getElementById("displayNaam").value,
            beschrijving: document.getElementById("reviewText").value,
            profilePicture: imageBase64
        })
    });
}

var imageBase64='';

function encodeImgtoBase64(element) {
    var file = element.files[0];
    var reader = new FileReader();
    reader.onloadend = function () {
        imageBase64 = reader.result;
    }
    reader.readAsDataURL(file);
}

function logInPersoon() {
    let user = document.getElementById("Uname").value;
    fetch(baseURL+"/api/gebruikers/login/"+user, { // dit werkt dus alleen voor de reqres users, wegens deze email
        method: "GET",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
    })
    .then(response => response.json())
    .then(id => localStorage.setItem("ID", id))
    localStorage.setItem("user", user);
}
