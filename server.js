const express = require("express");
const app=express();

app.use(express.static("views"));
app.use("/public",express.static("public"));
app.use("/img",express.static("img"));

app.listen(3000,() => {
    console.log("127.0.0.1:3000")
});