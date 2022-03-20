const userModel = require("../model/userModel.js");
const nodemailer = require("nodemailer");
exports.signup = (request, response) => {
    userModel.create(request.body)
        .then(result => {
            return response.status(201).json(result);
        }).catch(err => {
            return response.status(500).json(err);
        });
}

exports.signin = (request, response) => {
    userModel.findOne(request.body).populate("favItems").populate("favPackages")
        .then(result => {
            console.log(result)
            if(result){
            if (result.isBlocked == false) {
                if (result.isVerified)
                    return response.status(200).json(result);
                else {
                    let sender = "mahak01agrawal@gmail.com";
                    let reciever = result.email;
                    let subject = "Mail Verification";
                    let message = "http://localhost:3000/user/verifyByEmail/" + result._id;

                    const transporter = nodemailer.createTransport({
                        service: 'gmail',
                        auth: {
                            user: sender,
                            pass: '@123!mahak'
                        }
                    });

                    // email options
                    let mailOptions = {
                        from: sender,
                        to: reciever,
                        subject: subject,
                        html: "<h1>please verify first </h1><center><a href='" + message + "'><button style='background-color: #008CBA;background-color: #4CAF50; /* Green */border: none;color: white;padding: 15px 32px;text-align: center;text-decoration: none;display: inline-block;font-size: 16px;margin: 4px 2px;cursor: pointer;'>VERIFY</button></a></center>"
                    };

                    transporter.sendMail(mailOptions, (error, res) => {
                        if (error) {
                            console.log(error);
                        }
                        else
                          response.status(200).json({ message: "Verify on email first" });
                    });
                }
            }
            else
                return response.status(200).json({ message: "You are blocked by admin" });
            }
            else{
                return response.status(200).json({message:"invalid email or password"});
            }
        }).catch(err => {
            return response.status(500).json({ err: err });
        });
}
exports.view = (request, response) => {
    userModel.find(request.body)
        .then(result => {
            return response.status(200).json(result);
        }).catch(err => {
            return response.status(500).json(err);
        });
}

exports.addToFavPackage = (request, response) => {
    let id = request.body.id;
    userModel.updateOne({ _id: id }, {
        $push: {
            favPackages: request.body.package
        }
    }).then((result) => {
        return response.status(200).json(result);
    }).catch(err => {
        return response.status(500).json(err);
    });
}

exports.addToFavItem = (request, response) => {
    let id = request.body.id;
    userModel.updateOne({ _id: id }, {
        $push: {
            favItems: request.body.item
        }
    }).then((result) => {
        return response.status(200).json(result);
    }).catch(err => {
        return response.status(500).json(err);
    });
}

exports.addToBlock = (request, response) => {
    let id = request.body.id;
    userModel.updateOne({ _id: id }, {
        $set: {
            isBlocked: true
        }
    }).then((result) => {
        return response.status(200).json(result);
    }).catch(err => {
        return response.status(500).json(err);
    });
}

exports.removeFromBlock = (request, response) => {
    let id = request.body.id;
    userModel.updateOne({ _id: id }, {
        $set: {
            isBlocked: false
        }
    }).then((result) => {
        return response.status(200).json(result);
    }).catch(err => {
        return response.status(500).json(err);
    });
}

exports.verified = (request, response) => {
    let id = request.params.id;
    userModel.updateOne({ _id: id }, {
        $set: {
            isVerified: true
        }
    }).then((result) => {
        return response.status(200).json({ message: "vrification successfull" });
    }).catch(err => {
        return response.status(500).json(err);
    });
}
exports.forgetPassword = (request, response) => {
    let sender = "mahak01agrawal@gmail.com";
    let reciever = request.body.email;
    let subject = "Change Password";
    let message = "http://localhost:3000/user/forget/"+ request.body.email;

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: sender,
            pass: '@123!mahak'
        }
    });

    // email options
    let mailOptions = {
        from: sender,
        to: reciever,
        subject: subject,
        html: "<h4>Click on the below button to change the password</h4><a href='" + message + "'><button style='background-color: #008CBA;background-color: #4CAF50; /* Green */border: none;color: white;padding: 15px 32px;text-align: center;text-decoration: none;display: inline-block;font-size: 16px;margin: 4px 2px;cursor: pointer;'>Change Password</button></a>"
    };

    transporter.sendMail(mailOptions, (error, res) => {
        if (error) {
            console.log(error);
        }
        else{
            return response.status(200).json({message : "Change Password on Gmail"});
        }
    });
}

exports.forget = (request,response)=>{
    let email = request.params.email;
    response.render("forget",{
        email : email
    });
}

exports.changePassword = (request,response)=>{
    userModel.updateOne({email:request.body.email},{
        $set : {
            password : request.body.password
        }
    }).then(result=>{
        return response.status(200).json({message : "Password changed"});
    }).catch(err=>{
        return response.status(200).json({err : err});
    })
}

exports.viewFoods = (request,response) =>{
    userModel.findOne({_id:request.body.id}).populate("favItems").populate("favPackages")
    .then(result=>{
        return response.status(200).json({favItems : result.favItems,favPackages:result.favPackages});
    })
    .catch(err=>{
        console.log(err);
        return response.status(200).json({err:err});
    });
}

