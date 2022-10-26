
const express = require('express')
const bodyParser = require('body-parser')
// const posts = require('/public/script/posts.js')
const path = require('path')
const apiRoute = require('./routes/api')

const app = express()

app.set("views", path.join (__dirname, "views"))
app.set("view engine", "ejs")

app.use('/public', express.static('public'))


app.use("/api", apiRoute)


app.get("/", (req, res) => {
    res.render("home")
})

app.get("/login", (req, res) => {
    res.render("login")
})

app.get("/register", (req,res) => {
    res.render("register")
})

app.get("/account", (req, res) => {
    res.render("account")
})







const port = 3000
app.listen(port, () => {
    console.log("server running on port", port);
})