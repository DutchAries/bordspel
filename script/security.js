function getCurrentUser(){
    currentuser = localStorage.getItem("gebruiker");
    if (!!currentuser){
        return JSON.parse(currentuser)
    }
    return null
}

function isUserLoggedIn(){
    return localStorage.getItem("gebruiker")!==null;
}