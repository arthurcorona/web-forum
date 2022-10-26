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
    window.location.href = "/login"
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


function register() {
    const email = form.email().value
    const password = form.password().value
    const username = form.username().value

    firebase.auth().createUserWithEmailAndPassword(email, password).then(user=>{
        auth.onAuthStateChanged(user =>{
            if(user){
                db.collection("users").doc(user.uid).set({
                    user:{username,email}
                }).then(()=>{
                    console.log("funfou")
                    window.location.href = "/"
                }).catch(err =>{
                    console.log(err)
                })
            }else{
                console.log("User não logado!")
            }
        })
    }).catch((err)=>{
        console.log(err)
    })
}

function createUserInDB(username, email) {
    let promise_creatDBUser = new Promise((resolve, reject) => {
        auth.onAuthStateChanged(user => {
            if (user) {
                db.collection("users").doc(user.uid)
                    .set({
                        user: {
                            username: username,
                            email: email,
                            img_user: "https://upload.wikimedia.org/wikipedia/commons/7/72/Default-welcomer.png",
                        }
                    }).then(() => {
                        resolve()
                        console.log("noite feliz");
                    }).catch(error => {
                        reject(err)
                        console.log("error")
                    })
            }
            else {
                   console.log("error"); 
            }
        })
    })
}
