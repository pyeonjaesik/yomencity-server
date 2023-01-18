var replypl = function(req,res){
    var post_id = req.body.post_id||'123';
    var text = req.body.text||'123';
    var tok=req.body.tk||'123';
    var xss = require("xss");
    text=xss(text);
    var c_t = parseInt(Date.now());   
    var database = req.app.get('database');
    var output = {};
    var cn;
    var cm = [];
    var max_c = 300;
    var maxim=200;
    var img;
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
            var user_id = results[0]._doc._id;  
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
                database.LpModel.find({_id:post_id},function(err,results){
                if(err){
                  console.log('LpostModel.find err');
                  output.status=401;
                  res.send(output);
                  return;    
                }
                if(results.length>0){    
                  cn=results[0]._doc.cn;
                  cn++;               
                  database.UserPModel.find({_id:user_id},function(err,results){
                    if(err){
                      console.log('UserPModel.find err');
                      output.status=409;
                      res.send(output);
                      return;    
                    }
                    if(results.length>0){
                      nn=results[0]._doc.nn;    
                      database.LcModel.find({_id:post_id},function(err,results){
                        if(err){
                          console.log('LcModel.find err');
                          output.status=412;
                          res.send(output);
                          return;    
                        }
                        if(results.length>0){
                          cm=results[0]._doc.cm.splice(0,max_c);
                          cm.unshift({_id:user_id,txt:text,ct:c_t,nn:nn,cn:0,cm:[]});
                          database.LpModel.where({_id:post_id}).update({cn:cn},function(err){
                            if(err){
                              console.log('LpModel.update err');
                              output.status=414;
                              res.send(output);
                              return;    
                            }
                            database.LcModel.where({_id:post_id}).update({cm:cm},function(err){
                              if(err){
                                console.log('LcModel.update err');
                                output.status=415;
                                res.send(output);
                                return;  
                              }
                              output.status=100;
                              output.ct=c_t;    
                              output.cn=cn;
                              res.send(output);
                            });  
                          });    
                        }else{
                          console.log('LcModel.find resutls.length==0 -->err');
                          output.status=413;
                          res.send(output);    
                        }  
                      });    
                    }else{
                      console.log('UserPModel.find results.length ==0 -->err');
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
                database.LpModel.find({_id:post_id},function(err,results){
                if(err){
                  console.log('LpostModel.find err');
                  output.status=401;
                  res.send(output);
                  return;    
                }
                if(results.length>0){    
                  cn=results[0]._doc.cn;
                  cn++;               
                  database.UserPModel.find({_id:user_id},function(err,results){
                    if(err){
                      console.log('UserPModel.find err');
                      output.status=409;
                      res.send(output);
                      return;    
                    }
                    if(results.length>0){
                      nn=results[0]._doc.nn;    
                      database.LcModel.find({_id:post_id},function(err,results){
                        if(err){
                          console.log('LcModel.find err');
                          output.status=412;
                          res.send(output);
                          return;    
                        }
                        if(results.length>0){
                          cm=results[0]._doc.cm.splice(0,max_c);
                          cm.unshift({_id:user_id,txt:text,ct:c_t,nn:nn,cn:0,cm:[]});
                          database.LpModel.where({_id:post_id}).update({cn:cn},function(err){
                            if(err){
                              console.log('LpModel.update err');
                              output.status=414;
                              res.send(output);
                              return;    
                            }
                            database.LcModel.where({_id:post_id}).update({cm:cm},function(err){
                              if(err){
                                console.log('LcModel.update err');
                                output.status=415;
                                res.send(output);
                                return;  
                              }
                              output.cn=cn;
                              output.ct=c_t;
                              output.status=100;
                              res.send(output);    
                            });  
                          });    
                        }else{
                          console.log('LcModel.find resutls.length==0 -->err');
                          output.status=413;
                          res.send(output);    
                        }  
                      });    
                    }else{
                      console.log('UserPModel.find results.length ==0 -->err');
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

module.exports.replypl = replypl;