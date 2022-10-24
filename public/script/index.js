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

function openPopUp() {
  document.getElementById("popup-container").style.display = 'flex'
}

function closePopUp() {
  document.getElementById("popup-container").style.display = 'none'
}

function submitThread() {

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

// deixar o botão de enviar desvalidado, para depois validar ele (dps q as funcoes estiverem prontas)