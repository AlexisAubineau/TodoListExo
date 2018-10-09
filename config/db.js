const db = require('sqlite');


db.open('restaurants_express.db').then(() => {

    createTableRestaurants();
    createTableEmployees();
    createTableNom();

});

function createTableRestaurants(){
    db.run("CREATE TABLE IF NOT EXISTS restaurants (address, name, capacity, open_at, close_at, created_at, updated_at)")
        .then(() => {
            console.log(('> Table restaurants created'))
        }).catch((err) => {
            console.error('ERR> ', err)
        })
}

function createTableEmployees(){
    db.run("CREATE TABLE IF NOT EXISTS employees (restaurants_id, position, created_at, updated_at)")
        .then(() => {
            console.log(('> Table employees created'))
        }).catch((err) => {
        console.error('ERR> ', err)
    })
}

function createTableNom(){
    db.run("CREATE TABLE IF NOT EXISTS menu (restaurant_id, name, created_at, updated_at)")
        .then(() => {
            console.log(('> Table menu created'))
        }).catch((err) => {
        console.error('ERR> ', err)
    })
}

function createTableItems(){
    db.run("CREATE TABLE IF NOT EXISTS items (menu_id, name, price, updated_at)")
        .then(() => {
            console.log(('> Table items created'))
        }).catch((err) => {
        console.error('ERR> ', err)
    })
}



module.exports = db;