const express = require('express')
const router = express.Router()
const cors = require('cors')
const bodyParser = require('body-parser')

const app = express()

router.get("/all", (req, res) => {

    res.json(JSON.stringify(posts.getAll()))

})

app.post("/new", bodyParser.json(), (req, res) => {

    let title = req.body.title
    let description = req.body.description

    posts.newPost(title, description)

    res.send("post adicionado!")

})

module.exports = router

