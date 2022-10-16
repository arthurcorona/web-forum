function showMenuAccount() {
    let buttons = document.getElementById("options_account")
    
    if (buttons.style.display === "block") {
      buttons.style.display = "none";
    } else {
      buttons.style.display = "block";
    }
}
 
function signOut() {
    firebase.auth().signOut().then(() => {
        window.location.href = "../html/login.html"
    }).catch(() => {
        alert('erro ao fazer logout')
    })
}

console.log("");

auth.onAuthStateChanged(user => {
    console.log(user.uid);
})
