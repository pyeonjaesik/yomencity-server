var postnumber = function(req,res){
    var param_id = req.body._id || req.query._id;
    var output = {};
    var postnumber;
    var postnumber_1;
    var database = req.app.get('database');
    if(database){
        database.UserModel.find({_id:param_id},function(err,results){
            if(err){
                output.status = 4;
                res.send(output);
                return;
            }
            if(results.length >0){
                output.status=1;
                postnumber = results[0]._doc.postnumber;
                output.postnumber =postnumber;
                postnumber_1 = postnumber+1;
                database.UserModel.where({_id:param_id}).update({postnumber:postnumber_1},function(err){
                    if(err){
                        output.status = 5;
                        res.send(output);
                        return;
                    }
                    res.send(output);
                });
            }else{
                output.status =2;
                res.send(output);
            }
        });
    }else{
        output.status = 10;
        res.send(output);
    }
    
};

module.exports.postnumber = postnumber;