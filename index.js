//loads .env fils into process.env
require('dotenv').config()//Loads .env file contents into process.env by default.
//import express
const express = require('express');

//import cors
const cors = require('cors');

const router =require('./Router/route')

const db = require('./DB/Connection')

// const appMiddleware =require('./Middlewares/appMiddleware')
const jwtMiddleware =require('./Middlewares/jwtMiddleware')

//create a backend application using express
const pfServer = express()

//use
pfServer.use(cors())
pfServer.use(express.json())//returns middlewire that only parses json
// pfServer.unsubscribe(appMiddleware)
pfServer.use(router)
pfServer.use('/uplodes',express.static('./uplodes'))//to export image from from server to cliend

//port creatrion
const port = 5000 || process.env.port

//server listen
pfServer.listen(port,()=>{
    console.log('listening on port'+port);
})

//http -iget resolve  to http://localhost:5000
pfServer.get("/",(req,res)=>{
    res.send('<h1>Project fair is Started...</h1>')
})

