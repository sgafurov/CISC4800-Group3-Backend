const router = require('express').Router()
const User = require('../db/user')

router.get('/', async (req, res) => {
    try {
        res.send('HELLO')
    } catch (error) {
        res.send(error.message)
    }
})

router.get('/users', async (req, res) => {
    try {
        // const users = await User.findAll({
        //     order: [
        //         ['username', 'ASC']
        //     ]
        // })
        const users = await User.findAll()
        res.status(200).send(users)
    } catch (error) {
        res.send(error.message)
    }
})

router.get('/:username', async (req, res) => {
    console.log('inside get username route', req.params)
    try {
        const userInfo = await User.findByPk(req.params.username)
        if (!userInfo) {
            throw { status: 400, message: 'This user does not exist.' }
        }
        res.status(200).json(userInfo)
    } catch (error) {
        if (error.status == 400) {
            res.status(400).json(error)
        } else {
            res.status(500).json(error)
        }
    }
})

router.post('/login', async (req, res) => {
    console.log('inside login route ', req.body)
    try {
        const userInfo = await User.findByPk(req.body.username)
        if (!userInfo) {
            throw { status: 400, message: 'This user does not exist.' }
        }
        if (userInfo.password != req.body.password) {
            throw { status: 400, message: 'The password does not match.' }
        }
        res.status(200).json(userInfo)
    } catch (error) {
        if (error.status == 400) {
            res.status(400).json(error)
        } else {
            res.status(500).json(error)
        }
    }
})

router.post('/register', async (req, res) => {
    console.log('inside register route', req.body)
    try {
        const findUser = await User.findByPk(req.body.username)
        if (findUser) {
            throw { status: 400, message: 'This user already exists.' }
        }
        const newUser = await User.create(req.body)
        res.status(200).json(newUser)
    } catch (error) {
        if (error.status == 400) {
            res.status(400).json(error)
        } else {
            res.status(500).json(error)
        }
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