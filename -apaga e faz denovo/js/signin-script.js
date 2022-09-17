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
  const ref = storage.ref("/") // referencia para a pasta raiz do storage no firebase, da pra especificar ainda mais o arquivo preenchendo o ()
  
  
  // // function que vai mostrar a tela de login caso a pessoa ja criou a conta
  
  function entre() {
    document.getElementById("box-login").style.display = 'inline-block'  
    document.getElementById("box-cadastro").style.display = 'none'
  }
  
  //fazer o cadastro / signIn
  
  function createUser() {
    let newUserEmail = document.getElementById("new-email").value
    let newUserPassword = document.getElementById("new-password").value
   
           auth.createUserWithEmailAndPassword(newUserEmail, newUserPassword)
          .then((user) => {
            console.log(user);
          }).catch(error => {
            console.log("deu errado", error);
            alert("Preencha os dados corretamente. A senha deve conter no minímo 6 caracteres!")
          })
  }
  
  
  function login() {
  
    let UserEmail = document.getElementById("email").value
    let UserPassword = document.getElementById("password").value
  
    auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL).then(() => {
    
      auth.signInWithEmailAndPassword(UserEmail, UserPassword)
      .then(loggedUser => {
        console.log(auth.currentUser);
      }).catch(error => {
        console.log(error);
      })
    }) 
    }
  
  
    
  //teste pegando os itens do storage
  
  ref.listAll().then(res => {
    console.log(res.items);
  })
  
  
  // show user online and offline:
  
  function logout() {
  auth.signOut().then().catch(error => {
    console.log(error);
    })
  }
  
  setTimeout(logout, 2000)
  
  
  let userOnline = auth.currentUser
  console.log(userOnline);
  
  
  
  //add data of new peaple in firebase
  database.collection("data-glucose").doc("new-person").update({
  name: "teste",
  glucose: 23
  }).then(() => { //fazer um if informacoes inseridas, caso nao dê error
  console.log("Informações inseridas com sucesso");
  }).catch(err=>{ 
  console.log(err);
  })
  
  //upload +
  
  const fileInput = document.getElementById("fileInput")
  
  fileInput.addEventListener("change", (evento)=>{
    const file = evento.target.files[0]
    ref.child.put(file.name).then((snapshot) => {
      console.log(snapshot);
    })
    
  })
  
  
  
  
  
  
  
  
  
  //catching selecteds glucoses in real time
  
  // database.colletion("data-gluose").where("glucose", ">", "75").onSnapshot()
  //     .then(snapshot => {
  //       snapshot.forEah((doc) => {
  //         let person = doc.data()
  //         console.log(person.name, person.glucose);
  //       })
  //     })
  
  
  
  
  
  // catching data from collection "data-glucose" with js
  
  // database.collection("data-glucose").get()
  //                                     .then((snapshot) => {
  //                                         snapshot.forEach((doc) => {
  //                                             let personData = doc.data()
  //                                             console.log(personData.name);
  //                                         })
  //                                     })
  
  
  
  // catch name and glucose and sending to the firebase
  // after "writen", n=name  g=glucose 
  
  
  // let writen = ""
  // let writeg = ""
  
  // function sendName() {
  // writen = document.getElementById("name-person").value
  // document.getElementById("writen").innerHTML = writen  
  // //glucose
  // writeg = document.getElementById("glucose-person").value
  // document.getElementById("writeg").innerHTML = writeg
  // }