const express = require("express");
const app = express();
const db = require('sqlite');
const bodyParser = require('body-parser')

db.open('todos_express.db').then(() => {
    Promise.all([
        db.run("CREATE TABLE IF NOT EXISTS users (pseudo, firstname, lastname, email, password, created_at, updated_at)"),
        db.run("CREATE TABLE IF NOT EXISTS todos (user_id, messages, completed_at, created_at, updated_at)"),
        db.run("CREATE TABLE IF NOT EXISTS sessions (user_id, accessToken, created_at, updated_at)")
    ]).then(() => {
        console.log('Database is ready')
    }).catch((err)=>{
        console.log('Une erreur est survenue :', err)
    })
})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false}));

//Users
app.use('/', require('./controllers/users'))

//Todos
app.use('/', require('./controllers/todos'))

//Sessions
app.use('/', require('./controllers/sessions'))




app.listen(3000, () => {
 console.log("Server running on port 3000");
});