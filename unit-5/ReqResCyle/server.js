const express = require('express');
const app = express();


app.get("/home",(req,res)=>{
    res.send("Welcome to home page")
})

app.get("/aboutus",(req,res)=>{
    res.send("Welcome to home page")
})

app.get("/contactus",(req,res)=>{
    res.send("Welcome to home page")
})



app.listen(3000)