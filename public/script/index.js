const form = {
  titleThread: () => document.getElementById('title-thread'),
  textThread: () => document.getElementById('text-thread'),
  submitThreadButton: () => document.getElementById('submit-thread'),

}

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
        window.location.href = "/login"
    }).catch(() => {
        alert('erro ao fazer logout')
    })
}

function goToAccount() {
  window.location.href = "/account"
}

function openPopUp() {
  document.getElementById("popup-container").style.display = 'flex'
}

function closePopUp() {
  document.getElementById("popup-container").style.display = 'none'
}

function onChangeThreadSubmit() {
  toggleSubmitThreadButtonDisable()
}

function toggleSubmitThreadButtonDisable() {
  form.submitThreadButton().disabled = !validateSubmit()
}

function validateSubmit() {
  const title = form.titleThread().value

 if (!title || title.length < 6) {
  return false
 }

 const text = form.textThread().value

 if (!text || text.length < 10) {
  return false
 }
 return true
}

function submitThread() {
  
}

function appendUsername(user) {
  
  // verificando se o user está on
  auth.onAuthStateChanged(userOn => {
    userOn ? appendUsername(userOn.uid) : console.log("user não está on");
  })

  let userInDB = db.collection("users").doc(user)
  userInDB.get().then((doc) = { 
    
  })
}