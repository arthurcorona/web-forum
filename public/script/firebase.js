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

    const db = firebase.firestore() // banco de dados fireabse
    const auth = firebase.auth() //authenticator firebase
    const storage = firebase.storage() 
    const ref = storage.ref("/folder do firebase") // referencia para a pasta raiz do storage no firebase, da pra especificar ainda mais o arquivo preenchendo o ()