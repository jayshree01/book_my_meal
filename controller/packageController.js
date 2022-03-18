const packageModel = require("../model/packageModel");
const port = process.env.PORT || 3000;

exports.add = (request,response)=>{
    packageModel.create({
        name : request.body.name,
        price : request.body.price,
        image : "http://localhost:"+port+"/images/"+request.file.filename,
        description : request.body.description,
        quantity : request.body.quantity,
        day : request.body.day,
        catId : request.body.catId
    }).then(result=>{
        return response.status(201).json(result);
    }).catch(err=>{
        return response.status(500).json(err);
    });
}
exports.view = (request,response)=>{
    packageModel.find(request.body)
    .then(result=>{
        return response.status(200).json(result);
    }).catch(err=>{
        return response.status(500).json(err);
    });
}