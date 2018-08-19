const router = require('express').Router()
const verifyJWT = require('express-jwt')
const { getSecret, handleError } = require('../auth/token')
const requestDB = require('../db/requests')

router.use(
    verifyJWT({
        secret: getSecret
    }),
    handleError
)

router.post('/new', (req, res) => {
    const request = req.body
    const isSender = (req.user.user_id == req.body.requester_id)

    requestDB.insertRequest(request, isSender)
        .then(details => {
            res.status(201).send(details)
        })
        .catch(err => {
            res.status(500).send({
                message: 'error adding new request to DB',
                err
            })
        })
})

router.post('/update/:id', (req, res) => {
    const update = req.body
    const id = req.params.id

    requestDB.updateRequest(id, update)
        .then(() => { res.sendStatus(200) })
        .catch(err => {
            res.status(500).send({
                message: 'error updating request in DB',
                err
            })
        })
})

router.delete('/delete/:id', (req, res) => {
    const id = Number(req.params.id)

    requestDB.deleteRequest(id)
        .then(() => { res.sendStatus(200) })
        .catch(err => {
            res.status(500).send({
                message: 'error deleting request from DB',
                err
            })
        })
})

module.exports = router