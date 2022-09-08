<<<<<<< HEAD
var defaultThreads = [
    {
        id: 1,
        title: "Thread 1",
        author: "Arthur",
        date: Date.now(),
        content: "Thread content",
        comments: [
            {
                author: "Jota",
                date: Date.now(),
                content: "MACACO"
            },
            {
                author: "Arthur",
                date: Date.now(),
                content: "LOUCO"
            }
        ]
    },  
    {
        id: 2,
        title: "CRIA",
        author: "Arthur",
        date: Date.now(),
        content: "Thread content 2",
        comments: [
            {
                author: "Jota",
                date: Date.now(),
                content: "MACACO"
            },
            {
                author: "Arthur",
                date: Date.now(),
                content: "LOUCO"
            }
        ]
    }
]



var threads = defaultThreads
if (localStorage && localStorage.getItem('threads')) {
    threads = JSON.parse(localStorage.getItem('threads'));
} else {
    threads = defaultThreads;
    localStorage.setItem('threads', JSON.stringify(defaultThreads));
}

=======
var defaultThreads = [
    {
        id: 1,
        title: "Thread 1",
        author: "Arthur",
        date: Date.now(),
        content: "Thread content",
        comments: [
            {
                author: "Jota",
                date: Date.now(),
                content: "MACACO"
            },
            {
                author: "Arthur",
                date: Date.now(),
                content: "LOUCO"
            }
        ]
    },  
    {
        id: 2,
        title: "CRIA",
        author: "Arthur",
        date: Date.now(),
        content: "Thread content 2",
        comments: [
            {
                author: "Jota",
                date: Date.now(),
                content: "MACACO"
            },
            {
                author: "Arthur",
                date: Date.now(),
                content: "LOUCO"
            }
        ]
    }
]



var threads = defaultThreads
if (localStorage && localStorage.getItem('threads')) {
    threads = JSON.parse(localStorage.getItem('threads'));
} else {
    threads = defaultThreads;
    localStorage.setItem('threads', JSON.stringify(defaultThreads));
}

>>>>>>> 382ed10784c1afc4e55fe17ea60f40f7dc569da4
