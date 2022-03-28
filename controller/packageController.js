const packageModel = require("../model/packageModel");
const itemModel = require("../model/itemModel");
const port = process.env.PORT || 3000;

exports.add = (request, response) => {
    packageModel.create({
        name: request.body.name,
        price: request.body.price,
        image: "https://book-my-meal-api.herokuapp.com/images/" + request.file.filename,
        description: request.body.description,
        quantity: request.body.quantity,
        day: request.body.day,
        catId: request.body.catId
    }).then(result => {
        return response.status(201).json(result);
    }).catch(err => {
        return response.status(500).json(err);
    });
}
exports.view = (request, response) => {
    packageModel.find(request.body)
        .then(result => {
            return response.status(200).json(result);
        }).catch(err => {
            return response.status(500).json(err);
        });
}

exports.availablePackages = (request, response) => {
    packageModel.find({ quantity: { $gt: 0 } })
        .then(result => {
            return response.status(200).json(result);
        }).catch(err => {
            return response.status(500).json(err);
        });
}

exports.todayMealOption = (request, response) => {
    var date = new Date();
    var day;
    if (date.getDay() == 0)
        day = "sunday";
    else if (date.getDay() == 1)
        day = "monday";
    else if (date.getDay() == 2)
        day = "tuesday";
    else if (date.getDay() == 3)
        day = "wednesday";
    else if (date.getDay() == 4)
        day = "thursday";
    else if (date.getDay() == 5)
        day = "friday";
    else if (date.getDay() == 6)
        day = "saturday";

    packageModel.find({ $or: [ { day: { $eq: day } }, { day: 'daily' } ] } )
    .then(packages=>{
        itemModel.find({ $or: [ { day: { $eq: day } }, { day: 'daily' } ] })
        .then(items=>{
            return response.status(200).json({packages : packages,items:items});
        }).catch(err=>{
            return response.status(200).json(err);
        })
    })
    .catch(err=>{
        response.status(500).json(err);
    });
}

exports.edit = (request,response) =>{
    packageModel.updateOne({_id : request.body.id},{
        $set : {
            name : request.body.name,
            price : request.body.price,
            image : "https://book-my-meal-api.herokuapp.com/images/"+request.file.filename,
            description : request.body.description,
            quantity : request.body.quantity,
            day : request.body.day,
            catId : request.body.catId
        }
    }).then(result=>{
        return response.status(200).json(result);
    }).catch(err=>{
        return response.status(500).json(err);
    })
}

exports.delete = (request,response)=>{
    packageModel.deleteOne({_id : request.body.id})
    .then(result=>{
        return response.status(200).json(result);
    }).catch(err=>{
        return response.status(500).json(err);
    });
}