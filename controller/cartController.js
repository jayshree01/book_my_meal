const cartModel = require("../model/cartModel");
exports.addPackge = async (request,response) =>{
    let cart = await cartModel.findOne({userId : request.body.userId})
    if(!cart){
        cart = new cartModel(); 
        cart.userId  = request.body.userId;
    }

    cart.packages.push(request.body.package);
    cart.save().then(result=>{
        return response.status(200).json(result);
    }).catch(err=>{
        return response.status(500).json(err);
    });
}

exports.view = (request,response) =>{
    cartModel.findOne({userId : request.body.userId}).populate("items").populate("packages")
    .then(result=>{
        if(result)
            return response.status(200).json(result);
        else
            return response.status(200).json({message : "No Cart Found"});
    }).catch(err=>{
        return response.status(500).json(err);
    });
}

exports.addItem = async (request,response) =>{
    let cart = await cartModel.findOne({userId : request.body.userId})
    if(!cart){
        cart = new cartModel(); 
        cart.userId  = request.body.userId;
    }

    cart.items.push(request.body.item);
    cart.save().then(result=>{
        return response.status(200).json(result);
    }).catch(err=>{
        return response.status(500).json(err);
    });
}

exports.removePackage = (request,response) =>{
    cartModel.updateOne({userId : request.body.userId},{
        $pullAll : {
            packages : [
                {_id : request.body.packageId}
            ]
        }
    }).then(result=>{
        return response.status(200).json(result);
    })
    .catch(err=>{
        return response.status(500).json(err);
    })
}

exports.removeItem = (request,response) =>{
    cartModel.updateOne({userId : request.body.userId},{
        $pullAll : {
            items : [
                {_id : request.body.itemId}
            ]
        }
    }).then(result=>{
        return response.status(200).json(result);
    })
    .catch(err=>{
        return response.status(500).json(err);
    })
}
exports.delete = (request,response) =>{
    cartModel.deleteOne({userId : request.body.userId})
    .then(result=>{
        return response.status(200).json(result);
    }).catch(err=>{
        return response.status(500).json(err);
    })
}