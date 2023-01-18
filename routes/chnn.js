var chnn = function(req,res){
  var _id=req.body._id;
  var nn=req.body.nn;
  var database= req.app.get('database');
  var ct=parseInt(Date.now());    
  var output={};
  if(database){
    database.UserPModel.find({nn:nn},function(err,results){
      if(err){
        console.log('err');
        output.status=401;
        res.send(output);
        return;  
      }
      if(results.length==0){
        database.UserModel.find({_id:_id},function(err,results){
          if(err){
            console.log('UserModel.find err');
            output.status=403;
            res.send(output);
            return;  
          }
          if(results.length>0){
            var cc=ct-results[0]._doc.ct;
            if(cc>86400000){
              database.UserModel.where({_id:_id}).update({ct:ct},function(err){
                if(err){
                  console.log('UserModel.update err');
                  output.status=405;
                  res.send(output);
                  return;    
                }
                database.UserPModel.where({_id:_id}).update({nn:nn},function(err){
                  if(err){
                    console.log('UserPModel.udpate err');
                    output.status=406;
                    res.send(output);
                    return;  
                  }
                  output.status=100;
                  res.send(output);    
                });  
              });    
            }else{
              output.status=102;
              output.cc=cc;    
              res.send(output);    
            }  
          }else{
            console.log('UserModel.find results.length==0');
            output.status=404;
            res.send(output);  
          }    
        });          
      }else{
        output.status=101;
        res.send(output);  
      }    
    });  
  }else{
    console.log('no database');
    output.status=410;
    res.send(output);  
  }    
}
module.exports.chnn = chnn;