const express = require('express');  // This function starts your .js requiring express to be used
const path = require('path');  //talks with our html file 
const app = express();  //This is the function that puts express to use
const  Rollbar = require("rollbar");
var   rollbar = new Rollbar({
  accessToken: '9aa4246902434637a0cd07104d4531b7',
  captureUncaught: true,
  captureUnhandledRejections: true
});
app.use(express.json())
app.use('/style', express.static('./public/styles.css'))

 app.get('/critical', function(req, res) {
     rollbar.critical("Crash the server");
      rollbar.log('hello world');
      rollbar.log('this is tarceability');
//     //rollbar.error('link broken');//
//     rollbar.info('html file served successfully');
     res.sendFile(path.join(__dirname, '/public/index.html'))
//     res.sendFile(path.join(__dirname, '/public/broken.html'))
  }); 


let students = [] // we'll hold any students added here

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'))
    rollbar.info('html file served successfully')
})

app.post('/api/student', (req, res) => {
    let {name} = req.body
    name = name.trim()

    const index = students.findIndex((studentName) => { // check if student name exists already
        return studentName === name
    })

    console.log(index)

    try { // using a "try catch" block will handle any generic 500 errors (not necessary, but a good addition)
        if (index === -1 && name !== '') {
            // we'll send responses to the user based upon whether or not they gave us a valid user to add
            // also we'll send information to rollbar so we can keep track of the activity that's happening
            students.push(name)
            rollbar.log('student added successfully', {author: 'riley', type: 'manual'})
            res.status(200).send(students)
        } else if (name === '') {
            rollbar.error('no name given')
            res.status(400).send('must provide a name')
        } else {
            rollbar.error('student already exists')
            res.status(400).send('that student already exists')
        }
    } catch (err) {
        rollbar.error(err)
    }
})


const port = process.env.PORT || 4413;
app.use(rollbar.errorHandler())
app.listen(port, function() {
    console.log(`Server is live on ${port}`)
 })