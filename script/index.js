window.onload=function(){
    run();
}

async function run() {
    let gebruiker = localStorage.getItem("gebruiker"); // set currentUser op item in local storage genaamd "user"
    console.log(gebruiker);
    if(!!gebruiker){
        setUserAvatar(JSON.parse(gebruiker)); 
    }
}

function setUserAvatar(gebruiker) {
    document.getElementById("userAvatar").setAttribute("src", gebruiker.profilePicture)
}