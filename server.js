const express = require("express");
const app=express();
const https = require("https");
const http = require('http');
const fs= require("node:fs");
const multer = require("multer");

require("dotenv").config(); //加载配置文件


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'commodityPic/')
    },
    filename: function (req, file, cb) {
        let filename = req.body.commodityName + "-" + req.body.commodityPrice + "-" +req.body.label.join("-");
        filename += "." + file.mimetype.split("/")[file.mimetype.split("/").length-1];
        cb(null, filename)
    }
})

const upload = multer({ storage: storage })

const options = {
    key: fs.readFileSync('./cert/nlshop.com.cn.key'),
    cert: fs.readFileSync('./cert/nlshop.com.cn_bundle.pem')
};

const httpServer = http.createServer(app);
httpServer.listen(80, () => {
    console.log('HTTP server listening on port 80');
});


const httpsServer = https.createServer(options, app);
httpsServer.listen(443, function () {
    console.log("https server listening on port 443");
    console.log("127.0.0.1:443");
});


// 将http 重定向到 https
app.use((req, res, next) => {
    if (req.protocol === 'http') {
        const secureUrl = `https://${req.hostname}${req.url}`;
        res.redirect(301, secureUrl);
        console.log(secureUrl)
    } else {
        next();
    }
});


app.use("/views", express.static("views"));
app.use("/public",express.static("public"));
app.use("/img",express.static("img"));
app.use("/commodityPic",express.static("commodityPic"));

app.post("/label", (req, res) => {
    const data = {
        label: process.env.label.split(",")
    };
    res.json(data);
});


app.post("/upload",upload.single("commodityPic"), (req, res) => {
    res.json({status: 200});
});

app.post("/commodity", (req, res) => {
    let picArray = fs.readdirSync("commodityPic");
    picArray = picArray.filter(pic => pic !== '.DS_Store');
    res.json({
        dir: "../commodityPic/",
        picArray: picArray
    })
})