const orderModel = require("../model/orderModel");
exports.place = (request,response) =>{
    orderModel.create(request.body)
    .then(result=>{
        return response.status(201).json(result);
    })
    .catch(err=>{
        console.log(err);
        return response.status(500).json({err : "OOPS SOMETHING WENT WRONG"});
    });
}

exports.view = (request,response) =>{
    orderModel.findOne({userId : request.params.uid})
    .then(result=>{
        return response.status(200).json(result);
    }).catch(err=>{
        return response.status(500).json(err);
    })
}