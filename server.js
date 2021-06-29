const express = require('express');  // This function starts your .js requiring express to be used
const path = require('path');  //talks with our html file 
const app = express();  //This is the function that puts express to use
const  Rollbar = require("rollbar");
var   rollbar = new Rollbar({
  accessToken: '9aa4246902434637a0cd07104d4531b7',
  captureUncaught: true,
  captureUnhandledRejections: true
});
app.use(express.json());
//rollbar.log('this is tarceability')

app.get('/', function(req, res) {
    // rollbar.log('hello world');
    //rollbar.error('link broken');//
    rollbar.info('html file served successfully');
    rollbar.critical("Crash the server");
    res.sendFile(path.join(__dirname, '/public/index.html')) //res is a built in body, sendfile being a build in method to send back a file at a specific path
   // res.sendFile(path.join(__dirname, '/public/broken.html'))
//path.join - join the location of index.html to the current directory
}); //__dirname - always the first argument of the directory at this location (monitoring-interactive)

const port = process.env.PORT || 4413;
app.listen(port, function() {
    console.log(`Server is live on ${port}`)
});