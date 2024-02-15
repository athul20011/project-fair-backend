//import express
const express =require('express')

const userController =require('../controllers/userController')

const projectController = require('../controllers/projectController')

const jwtMiddleware =require('../Middlewares/jwtMiddleware')

const multerConfig =require('../Middlewares/multerMiddleware')

//create a router object of express to define routes(paths)
const router =new express.Router

//using router object to define paths

//1-register API routes localhost
router.post('/register',userController.register)

//2-login API routes localhost
router.post('/login',userController.login)

//3-add user project api - localhost:5000/project/add
router.post('/project/add',jwtMiddleware,multerConfig.single('projectImage'),projectController.addUserProject)

//4-get userproject api routers -localhost:4000/user/all-projects
router.get('/project/all-user-projects',jwtMiddleware,
projectController.getUserProjects)

//5-get all project routers -localhost:4000/project/all-projects
router.get('/project/all-projects',jwtMiddleware,projectController.getAllProject)

//6-get homepage
router.get('/project/home-projects',projectController.getHomeProject)

//7-update project router -localhost:5000/project /update-project/
router.put('/project/update-project/:id',jwtMiddleware,multerConfig.single('projectImage'),projectController.editProject)

//8-delete project router -localhost
router.delete('/project/delete-project/:pid',jwtMiddleware,projectController.deleteProject)
module.exports = router 