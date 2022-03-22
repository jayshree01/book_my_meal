const adminModel = require("../model/adminModel");
exports.signup = (request,response) =>{
    adminModel.create(request.body)
    .then(result=>{
        return response.status(201).json(result);
    })
    .catch(err=>{
        return response.status(500).json(err);
    });
}

exports.signin = (request,response) =>{
    adminModel.findOne(request.body)
    .then(result=>{
        return response.status(200).json(result);
    }).catch(err=>{
        return response.status(500).json(err);
    })
}

exports.edit = (request,response) =>{
    adminModel.updateOne({_id:request.body.id},
    {$set : {
        name : request.body.name,
        email : request.body.email,
        password : request.body.password
    }})
    .then(result=>{
        return response.status(201).json(result);
    })
    .catch(err=>{
        return response.status(500).json(err);
    });
}