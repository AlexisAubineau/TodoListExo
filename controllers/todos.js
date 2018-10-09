const router = require('express').Router()
const Todo = require('../model/todos')
const {find} = require('../model/users')

//GET All Todos
router.get('/:user_id/todo/', async (request, res, next) => {
        try{
            const findUser = await find(request.params.user_id)
            if(findUser !== undefined){
                const allTodos = await Todo.findAll()
                res.json(allTodos)
            }
            else{
                throw new Error("Mauvais ID : '" + request.params.id + "'")
            }
        }
        catch(e){
            next(e.message)
        }
})

//GET Todos by ID
router.get('/:user_id/todo/:id', async (request, res, next) => {
    if(!isNaN(request.params.id)){
        try{
            const findUser = await find(request.params.user_id)
            if(findUser !== undefined){
                const todo = await Todo.findTodo(request.params.id)
                res.json(todo)
            }
            else{
                throw new Error("Mauvais ID : '" + request.params.id + "'")
            }  
        }
        catch(e){
            next(e.message)
        }
    }
    else{
        next(new Error("Mauvais ID : '" + request.params.id + "'"))
    }
})

//POST Todos
router.post('/:user_id/todo/', async (request, res, next) => {
    try {
        const findUser = await find(request.params.user_id)
        if(findUser !== undefined){
            const todoCreate = await Todo.create(request.body.user_id, request.body.messages)
            res.json(todoCreate)
        }
        else{
            throw new Error("Mauvais ID : '" + request.params.id + "'")
        } 
    }
    catch(e) {
        next(e.message)
    }
})

//PUT Todos
router.put('/:user_id/todo/:id', async (request, res, next) =>{
    if(!isNaN(request.params.id)){
        try{
            const findUser = await find(request.params.user_id)
            if(findUser !== undefined){
                await Todo.update(request.params.id, request.body.user_id, request.body.messages, request.body.completed_at)
                const todoUpdated = await Todo.updatedObject(request.params.id)
                res.json(todoUpdated)
            }
            else{
                throw new Error("Mauvais ID : '" + request.params.id + "'")
            }   
        }
        catch(e){
            next(e.message)
        }
    }
    else{
        next(new Error("Mauvais ID : '" + request.params.id + "'"))
    }
})

//DELETE Todos
router.delete('/:user_id/todo/:id', async (request, res, next) => {
    if(!isNaN(request.params.id)){
        try{
            const findUser = await find(request.params.user_id)
            if(findUser !== undefined){
                const todoDelete = await Todo.delete(request.params.id)
                res.json(todoDelete)
            }
            else{
                throw new Error("Mauvais ID : '" + request.params.id + "'")
            }
        }
        catch(e){
            next(e.message)
        }
    }
    else{
        next(new Error("Mauvais ID : '" + request.params.id + "'"))
    }
})


module.exports = router