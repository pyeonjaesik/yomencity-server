var rmrs = function(req,res){
  var _id=req.body._id||'0';
  var name=req.body.name||'0';
  var tk = req.body.tk||'0';
  var c_id=req.body.c_id||'0';
  var co_id=req.body.co_id||'0';    
  var output={};
  var database = req.app.get('database');
  if(database){
    database.ScommentModel.find({_id:c_id},function(err,results){
      if(err){
        console.log('CommentModel.find err');
        output.status=401;
        res.send(output);
        return;  
      }
      if(results.length>0){
        if(name!=results[0].username||_id!=results[0].user_id){
          console.log('wrong _id name detected');
          output.status=403;
          res.send(output);
          return;    
        }
        database.TkModel.find({_id:_id},function(err,results){
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
            database.CommentModel.find({_id:co_id},function(err,results){
              if(err){
                console.log('CommentModel.find err');
                output.status=407;
                res.send(output);
                return;  
              }
              if(results.length>0){
                var cn=results[0]._doc.cn;  
                cn--;
                if(cn==0){cn=0};  
                output.cn=cn;
                var cm=results[0]._doc.cm;
                var ci=cm.indexOf(c_id);
                if(ci!=-1){
                  database.CommentModel.where({_id:co_id}).update({cn:cn},function(err){
                    if(err){
                      console.log('CommentModel.update err');
                      output.status=409;
                      res.send(output);
                      return;    
                    }
                    database.ScommentModel.where({_id:c_id}).update({created_time:1},function(err){
                      if(err){
                        console.log('CommentModel.update err');
                        output.status=406;
                        res.send(output);
                        return;    
                      }
                      output.status=100;
                      res.send(output);    
                    });
                  });    
                }else{
                  console.log('other p_id detected');
                  output.status=411;
                  res.send(output);    
                } 
              }else{
                console.log('CommentModel.find results.length==0 -->err');
                output.status=408;
                res.send(output);
                return;  
              }    
            });
          }else{
            console.log('TkModel.find results.length ==0 --> err');
            output.status=406;
            res.send(output);  
          }                  
        });          
      }else{
        console.log('ScommentModel.find results.length==0 -->err');
        output.status=402;
        res.send(output);  
      }    
    });  
  }else{
    console.log('rmrs: no database');
    output.status=410;
    res.send(output);  
  }    
}
module.exports.rmrs = rmrs;