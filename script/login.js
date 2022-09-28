function onChangeEmail() {
    toggleButtonsDisable()
    toggleEmailErrors()
}

function onChangePassword() {
    toggleButtonsDisable()
    togglePasswordErrors()
}

function loginSinion() {
    window.location.href = "../public/index.html"
}

function registerSinion() {
    window.location.href = "../html/register.html"
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

function validateEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
}

const form = {
    email: () => document.getElementById('email'),
    emailInvalidError: () => document.getElementById('invalid-email'),
    emailError: () => document.getElementById('error-email'),
    loginButton: () => document.getElementById('login'),
    password: () => document.getElementById('password'),
    passwordError: () => document.getElementById('password-error'),

}