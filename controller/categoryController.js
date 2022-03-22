const categoryModel = require("../model/categoryModel");
const port = process.env.PORT || 3000;

exports.add = (request,response)=>{
    categoryModel.create({
        name : request.body.name,
        image : "https://book-my-meal-by-mahak.herokuapp.com/images/"+request.file.filename
    }).then(result=>{
        return response.status(200).json(result);
    }).catch(err=>{
        return response.status(500).json(err);
    });
}

exports.view = (request,response)=>{
    categoryModel.find()
    .then(result=>{
        return response.status(200).json(result);
    }).catch(err=>{
        return response.status(500).json(err);
    });
}

exports.edit = (request,response) =>{
    categoryModel.updateOne({_id : request.body.id},{
        $set : {
            name : request.body.name,
            image :"https://book-my-meal-by-mahak.herokuapp.com/images/" +  request.file.filename
        }
    }).then(result=>{
        return response.status(200).json(result);
    }).catch(err=>{
        return response.status(500).json(err);
    });
}

exports.delete = (request,response) =>{
    categoryModel.deleteOne({_id : request.body.id})
    .then(result=>{
        return response.status(200).json(result);
    }).catch(err=>{
        return response.status(500).json(err);
    })
}