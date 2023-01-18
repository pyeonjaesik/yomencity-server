var rmp = function(req,res){
  var user_id=req.body._id||'0';
  var id=req.body.id||'0';
  var name=req.body.name||'0';
  var tk = req.body.tk||'0';
  var post_id=req.body.post_id||'0';    
  var output={};
  var database = req.app.get('database');
  if(database){
    database.PostModel.find({_id:post_id},function(err,results){
      if(err){
        console.log('PostModel.find err');
        output.status=401;
        res.send(output);
        return;  
      }
      if(results.length>0){
        if(id!=results[0].userid||name!=results[0].username||user_id!=results[0].user_id){
          console.log('wrong _id, id or name detected');
          output.status=403;
          res.send(output);
          return;    
        }
        database.TkModel.find({_id:user_id},function(err,results){
          if(err){
            console.log('TkModel.find err');
            output.status=404;
            res.send(output);
            return;  
          }
          if(results.length>0){
            if(tk!=results[0].tk){
              console.log('wrong token detected');
              output.status=405;
              res.send(output);
              return;  
            }
            database.PostinfoModel.find({_id:user_id},function(err,results){
              if(err){
                console.log('PostinfoModel.find err');
                output.status=408;
                res.send(output);
                return;  
              }
              if(results.length>0){  
                var p_id=results[0].post_id;
                var p_l=p_id.indexOf(post_id);
                p_id.splice(p_l,1);
                database.PostinfoModel.where({_id:user_id}).update({post_id:p_id},function(err){
                  if(err){
                    console.log('PostinfoModel update err');
                    output.status=409;
                    res.send(output);
                    return;  
                  }
                  var pi;
                  var tpid;    
                  if(p_id.length>0){
                    pi=1;
                    tpid=p_id[0];  
                  }else{
                    pi=0;
                    tpid='0';  
                  }    
                  database.UserinfoModel.where({_id:user_id}).update({p_index:pi,post_id:tpid},function(err){
                    if(err){
                      console.log('UserinfoModel.update err');
                      output.status=413;
                      res.send(output);
                      return;    
                    }
                    database.PostModel.where({_id:post_id}).update({created_time:1},function(err){
                      if(err){
                        console.log('PostModel.update err');
                        output.status=414;
                        res.send(output);
                        return;  
                      }
                      output.status=100;
                      res.send(output);    
                    });
                  });
                });  
              }else{
                console.log('PostinfoModel.find results.length==0 --> err');  
              }    
            });  
          }else{
            console.log('TkModel.find results.length ==0 --> err');
            output.status=406;
            res.send(output);  
          }                  
        });          
      }else{
        console.log('PostModel.find results.length==0 -->err');
        output.status=402;
        res.send(output);  
      }    
    });  
  }else{
    console.log('rmp: no database');
    output.status=410;
    res.send(output);  
  }    
}
module.exports.rmp = rmp;