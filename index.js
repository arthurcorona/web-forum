const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const apiRoute = require('./routes/api')
const port = 8080
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


app.listen(port, () => {
    console.log("server running on port", port);
})