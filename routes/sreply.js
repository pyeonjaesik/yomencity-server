var sreply = function(req,res){
    var paramcomment_id = req.body.comment_id || req.query.comment_id||'123';
    var paramtext = req.body.text ||'123';
    var tok=req.body.tk||'123';
    var xss = require("xss");
    paramtext=xss(paramtext);    
    var paramuser_id = req.body.user_id || req.body.user_id;
    var id=req.body.id;
    var created_time = parseInt(Date.now());
    var created_day = parseInt(created_time/86400000);    
    var database = req.app.get('database');
    var output = {};
    var name;
    var img;
    var cn;
    var cm = [];
    var tk = [];
    var tk_s = [];
    var tk_m;
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
                database.TkModel.where({_id:paramuser_id}).update({r:rdn},function(err){
                  if(err){
                    console.log('TkModel.update err');
                    output.status=403;
                    res.send(output);
                    return;  
                  }  
                  database.CommentModel.find({_id:paramcomment_id},function(err,results){
                    if(err){
                      console.log('CommentModel.find err');
                      output.status=401;
                      res.send(output);
                      return;    
                    }
                    if(results.length>0){
                      cm=results[0]._doc.cm.splice(0,max_c);    
                      tk=results[0]._doc.tk;
                      tk_s=tk;
                      cn=results[0]._doc.cn;
                      cn++;
                      if(paramuser_id!=results[0]._doc.user_id){
                        var tki= tk.indexOf(id);   
                        if(tki ==-1){
                          tk.push(id);                  
                        }else{
                          tk.splice(tki,1);
                          tk.push(id); 
                        }
                        if(tk.length>15){
                          tk.splice(1,1);
                        }              
                      }    
                      var tk_m_arr=[id];  
                      database.UserPModel.find({_id:paramuser_id},function(err,results){
                        if(err){
                          console.log('UserPModel.find err');
                          output.status=409;
                          res.send(output);
                          return;    
                        }
                        if(results.length>0){
                          name=results[0]._doc.name;
                          img=results[0]._doc.img;
                          var reply = new database.ScommentModel({user_id:paramuser_id,username:name,text:paramtext,created_time:created_time,tk:tk_m_arr});
                          reply.save(function(err,results){
                            if(err){
                              console.log('sreply.save err');
                              output.status =405;
                              res.send(output);
                              return;    
                            }
                            if(results){
                              var cm_id = results._doc._id;
                              cm.unshift(cm_id);
                              database.CommentModel.where({_id:paramcomment_id}).update({tk:tk,cm:cm,cn:cn},function(err){
                                if(err){
                                  console.log('PostModel.update err');
                                  output.status=406;
                                  res.send(output);
                                  return;    
                                }
                                output.status=100;
                                output.tk_s=[];
                                output.tk_s=tk_s;
                                output.img=img;
                                output.cn=cn;
                                output.rs_id=cm_id;
                                res.send(output);
                              });    
                            }else{
                              console.log('sreply.save: no results -- >err');
                              output.status=406;
                              res.send(output);    
                            }
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
              database.TkModel.where({_id:paramuser_id}).update({l:ct,r:1},function(err){
                if(err){
                  console.log('TkModel.update err');
                  output.status=402;
                  res.send(output);
                  return;    
                }
              database.CommentModel.find({_id:paramcomment_id},function(err,results){
                if(err){
                  console.log('CommentModel.find err');
                  output.status=401;
                  res.send(output);
                  return;    
                }
                if(results.length>0){
                  cm=results[0]._doc.cm.splice(0,max_c);    
                  tk=results[0]._doc.tk;
                  tk_s=tk;
                  cn=results[0]._doc.cn;
                  cn++;
                  if(paramuser_id!=results[0]._doc.user_id){
                    var tki= tk.indexOf(id);   
                    if(tki ==-1){
                      tk.push(id);                  
                    }else{
                      tk.splice(tki,1);
                      tk.push(id); 
                    }
                    if(tk.length>15){
                      tk.splice(1,1);
                    }              
                  }    
                  var tk_m_arr=[id];  
                  database.UserPModel.find({_id:paramuser_id},function(err,results){
                    if(err){
                      console.log('UserPModel.find err');
                      output.status=409;
                      res.send(output);
                      return;    
                    }
                    if(results.length>0){
                      name=results[0]._doc.name;
                      img=results[0]._doc.img;
                      var reply = new database.ScommentModel({user_id:paramuser_id,username:name,text:paramtext,created_time:created_time,tk:tk_m_arr});
                      reply.save(function(err,results){
                        if(err){
                          console.log('sreply.save err');
                          output.status =405;
                          res.send(output);
                          return;    
                        }
                        if(results){
                          var cm_id = results._doc._id;
                          cm.unshift(cm_id);
                          database.CommentModel.where({_id:paramcomment_id}).update({tk:tk,cm:cm,cn:cn},function(err){
                            if(err){
                              console.log('PostModel.update err');
                              output.status=406;
                              res.send(output);
                              return;    
                            }
                            output.status=100;
                            output.tk_s=[];
                            output.tk_s=tk_s;
                            output.img=img;
                            output.cn=cn;
                            output.rs_id=cm_id;
                            res.send(output);
                          });    
                        }else{
                          console.log('sreply.save: no results -- >err');
                          output.status=406;
                          res.send(output);    
                        }
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
module.exports.sreply = sreply;