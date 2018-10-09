const db = require('sqlite');

class Users {

    // POST /users
    static create(pseudo, firstname, lastname, email, password){
        let query_insert_user = "INSERT INTO users (pseudo, firstname, lastname, email, password, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?)";
        return db.run(query_insert_user, pseudo, firstname, lastname, email, password, Date.now(), null)
    }

    // GET /users/:user_id
    static find(id){
        let query_select_user = "SELECT * FROM users WHERE rowId = ?";
        return db.get(query_select_user, id)
    }

    //FIND email
    static findEmail(email){
        let query_find_email = "SELECT email FROM users WHERE email = ?"
        return db.get(query_find_email, email)
    }

    // GET /users
    static findAll(){
        return db.all("SELECT * FROM users")
    }

    // PUT /users/:id
    static update(id, firstname, lastname, email, password){
        let query_update_user = "UPDATE users SET pseudo = ?, firstname = ?, lastname = ?, email = ?, password = ?, updated_at = ? WHERE rowId = ?";
        return db.run(query_update_user, pseudo, firstname, lastname, email, password, Date.now(), id)
    }

    // GET users/:id
    static updatedObject(id){
        let query_updatedObject_user = "SELECT * FROM users WHERE rowId = ?"
        return db.get(query_updatedObject_user, id)
    }

    // DELETE /users/:id
    static delete(id){
        let query_delete_user = "DELETE FROM users WHERE rowId = ?";
        return db.run(query_delete_user, id)
    }
}
module.exports = Users;