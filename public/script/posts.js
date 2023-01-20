module.exports = {
    posts: [
        {
            id: "id",
            title: "title",
            description: "description ;)"
        },
    ],

    getAll() {
        return this.posts
    },

    newPost(title,description) {

        this.posts.push({
            id:generateID(), title, description
        }) 
    },

    deletePost() {
    }
}

function generateID() {
    return Math.random().toString(36).substr(2,9)
} 

