// pathing for routes on backend
const fs = require('fs');
const express = require('express');
const app = express();
const path = require('path');
const port = process.env.PORT || 3000;
var uniqid = require('uniqid'); 


app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(express.json());

// sets up a route for the index.html and notes page
 app.get('/', (req, res) => {res.sendFile(path.join(__dirname, './public/index.html'))} );
 app.get('/notes', (req, res) => {
    
    res.sendFile(path.join(__dirname, './public/notes.html'))
    });
app.post('/api/notes', (req, res) => {
   fs.promises.readFile('./db/db.json', 'utf8')
   .then((data) => {
        let notes = JSON.parse(data);
        let newNote = req.body;
        newNote.id = uniqid();
        notes.push(newNote);
        fs.promises.writeFile('./db/db.json', JSON.stringify(notes))
        .then(() => {
        res.json(newNote);
        })
    })

});

app.get('/api/notes', (req, res) => {
  fs.promises.readFile('./db/db.json', 'utf8') 
  .then((data) => {
    res.json(JSON.parse(data));
  })

});



app.listen(port, () => {
    console.log(`App listening on PORT: ${port}`);
})
;