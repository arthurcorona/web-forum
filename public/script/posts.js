module.exports = {
     posts: [
        {
            id: "aidi",
            title: "Titulo",
            description: "descrição"
        },
    ],

    getAll() {
        return this.posts
    },

    newPost(title,description) {

        this.posts.push({id:generateID(), title, description}) 
    },

    deletePost(id) {
        
    }
    
}

function generateID() {
    return Math.random().toString(36).substr(2,9)
}

