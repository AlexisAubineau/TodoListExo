const db = require('sqlite');

class Session{
    // FIND email
    static findPseudo(password){
        let query_find_pseudo = "SELECT pseudo FROM users WHERE password = ?"
        return db.get(query_find_pseudo, password)
    }

    // FIND password
    static findPassword(pseudo){
        let query_find_password = "SELECT password FROM users WHERE pseudo = ?"
        return db.get(query_find_password, pseudo)
    }

    //FIND user
    static findUser(pseudo){
        let query_find_user = "SELECT rowId FROM users WHERE pseudo = ?"
        return db.get(query_find_user, pseudo)
    }

    //CREATE accessToken
    static create(user_id, accessToken){
        let query_insert_token = "INSERT INTO sessions (user_Id, accessToken, created_at, updated_at) VALUES (?, ?, ?, ?)";
        return db.run(query_insert_token, user_id, accessToken, new Date(), null)
    }

    //DELETE Token
    static delete(token){
        let query_delete_token = "DELETE FROM sessions WHERE accessToken = ?";
        return db.run(query_delete_token, token)
    }

    //FIND Session
    static findSession(token){
        let query_find_session = "SELECT * FROM sessions WHERE accessToken = ?"
        return db.get(query_find_session, token)
    }
}

module.exports = Session;