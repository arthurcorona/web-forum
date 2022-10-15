const form = {
    username: () => document.getElementById('username'),
    email: () => document.getElementById('email'),
    emailInvalidError: () => document.getElementById('error-email'),
    emailError: () => document.getElementById('invalid-email'),
    password: () => document.getElementById('password'),
    passwordMinLength: () => document.getElementById('passord-min-length'),
    passwordError: () => document.getElementById('error-password'),
    confirmPassword: () => document.getElementById('confirm-password'),
    confirmPasswordDoesntMatchError: () => document.getElementById('password-doesnt-match-error'),
    registerButton: () => document.getElementById('register-button')
}


firebase.auth().onAuthStateChanged(user => {
    if (user) {
        window.location.href = "../public/index.html"
    }
})

function onChangeEmail() {
    const email = form.email().value
    
    form.emailError().style.display = email ? "none" : "block"
    form.emailInvalidError().style.display = validateEmail(email) ? "none" : "block"

    toggleRegisterButtonDisable()

}

function onChangePassword() {
    const password = form.password().value
    
    form.passwordError().style.display = password ? "none" : "block"
    form.passwordMinLength().style.display = password.length >= 6 ? "none" : "block"

    validatePasswordsMatch()
    toggleRegisterButtonDisable()

}

function onChangeConfirmPassword() {
    validatePasswordsMatch()
    toggleRegisterButtonDisable()
}

function register() {
    const email = form.email().value
    const password = form.password().value
    const username = form.username().value

    // tentar adicionar o username no db
    
    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(() => {
            firebase.database().ref('users/' + firebase.auth().currentUser.uid)
                .set({
                    'username': username.value,
                    'email': email.value
                }).then(() => {

                })
        })




    // firebase.auth().UserWithEmailAndPassword(email, password)
    //     .then(() => {
    //         window.location.href = "../public/index.html"
    //     }).catch(error => {
    //         alert(getErrorMessage(error))
    //     })
}

function getErrorMessage(error) {
    if(error.code == "auth/email-already-in-use") {
        return "email já em uso"
    }
    return error.message
}

function validatePasswordsMatch() {
    const password = form.password().value
    const confirmPassword = form.confirmPassword().value

    form.confirmPasswordDoesntMatchError().style.display = password == confirmPassword ? "none" : "block"
}

function toggleRegisterButtonDisable() {
    form.registerButton().disabled = !isFormValid()
}

function login() {
    window.location.href = "../html/login.html"
}

function isFormValid() {
    const email = form.email().value
    if (!email || !validateEmail(email)) {
        return false
    }

    const password = form.password().value
    if (!password || password.length < 6) {
        return false
    }

    const confirmPassword = form.confirmPassword().value
    if (password != confirmPassword) {
        return false
    }

    return true
}