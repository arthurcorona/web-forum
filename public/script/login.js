firebase.auth().onAuthStateChanged( user => {
    if (user) {
        window.location.href = "/"
    } 
}) 

function onChangeEmail() {
    toggleButtonsDisable()
    toggleEmailErrors()
}

function onChangePassword() {
    toggleButtonsDisable()
    togglePasswordErrors()
}

function loginSinion() {
    firebase.auth().signInWithEmailAndPassword(form.email().value, 
        form.password().value)
            .then(response => {
                window.location.href = "/" //esse "/" leva para o home porque foi definido no server.js (requisição do ejs)
        }).catch(error => {
            alert(getErroeMessage(error))
    })
}

function getErroeMessage(error) {
    if (error.code =="auth/user-not-found") {
        return "Usuário não encontrádo"
    }
    if (error.code =="auth/wrong-password") {
        return "senha inválida"
    }
    return error.message
}
 
function registerSinion() {
    window.location.href = "/register"
}

function recoverPassword() {
    firebase.auth().sendPasswordResetEmail(form.email().value).then(() => {
        alert('email enviado com sucesso')
    }).catch(error => {
        alert(getErroeMessage(error))
    })
}

function isEmailValid() {
    const email = form.email().value
    if(!email) {
        return false
    } 
    return validateEmail(email)
}

function toggleEmailErrors() {
    const email = form.email().value
    if (!email) {
        form.emailError().style.display = 'block'
    } else {
        form.emailError().style.display = 'none'
    }

    if(validateEmail(email)) {
        form.emailInvalidError().style.display = 'none'
    } else {    
        form.emailInvalidError().style.display = 'block'
    }

}

function togglePasswordErrors() {
    const password = form.password().value
    if (!password) {
        form.passwordError().style.display = 'block'
    } else {
        form.passwordError().style.display = 'none'
    }
}

function toggleButtonsDisable () {
    
    const emailValid = isEmailValid()
    document.getElementById('recover-password').disabled = !emailValid

    const passwordValid = isPasswordValid()
    form.loginButton().disabled = !emailValid || !passwordValid
}

function isPasswordValid() {
    const password = document.getElementById("password").value
    if (!password) {
        return false
    }
    return true
}

const form = {
    email: () => document.getElementById('email'),
    emailInvalidError: () => document.getElementById('invalid-email'),
    emailError: () => document.getElementById('error-email'),
    loginButton: () => document.getElementById('login'),
    password: () => document.getElementById('password'),
    passwordError: () => document.getElementById('password-error'),
}