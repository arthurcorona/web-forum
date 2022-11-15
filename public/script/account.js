

document.addEventListener("DOMContentLoaded", () => {
    db.collection("users").get().then(snapshot => {
        snapshot.forEach(infoUser => {
            loadInfoUser(infoUser.data())
        })
    }).catch(error => {
        console.log(error);
    })
})

function appendUsername() {
  // verificando se o user está on
  return new Promise((response, reject)=>{
    auth.onAuthStateChanged(userOn => {
      if(userOn){
        let userInDB = db.collection("users").doc(userOn.uid)
        userInDB.get().then((doc) => { 
          let userName = doc.data().user.username
            response(userName)
        })
      }
      else{
        reject("Deu tudo errado")
      }
    })
  })  
}

function loadInfoUser(infoUser) {
    document.querySelector(".user-information")
        .innerHTML += `
            <div>
                <img class="image-profile" src="/public/images/thumbnail_data_sold.jpeg" alt="">
            </div>
            <ul class="users-info">   
                <h3 class="since-data">2015</h3>
                <h3 class="name-user">${infoUser.username}</h3>
                <h3 class="posts-quantity">123</h3>
            </ul>
        `   

}

loadInfoUser()