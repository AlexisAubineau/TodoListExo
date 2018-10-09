const db = require('sqlite');

class Todos {

    // POST /todos
    static create(user_id, messages){
        let query_insert_todos = "INSERT INTO todos (user_id, messages, completed_at, created_at, updated_at) VALUES (?, ?, ?, ?, ?)";
        return db.run(query_insert_todos, user_id, messages, null, Date.now(), null)
    }

    // GET /todos/:id
    static findTodo(id){
        let query_select_todo = "SELECT * FROM todos WHERE rowId = ?";
        return db.get(query_select_todo, id)
    }


    // GET /todos
    static findAll(){
        return db.all("SELECT * FROM todos")
    }

    // PUT /todos/:id
    static update(id, user_id, messages, completed_at){
        let query_update_todo = "UPDATE todos SET user_id = ?, messages = ?, completed_at = ?, updated_at = ? WHERE rowId = ?";
        return db.run(query_update_todo, user_id, messages, completed_at, Date.now(), id)
    }

    // GET Todo
    static updatedObject(id){
        let query_updatedObject_todo = "SELECT * FROM todos WHERE rowId = ?"
        return db.get(query_updatedObject_todo, id)
    }

    // DELETE /todos/:id
    static delete(id){
        let query_delete_todo = "DELETE FROM todos WHERE rowId = ?";
        return db.run(query_delete_todo, id)
    }

}
module.exports = Todos;