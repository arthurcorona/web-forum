const firebaseConfig = {
    apiKey: "AIzaSyC-2Dy12VaK64ccH8vRh6hq8LUd3NQy6Q8",
    authDomain: "sinion.firebaseapp.com",
    projectId: "sinion",
    storageBucket: "sinion.appspot.com",
    messagingSenderId: "1032781603491",
    appId: "1:1032781603491:web:a7049ecfa3531dca7cd516",
    measurementId: "G-QYV90PXCG5"
  };

    firebase.initializeApp(firebaseConfig)

    const database = firebase.firestore() // banco de dados fireabse
    const auth = firebase.auth() //authenticator firebase
    const storage = firebase.storage() 
    const ref = storage.ref("/folder do firebase") // referencia para a pasta raiz do storage no firebase, da pra especificar ainda mais o arquivo preenchendo o ()


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
                window.location.href = "../public/index.html" 
        }).catch(error => {
            alert(getErroeMessage(error))
    })
}

function getErroeMessage(error) {
    if (error.code =="auth/user-not-found") {
        return "Usuário não encontrádo"
    }
    return error.message
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