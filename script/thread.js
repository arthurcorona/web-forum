let id = window.location.search.slice(1)
let thread = threads.find(t => t.id == id)

let header = document.getElementById('thread-header') 
let headerHtml = `
                    <h4 class="post-title">
                        ${thread.title}
                    </h4>
                        <div class="post-content">
                        <p class="timestamp paragraphs-row">
                            ${new Date(thread.date).toLocaleString()}
                        </p>
                        <p class="comment-count paragraphs-row">
                            ${threads.comment.length} comments
                        </p>
                    </div>
`
    
header.insertAdjacentElement('beforeend', headerHtml)

function addComment(comment) {
    let commentHtml = `
                    <div class="comment">
                        <div class="top-comment">
                            <p class="username paragraphs-row">
                                ${comment.author}
                            </p>
                            <p class="timestamp paragraphs-row">
                                ${new Date(comment.date).toLocaleString()}
                            </p>
                        </div>

                        <div class="comment-content">
                            ${comment.content}
                        </div>
                    </div>
    `

    comments.insertAdjacentElement('beforeend', commentHtml)
}

let comments = document.querySelector('.comments')

for (let comment of thread.comments) {
    addComment(comment)
}


let buttonSubmitComment = document.getElementById('submit-comment')

buttonSubmitComment.addEventListener('click', () => {
    let text = document.querySelector('textarea')
    let comment = {
        content: text.value,
        date: Date.now(),
        author: 'Olavo de Carvalho'
    }
    addComment(comment)
    text.value = ''
    thread.comments.push(comment)
    localStorage.setItem('threads', JSON.stringify(threads))
})