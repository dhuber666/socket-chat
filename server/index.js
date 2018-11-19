const app = require("express")();
const http = require("http").Server(app);
const io = require("socket.io")(http);
const userModel = require("./model/userSchema")
const mongoose = require("mongoose");


const User = mongoose.model("user")

var users = ""

const user = new User({
    user: "dom"
}).save();



io.on("connection", socket => {
    socket.on("user", user => {
        User.find({ user }, (err, docs) => console.log("docs: " + docs + " Errors: " + err))
        
    })
})

mongoose.connect("mongodb://root:atiradeon9200se@ds221339.mlab.com:21339/clicker", { useNewUrlParser: true })


http.listen(3001, () => console.log("listening on port 3001"));