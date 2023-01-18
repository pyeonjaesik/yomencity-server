var replysl = function(req,res){
    var post_id = req.body.post_id||'123';
    var ti=req.body.ti;
    var ni=req.body.ni;
    var text = req.body.text ||'123';
    var tok=req.body.tk||'123';
    var xss = require("xss");
    text=xss(text);    
    var user_id = req.body.user_id || req.body.user_id;
    var c_t = parseInt(Date.now());
    var database = req.app.get('database');
    var output = {};
    var cn;
    var cm = [];
    var max_c = 999;
    var maxim =200;
    if(database){
        database.TkModel.find({tk:tok},function(err,results){
          if(err){
            console.log('TkModel.find err');
            output.status=401;
            res.send(output);
            return;  
          }
          if(results.length>0){ 
            var ct = parseInt(Date.now()/86400000);
            if(results[0]._doc.l==ct){
              var rdn= results[0]._doc.r;
              if(rdn<maxim){
                rdn++;
                database.TkModel.where({_id:user_id}).update({r:rdn},function(err){
                  if(err){
                    console.log('TkModel.update err');
                    output.status=403;
                    res.send(output);
                    return;  
                  }  
                  database.LcModel.find({_id:post_id},function(err,results){
                    if(err){
                      console.log('CommentModel.find err');
                      output.status=401;
                      res.send(output);
                      return;    
                    }
                    if(results.length>0){
                      cm=results[0]._doc.cm; 
                      database.UserPModel.find({_id:user_id},function(err,results){
                        if(err){
                          console.log('UserPModel.find err');
                          output.status=409;
                          res.send(output);
                          return;    
                        }
                        if(results.length>0){
                          var nn=results[0]._doc.nn;
                          function checkCm(em) {
                            return em.ct==ti&&em.nn==ni;
                          }
                          var ci=cm.findIndex(checkCm);
                          if(ci==-1){output.status=401; res.send(output); return;}    
                          var t_cm=cm[ci].cm;
                          t_cm.unshift({_id:user_id,nn:nn,txt:text,ct:c_t});
                          t_cm=t_cm.splice(0,300);
                          var cm3={_id:cm[ci]._id,txt:cm[ci].txt,ct:cm[ci].ct,nn:cm[ci].nn,cn:(cm[ci].cn+1),cm:t_cm};
                          cm.splice(ci,1,cm3);   
                          database.LcModel.where({_id:post_id}).update({cm:cm},function(err){
                            if(err){
                              console.log('LcModel.update err');
                              output.status=401;
                              res.send(output);
                              return;    
                            }
                            output.cn=cm[ci].cn;
                            output.status=100;
                            res.send(output)  
                          });    
                        }else{
                          console.log('UserPModel.find results.length ==0 --> err');
                          output.status=411;
                          res.send(output);    
                        }  
                      });           
                    }else{
                      console.log('PostModel.find results.length ==0 --> err');
                      output.status=402;
                      res.send(output);
                      return;
                    } 
                  });
                });  
              }else{
                output.status=500;
                res.send(output);
                return;  
              }    
            }else{
              database.TkModel.where({_id:user_id}).update({l:ct,r:1},function(err){
                if(err){
                  console.log('TkModel.update err');
                  output.status=402;
                  res.send(output);
                  return;    
                }
                  database.LcModel.find({_id:post_id},function(err,results){
                    if(err){
                      console.log('CommentModel.find err');
                      output.status=401;
                      res.send(output);
                      return;    
                    }
                    if(results.length>0){
                      cm=results[0]._doc.cm;   
                      database.UserPModel.find({_id:user_id},function(err,results){
                        if(err){
                          console.log('UserPModel.find err');
                          output.status=409;
                          res.send(output);
                          return;    
                        }
                        if(results.length>0){
                          var nn=results[0]._doc.nn;
                          function checkCm(em) {
                            return em.ct==ti&&em.nn==ni;
                          }
                          var ci=cm.findIndex(checkCm);
                          if(ci==-1){output.status=401; res.send(output); return;}    
                          var t_cm=cm[ci].cm;
                          t_cm.unshift({_id:user_id,nn:nn,txt:text,ct:c_t});
                          t_cm=t_cm.splice(0,300);
                          var cm3={_id:cm[ci]._id,txt:cm[ci].txt,ct:cm[ci].ct,nn:cm[ci].nn,cn:(cm[ci].cn+1),cm:t_cm};
                          cm.splice(ci,1,cm3);   
                          database.LcModel.where({_id:post_id}).update({cm:cm},function(err){
                            if(err){
                              console.log('LcModel.update err');
                              output.status=401;
                              res.send(output);
                              return;    
                            }
                            output.cn=cm[ci].cn;
                            output.status=100;
                            res.send(output)  
                          });    
                        }else{
                          console.log('UserPModel.find results.length ==0 --> err');
                          output.status=411;
                          res.send(output);    
                        }  
                      });           
                    }else{
                      console.log('PostModel.find results.length ==0 --> err');
                      output.status=402;
                      res.send(output);
                      return;
                    } 
                  });
              });   
            }
          }else{
            console.log('TkModel.find results.length ==0 -> err');
            output.status=402;
            res.send(output);  
          }    
        });
    }else{
        output.status = 410;
        res.send(output);
    }
}
module.exports.replysl = replysl;