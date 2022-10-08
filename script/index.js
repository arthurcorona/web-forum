function signOut() {
    firebase.auth().signOut().then(() => {
        window.location.href = "../html/login.html"
    }).catch(() => {
        alert('erro ao fazer logout')
    })
}