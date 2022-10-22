const express = require('express')
const router = express.Router()

app.get("/all", (req, res) => {

    res.json(JSON.stringify(posts.getAll()))

})

app.post("/new", bodyParser.json(), (req, res) => {

    let title = req.body.title
    let description = req.body.description

    posts.newPost(title, description)

    res.send("post adicionado!")

})