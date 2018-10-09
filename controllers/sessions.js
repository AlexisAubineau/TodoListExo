const router = require('express').Router()
const Session = require('../model/sessions')
const hat = require('hat')

router.post('/connect', async(request, res, next) => {
    const password = await Session.findPassword(request.body.pseudo)
    try{
        const user = await Session.findUser(request.body.pseudo)
        if(password !== undefined){
            const enteredPassword = await(request.body.password)
            if(password.password === enteredPassword){
                const accessToken = hat()
                await Session.create(accessToken, user.id)
                res.json(accessToken)
            }
            else{
                throw new Error("Erreur identifiant invalide !")
            }
        }
        else{
            throw new Error("Cet utilisateur n'existe pas !")
        }
    }
    catch(e){
        next(e.message)
    }
    
})

router.get('/Session/:token', async(request, res, next) => {
    try{
        const session = await Session.findSession(request.params.accessToken)
        res.json(session)
    }
    catch(e){
        next(e.message)
    }
})

router.delete('/disconnect/:token', async(request, res, next) => {
    try{
        await Session.delete(request.params.token)
        res.json("Vous êtes déconnecté !")
    }
    catch(e){
        next(e.message)
    }
})

module.exports = router