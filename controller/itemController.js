const itemModel = require("../model/itemModel");
const port = process.env.PORT || 3000;
exports.add = (request,response)=>{
    itemModel.create({
        name : request.body.name,
        price : request.body.price,
        quantity : request.body.quantity,
        image : "http://localhost:"+port+"/images/" + request.file.filename,
        day : request.body.day,
        catId : request.body.catId
    }).then(result=>{
        return response.status(201).json(result);
    })
    .catch(err=>{
        return response.status(500).json(err);
    });
}

exports.view =  (request,response)=>{
    itemModel.find(request.body)
    .then(result=>{
        return response.status(200).json(result);
    }).catch(err=>{
        return response.status(500).json(err);
    });
}