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
        window.location.href = "../html/login.html"
    }).catch(() => {
        alert('erro ao fazer logout')
    })
}

auth.onAuthStateChanged(user => {
    console.log(user.uid);
})

// create threads

let threads = [
    {
        id: 1,
        title: "A engenharia em cima",
        author: "Autor",
        date: Date.now(),
        content: "conteúdo",
        comments: [
            {
                author: "",
                date: Date.now(),
                content: "conteúdo do comentário do comentário"

            },
            {
                author: "",
                date: Date.now(),
                content: "conteúdo do comentário do comentário em outro comentário"

            }

        ]
    },
    {
        id: 2,
        title: "A engenharia bélica",
        author: "Autor",
        date: Date.now(),
        content: "conteúdo",
        comments: [
            {
                author: "",
                date: Date.now(),
                content: "conteúdo do comentário do comentário"
            },
            {
                author: "",
                date: Date.now(),
                content: "conteúdo do comentário do comentário em outro comentário"
            }
        ]
    }
]


console.log(threads);



let container = document.querySelector('ol')

for (let thread of threads) {
    let html = `
                <li class="row">
                <a class="to-threads" href="../html/thread.html?${thread.id}">
                    <h4 class="post-title">
                        ${thread.title}
                    </h4>
                    <div class="post-content">
                        <p class="timestamp paragraphs-row">
                            ${new Date(thread.date).toLocaleString()}
                        </p>
                        <p class="comment-count paragraphs-row">
                            ${thread.comments.length} comments
                        </p>
                    </div>
                </a>
                </li>
    `

    container.insertAdjacentHTML('beforeend', html)

}

