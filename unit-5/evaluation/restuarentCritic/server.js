const express = require('express');
const { request } = require('http');
const app = express();
const path = require('path');
// const views = require('./views')

const router = require('./controller/routes/restaurent');

app.use(express.static(path.join(__dirname , 'views')));
app.use('/api/restaurent' , router)
app.set('view engine' , 'ejs');
// app.set('views' , views);



let PORT = 8080;

app.get('/',(request,response)=>{
    console.log('running');
    response.send('<h1>FINE</h1>')
})

app.listen(PORT, ()=>{
    console.log(`server is running at http://localhost:${PORT}`)
})