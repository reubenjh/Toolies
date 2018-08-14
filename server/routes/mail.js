const router = require('express').Router()
const verifyJWT = require('express-jwt')
const { getSecret, handleError } = require('../auth/token')
const gearDB = require('../db/gear')
const userDB = require('../db/users')

const { sendRequest } = require('../mail/sendGrid')

router.use(
    verifyJWT({
        secret: getSecret
    }),
    handleError
)

router.post('/request', (req, res) => {
    const { gearId, messageBody } = req.body
    Promise.all([
        gearDB.getGearByGearIdWithUser(gearId),
        userDB.getUserById(req.user.user_id)
    ])
    .then(([item, requester]) => {
        return sendRequest({ item, requester, messageBody })
    })
    .then(() => {
        res.sendStatus(200)
    })
    .catch(err => {
        res.status(500).send({
            message: 'error sending mail request',
            err
        })
    })
})

module.exports = router