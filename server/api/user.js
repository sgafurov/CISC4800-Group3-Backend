const router = require('express').Router()
const User = require('../db/models/user')

router.get('/:username', async (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    try {
        const userInfo = await User.findOne({
            where: { username: req.params.username },
            attributes: ['username']
        })
        res.send(userInfo)
    } catch (error) {
        res.send(error.message)
    }
})

router.get('/:username', async(req, res) => {
    try{
        const userInfo = await User.findByPk(req.params.username)
        res.status(200).send(planet)
    } catch(error) {
        res.status(404).send(error.message)
    }
})

// router.get('/login/:username', async (req, res) => {
//     res.header("Access-Control-Allow-Origin", "*");

//     try {
//         const userInfo = await User.findOne({
//             where: { username: req.params.username },
//             attributes: ['password']
//         })
//         res.send(userInfo)
//     } catch (error) {
//         res.send(error.message)
//     }
// })

router.post('/register', async (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    try {
        const newUser = await User.create(req.body)
        res.json(newUser)
        res.send({newUser}) //bew
    } catch (error) {
        res.send(error.message)
    }
})

// router.put('/updateUserInfo', async (req, res) => {
//     res.set('Access-Control-Allow-Origin', '*');
//     res.send({ "msg": "This has CORS enabled 🎈" })

//     try {
//         const updatedUserInfo = await User.update(req.body, {
//             where: { username: req.body.username },
//             returning: true
//         });
//         res.status(200).json({
//             newData: updatedUserInfo[1][0].dataValues
//         })
//     } catch (error) {
//         res.send(error.message)
//     }
// })

// router.delete('/:id', async(req, res) => {
//     try {
//         const inputid = req.params.id;
//         QuizScore.destroy({ where : { id : inputid } });
//         res.status(200).json({
//             outcome: `Deleted QuizScore with id ${inputid}.`
//         })
//     } catch (error) {
//         res.send(error.message)
//     }
// })

module.exports = router