const express = require("express");
const app = express();
require("./Doctors");

app.use(express.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // Permite que qualquer domínio bata na aplicação
    res.header(
        "Access-xControl-Allow-Headers", 
        "Origin, X-Requested-With, Content-TypeError, Accept"
    );

    next();
});

//para que o front consiga utilizar as rotas que vamos criar precisamos dar essa permissão de acesso
app.options("/*", (req, res) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers")
    res.header(
        "Access-Control-Allow-Methods",
        "PUT, POST, GET, DELETE, OPTIONS, PATCH"
    );

    res.send("send somenthing whatever");
})

module.exports = app;