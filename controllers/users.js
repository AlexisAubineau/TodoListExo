const router = require('express').Router()
const User = require('../model/users')

//GET All Users
router.get('/', async (request, res, next) => {
    try{
        const allUsers = await User.findAll()
        res.json(allUsers)
    }
    catch(e){
        next(e.message)
    }
})

//GET User by ID
router.get('/:id', async (request, res, next) => {
    if(!isNaN(request.params.id)){
        try{
            const user = await User.find(request.params.id)
            res.json(user)
        }
        catch(e){
            next(e.message)
        }
    }
    else{
        next(new Error("Mauvais ID : '" + request.params.id + "'"))
    }
})

//POST user
router.post('/', async (request, res, next) => {
    const Verifemail = await User.findEmail(request.body.email)
    try {
        const enteredEmail = await(request.body.email)
        if(Verifemail === undefined){
            const userCreate = await User.create(request.body.pseudo, request.body.firstname, request.body.lastname, request.body.email, request.body.password)
            res.json(userCreate)
        }
        else if(enteredEmail !== Verifemail.email){
            const userCreate = await User.create(request.body.pseudo, request.body.firstname, request.body.lastname, request.body.email, request.body.password)
            res.json(userCreate)
        }
        else{
            res.json("Utilisateur déjà existant !")
        }
    }
    catch(e) {
        next(e.message)
    }
})

//PUT User
router.put('/:id', async (request, res, next) =>{
    if(!isNaN(request.params.id)){
        try{
            await User.update(request.params.id, request.body.pseudo, request.body.firstname, request.body.lastname, request.body.email, request.body.password, request.body.id)
            const userUpdated = await User.updatedObject(request.params.id)
            res.json(userUpdated)
        }
        catch(e){
            next(e.message)
        }
    }
    else{
        next(new Error("Mauvais ID : '" + request.params.id + "'"))
    }
})

//DELETE User
router.delete('/:id', async (request, res, next) => {
    if(!isNaN(request.params.id)){
        try{
            const userDelete = await User.delete(request.params.id)
            res.json(userDelete)
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