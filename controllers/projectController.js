const projects = require('../models/projectSchema')

//add project logic
exports.addUserProject = async(req,res)=>{
     console.log("Inside AddUserProject");
    //  res.status(200).json("Add user project request")
    //user id get
    const userId = req.payload
    //get add project details
    const {title,language,github,link,overview} = req.body
    //get image
    projectImage=req.file.filename
    console.log(projectImage);

    //logic of adding new user project
    try{
        const existingProject = await projects.findOne({github})
        if(existingProject){
            res.status(406).json("Project Already Exists")
        }
        else{
            const newProject = new projects({title,language,github,link,overview,projectImage,userId})
            await newProject.save()//save new project details into mongodb
            res.status(200).json(newProject)//send response to the clint
        }
    }
    catch(err){
        res.status(404).json({message:err.message})
    }
}

//1-get user project
exports.getUserProjects=async(req,res)=>{
    //get user id
    const userId =req.payload
    //api request
    try{
        //get project information of particular user
        const userProject =await projects.find({userId})
        console.log(userProject);
        res.status(200).json(userProject) //send response to the client
    }
    catch(err){
        res.status(401).json(err.message)
    }
}

//2-get all projects
exports.getAllProject =async(req,res)=>{
    const searchkey=req.query.search
    const query={
        title:{
            $regex:searchkey,
            $options:"i"
        }
    }
    try{
        const AllProjects =await projects.find(query)
        res.status(200).json(AllProjects)
    }catch(err){
        res.status(401).json(err.message)
    }
}

//3-get home projects
exports.getHomeProject =async(req,res)=>{
    try{
const HomeProject =await projects.find().limit(3)
res.status(200).json(HomeProject)//sent response to the client
    }catch(err){
res.status(401).json(err.message)
    }
}
//4 edit project details
exports.editProject =async(req,res)=>{
const {title,language,github,link,overview,projectImage} = req.body;

const uplodeImage =req.file?req.file.filename:projectImage;

const userId =req.payload

const {id} = req.params
try{
    //find the project id in mongodb and the update project details
 const updateProject = await projects.findByIdAndUpdate({_id:id},{title,language,github,link,overview,projectImage:uplodeImage,userId},{new:true})
//save updated project details
await updateProject.save()
//response sent back to the clind
res.status(200).json(updateProject)
console.log(updateProject);
}catch(err){
    res.status(401).json(err)
}
}

//delete the project details
exports.deleteProject=async(req,res)=>{
const{pid}=req.params

try{
    const deleteData =await projects.findByIdAndDelete({_id:pid})
    res.status(200).json(deleteData)
}
catch(err){
    res.status(401).json(err)
}
}

