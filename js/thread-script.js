<<<<<<< HEAD
// colocar o login, comentario do comentario, criar thread, user aparecer na thread // // fazer um if() para a pessoa nao conseguir comentar nada

var id = window.location.search.slice(1);
var thread = threads.find(t => t.id == id);
var header = document.querySelector('.header');
var headerHtml = `
    <div class="">
        <h4 class="title">
            ${thread.title}
        </h4>
        <div class="bottom">
            <p class="timestamp">
                ${new Date(thread.date).toLocaleString()}
            </p>
            <p class="comment-count">
                ${thread.comments.length} comments
            </p>
        </div>
    </div>
`
header.insertAdjacentHTML('beforeend', headerHtml)

function addComment(comment) {
    var commentHtml = `
        <div class="comment">
            <div class="comment-square">
                <button onclick="replyComment()" class="reply-button">
                    responder
                </button>
                <div class="top-comment">

                    <p class="user">
                        ${comment.author}
                    </p>

                    <p class="comment-ts">
                        ${new Date(comment.date).toLocaleString()}
                    </p>
                </div>

                <div class="comment-content">
                    ${comment.content}
                </div>
            </div>

                <div class="reply-comments">
                    <div class="top-reply">

                    <p class="user">
                        ${comment.author}
                    </p>

                    <p class="comment-ts">
                        ${new Date(comment.date).toLocaleString()}
                    </p>
                    </div>
                    SSSS
                </div>
        </div>
    `
    comments.insertAdjacentHTML('beforeend', commentHtml);
}

// responder o comentario
function replyComment() {
    var commentOfComment = `
        
    `
}

var comments = document.querySelector('.comments');
for (let comment of thread.comments) {
    addComment(comment);
}

var btn = document.querySelector('button');
btn.addEventListener('click', () => {
    var txt = document.querySelector('textarea');
    var comment = {
        content: txt.value,
        date: Date.now(),
        author: 'Fulano'
    }
    addComment(comment);
    txt.value = '';
    thread.comments.push(comment);
    localStorage.setItem('threads', JSON.stringify(threads));
=======
// colocar o login, comentario do comentario, criar thread, user aparecer na thread // // fazer um if() para a pessoa nao conseguir comentar nada

var id = window.location.search.slice(1);
var thread = threads.find(t => t.id == id);
var header = document.querySelector('.header');
var headerHtml = `
    <div class="">
        <h4 class="title">
            ${thread.title}
        </h4>
        <div class="bottom">
            <p class="timestamp">
                ${new Date(thread.date).toLocaleString()}
            </p>
            <p class="comment-count">
                ${thread.comments.length} comments
            </p>
        </div>
    </div>
`
header.insertAdjacentHTML('beforeend', headerHtml)

function addComment(comment) {
    var commentHtml = `
        <div class="comment">
            <div class="comment-square">
                <button onclick="replyComment()" class="reply-button">
                    responder
                </button>
                <div class="top-comment">

                    <p class="user">
                        ${comment.author}
                    </p>

                    <p class="comment-ts">
                        ${new Date(comment.date).toLocaleString()}
                    </p>
                </div>

                <div class="comment-content">
                    ${comment.content}
                </div>
            </div>

                <div class="reply-comments">
                    <div class="top-reply">

                    <p class="user">
                        ${comment.author}
                    </p>

                    <p class="comment-ts">
                        ${new Date(comment.date).toLocaleString()}
                    </p>
                    </div>
                    SSSS
                </div>
        </div>
    `
    comments.insertAdjacentHTML('beforeend', commentHtml);
}

// responder o comentario
function replyComment() {
    var commentOfComment = `
        
    `
}

var comments = document.querySelector('.comments');
for (let comment of thread.comments) {
    addComment(comment);
}

var btn = document.querySelector('button');
btn.addEventListener('click', () => {
    var txt = document.querySelector('textarea');
    var comment = {
        content: txt.value,
        date: Date.now(),
        author: 'Fulano'
    }
    addComment(comment);
    txt.value = '';
    thread.comments.push(comment);
    localStorage.setItem('threads', JSON.stringify(threads));
>>>>>>> 382ed10784c1afc4e55fe17ea60f40f7dc569da4
})