const Userdb = require('../model/model');

// create and save new user
exports.create=(req,res)=>{
    if(!req.body){ //validate request
        res.status(400).send({message:"COntent can not be empty"});
        return;
    }

    //new user
    const user = new Userdb({
        name:req.body.name,
        email:req.body.email,
        gender:req.body.gender,
        status:req.body.status
    })

    // save user in the db
    user
    .save(user)
    .then(data=>{
        res.redirect('/add_user');
        // res.send(data)
    })
    .catch(err=>{
        res.status(500).send({
            message:err.message || "Some error occured while creating a create operation"
        });
    });
}

//retrive and return all users or single user
exports.find=(req,res)=>{
    if(req.query.id){
        const id = req.query.id;

        Userdb.findById(id)
        .then(data=>{
            if(!data){
                res.status(404).send({message:"Not found user with id" + id})
            }else{
                res.send(data);
            }
        })
        .catch(err=>{
            res.status(500).send({message:"Error retreiving user with id" + id})
        })
    }else{
        Userdb.find()
        .then(user=>{
            res.send(user)
        })
        .catch(err=>{
            res.status(500).send({message:err.message || "Error occur while retrives user details" })
        })
    }


}

//update a new identified user by id
exports.update=(req,res)=>{
    if(!req.body){
        return res
        .status(400)
        .send({message:"Data to update cannot be empty"})
    }

    const id = req.params.id; 
    Userdb.findByIdAndUpdate(id, req.body,{useFindAndModify:false})
    .then(data=>{
        if(!data){
            res.status(404).send({message : `Cannot Update user with ${id}. Maybe user not found`})
        }else{
            res.send(data);
        }
    })
    .catch(err=>{
        res.status(500).send({message:"Error Update user information"})
    });
}

//delete a user with user by id
exports.delete=(req,res)=>{
    const id= req.params.id;

    Userdb.findByIdAndDelete(id)
    .then(data=>{
        if(!data){
            res.status(404).send({message:`Cannot delete with id ${id}. Maybe id is wrong.`})
        }else{
            res.send({
                message:"User was deleted successfully!"
            })
        }
    })
    .catch(err=>{
        res.status(500).send({message:`Could not delete User with id ${id}`
    });
    });
    
}