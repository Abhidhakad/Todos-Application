const express = require('express');
const router = express.Router();

const {createTodo,getAllTodos, updateTodo, deleteTodo,successTodo} = require('../controller/Todo.controller');
const {signUp,login,sendOTP, changePassword,updateName} = require('../controller/Auth');
const {auth} = require('../middlewares/auth');
const { resetPasswordToken, resetPassword } = require('../controller/ResetPassword')


// ******************* Auth Routers ***************
router.post('/auth',auth);
router.post('/sendOtp',sendOTP);
router.post('/signup',signUp);
router.post('/login',login)
router.post("/reset-password-token", resetPasswordToken)
router.post("/reset-password", resetPassword)


// ******************* Profile Routers ************
router.post('/changepassword',auth,changePassword)
router.post('/updatename',auth,updateName);




// ******************* Todo Routers ***************

router.post('/createtodo',auth,createTodo); // create
router.get('/getallTodo',auth,getAllTodos); // read
router.post('/updatetodo',auth,updateTodo); // update
router.post('/deletetodo',auth,deleteTodo); // delte 
router.post('/successtodo',auth,successTodo); // update


module.exports = router;