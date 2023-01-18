var lovel1 = function(req,res){
  var post_id= req.body.post_id;
  var user_id = req.body.user_id;
  var database = req.app.get('database');
  var ct = parseInt(Date.now());    
  var output = {};
  if(database){
    database.LpModel.find({_id:post_id},function(err,results){
      if(err){
        console.log('LPModel.find err');
        output.status=401;
        res.send(output);
        return;  
      }
      if(results.length>0){
        var ln=results[0]._doc.ln+1;
        var pt=results[0]._doc.pt+1000000;
        if(pt>ct){pt=ct;}
        database.MlvlModel.find({_id:user_id},function(err,results){
          if(err){
            console.log('Mlvel.find err');
            output.status=402;
            res.send(output);
            return;  
          }
          if(results.length>0){
            var p_arr=results[0]._doc.post_id;
            if(p_arr.indexOf(post_id)!=-1){
              console.log('user hacked');
              output.status=500;
              res.send(output);
              return;    
            }  
            p_arr.unshift(post_id);
            database.MlvlModel.where({_id:user_id}).update({post_id:p_arr},function(err){
              if(err){
                console.log('Mlvl.update err');
                output.status=404;
                res.send(output);
                return;  
              }
              database.LpModel.where({_id:post_id}).update({pt:pt,ln:ln},function(err){
                if(err){
                  console.log('Lp.update err');
                  output.status=406;
                  res.send(output);
                  return;    
                }
                output.status=100;
                res.send(output);  
              });    
            });  
          }else{
            console.log('Mlvl.find results.length==0 --> err');
            output.status=403;
            res.send(output);  
          }    
        });  
      }else{
        console.log('LpModel.find err');
        output.status=402;
        res.send(output);  
      }    
    });
  }else{
    console.log('lovel1: no database');
    output.status=410;
    res.send(output);  
  }   
};
module.exports.lovel1 = lovel1;