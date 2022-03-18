const userModel = require("../model/userModel.js");

exports.signup = (request,response)=>{
    userModel.create(request.body)
    .then(result=>{
        return response.status(201).json(result);
    }).catch(err=>{
        return response.status(500).json(err);
    });
}

exports.signin = (request,response)=>{
    userModel.findOne(request.body)
    .then(result=>{
        return response.status(200).json(result);
    }).catch(err=>{
        return response.status(500).json(err);
    });
}
exports.view = (request,response)=>{
    userModel.find(request.body)
    .then(result=>{
        return response.status(200).json(result);
    }).catch(err=>{
        return response.status(500).json(err);
    });
}