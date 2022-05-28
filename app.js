const express = require('express');
const port = 3000;

const app = express();
app.get('/', function(req , res){
    res.send(`<h3 align="center">Hello there!!</h3>`);
});
app.listen(port , ()=>{
    console.log('Server is running on port 3000 .');
});