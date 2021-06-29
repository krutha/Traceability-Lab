const express = require('express');
const path = require('path');
const app = express();

app.use(express.json())
//rollbar
// const Rollbar = require('rollbar')
// const rollbar = new Rollbar({
//   accessToken: '4656e99901f74303ab58e5ab004444ed',
//   captureUncaught: true,
//   captureUnhandledRejections: true,
// })
app.get('/',function(req,res){
    //rollbar.log('Hello World')
    res.sendFile(path.join(__dirname,'/public/index.html'))
})
const port = process.env.PORT || 4444;
app.listen(port,function(){ 
    console.log(`server running on ${port}`)
})