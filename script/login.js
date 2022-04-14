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
            beschrijving: "",
            profilePicture: ""
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