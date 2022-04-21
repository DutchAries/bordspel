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
    fetch(baseURL+"/api/gebruikers/login", { 
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
                gebruikersnaam: document.getElementById("Uname").value,
                wachtwoord: document.getElementById("Pass").value
            })
    })

    .then(response => response.json())
    .then(gebruikerDTO => localStorage.setItem("gebruiker", JSON.stringify(gebruikerDTO)))
}

function deleteUser(){
    let id = localstorage.getItem("ID"); // dit moet nu worden aangepast omdat er geen losse ID in de storage zit?

    fetch(baseURL+"/api/gebruikers/"+id, { 
        method: "DELETE",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "Authentication": localStorage.getItem("ID") //idem?
        },
    })
    .then( () => alert("gebruiker is verwijderd"))
}
