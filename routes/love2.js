var love2 = function(req,res){
  var post_id= req.body.post_id;
  var user_id = req.body.user_id;
  var userid;
  var database = req.app.get('database');
  var output = {};
  if(database){
    database.UserModel.find({_id:user_id},function(err,results){
      if(err){
        console.log('UserModel.find err');
        output.status=401;
        res.send(output);
        return;  
      }
      if(results.length>0){
        userid=results[0]._doc.id;
        database.PostModel.find({_id:post_id},function(err,results){
          if(err){
            console.log('PostModel.find err');
            output.status=401;
            res.send(output);
            return;  
          }
          if(results.length>0){
            var ln = results[0]._doc.ln-1;
            if(ln<0){ln=0;}  
              database.LoveModel.find({_id:post_id},function(err,results){
                if(err){
                  console.log('LoveModel.find err');
                  output.status=404;
                  res.send(output);
                  return;    
                }
                if(results.length>0){
                  var lvarr= results[0]._doc.id;
                  var lvo=lvarr.indexOf(userid);
                  if(lvo!=-1){
                    lvarr.splice(lvo,1);                  
                  }
                  database.LoveModel.where({_id:post_id}).update({id:lvarr},function(err){
                    if(err){
                      console.log('LoveModel.update err');
                      output.status=406;
                      res.send(output);
                      return;    
                    }
                    database.MlvModel.find({_id:user_id},function(err,results){
                      if(err){
                        console.log('MlvModel.find err');
                        output.status=407;
                        res.send(output);
                        return;  
                      }
                      if(results.length>0){
                        var p_id=results[0]._doc.post_id;
                        var po=p_id.indexOf(post_id);
                        if(po!=-1){
                          p_id.splice(po,1);    
                        }
                        database.MlvModel.where({_id:user_id}).update({post_id:p_id},function(err){
                          if(err){
                            console.log('MlvModel.update err');
                            output.status=409;
                            res.send(output);
                            return;  
                          }
                          database.PostModel.where({_id:post_id}).update({ln:ln},function(err){
                            if(err){
                              console.log('PostModel.updated err');
                              output.status=403;
                              res.send(output);
                              return;  
                            }
                            output.status=100;
                            res.send(output);
                          });        
                        });  
                      }else{
                        console.log('MlvModel.find results.length==0 -->err');
                        output.status =408;
                        res.send(output);  
                      }    
                    });  
                  });    
                }else{
                  console.log('LoveModel.find results.length==0 --> err');
                  output.status=405;
                  res.send(output);    
                }  
              });  
          }else{
            console.log('PostModel.find results.length==0 --> err');
            output.status=402;
            res.send(output);  
          }    
        });        
      }else{
        console.log('USerModel.find results.length ==0 -->err');
        output.status=402;
        res.send(output);  
      }    
    });  
  }else{
    console.log('love1: no database');
    output.status=410;
    res.send(output);  
  }   
};
module.exports.love2 = love2;