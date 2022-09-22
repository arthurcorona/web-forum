function onChangeEmail() {
    toggleButtonsDisable()
    toggleEmailErrors()
}

function onChangePassword() {
    toggleButtonsDisable()
    togglePasswordErrors()
}

function isEmailValid() {
    const email = document.getElementById("email").value
    if(!email) {
        return false
    } 
    return validateEmail(email)
}

function toggleEmailErrors() {
    const email = document.getElementById('email').value
    if (!email) {
        document.getElementById('email-error').style.display = 'block'
    } else {
        document.getElementById('email-error').style.display = 'none'
    }

    if(validateEmail(email)) {
        document.getElementById('email-invalid').style.display = 'none'
    } else {    
        document.getElementById('email-invalid').style.display = 'block'
    }

}

function togglePasswordErrors() {
    const password = document.getElementById('password').value
    if (!password) {
        document.getElementById('password-error').style.display = 'block'
    } else {
        document.getElementById('password-error').style.display = 'none'
    }
}

function toggleButtonsDisable () {
    
    const emailValid = isEmailValid()
    document.getElementById('recover-password').disabled = !emailValid

    const passwordValid = isPasswordValid()
    document.getElementById('login').disabled = !emailValid || !passwordValid
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
