const express = require('express');
const router  = express.Router();


const { login , signup } = require('../controllers/Auth');
const {auth , isStudent , isAdmin} = require('../middlewares/auth')

router.post('/login',login);
router.post('/signup',signup);



router.get('/test' , auth , (req,res)=>{
    res.json({
        success : true,
        message : "Welcome to Protected route for test"
    })
})

// Protected Routes
router.get('/student' , auth , isStudent , (req,res)=>{
    res.json({
        success : true,
        message : "welcome to protected route Student Profile"
    })
})


router.get('/admin', auth , isAdmin , (req,res)=>{
    res.json({
        success : true,
        message : "welcome to protected route Admin Profile"
    })
})


module.exports = router;