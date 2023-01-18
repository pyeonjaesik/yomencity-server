var mypost = function(req,res){
    var param_id = req.body.user_id || 'script';
    var paramid = req.body.userid || 'script';
    var paramname = req.body.username || 'script';
    var paramtext = req.body.text || ' ';
    var paramtext = paramtext.replace(/(\n|\r\n)/g, '<br>');
    var xss = require("xss");
    paramtext=xss(paramtext);    
    var tk=req.body.tk||'123';
    var created_time = parseInt(Date.now());
    var ct=parseInt(Date.now()/86400000);
    var output = {}; 
    var database = req.app.get('database');
    var output = {};
    if(tk.length<4){
      console.log('TkModel.find err');
      output.status=600;
      res.send(output);
      return;         
    }
    if(database){
      database.TkModel.find({tk:tk},function(err,results){
        if(err){
          console.log('TkModel.find err');
          output.status=501;
          res.send(output);
          return;    
        }
        if(results.length>0){
            //나중에 주석 풀 것
          if(results[0]._doc._id!=param_id){
            console.log('ddos detected-- hacker stoled other token or objectid');
            output.status=502;
            res.send(output);
            return;  
          }
          if(ct==results[0]._doc.d){
            var rdn = results[0]._doc.n;
            if(rdn<95){
              rdn++
              database.TkModel.where({_id:param_id}).update({n:rdn},function(err){
                if(err){
                  console.log('TkModel.update err');
                  output.status=402;
                  res.send(output);
                  return;    
                }
                var post = new database.PostModel({"userid":paramid,"user_id":param_id,"username":paramname,"text":paramtext,"created_time":created_time,"tk":[paramid]});
                post.save(function(err,results){
                    if(err){
                        output.status = 4;
                        res.send(output);
                        return;
                    }
                    if(results){
                        var love =new database.LoveModel({_id:results._doc._id});
                        love.save(function(err,results){
                          if(err){
                            console.log('making loveModel err');
                            output.status=4;
                            res.send(output);
                            return;  
                          }
                          if(results){
                            output.status=1;
                            output.post_id= results._doc._id;
                            res.send(output);                   
                          }else{
                            output.status=4;
                            res.send(output);
                            console.log('after LoveModel  results.length==0 -->err');  
                          }
                        });

                    }else{
                      console.log('PostModel에 post document를 저장하고 난 후의 results 값이 없음 --> 에러로 간주할 것.');
                      output.status =401;
                      res.send(output);
                    }
                });                  
              });    
            }else{
              output.status=102;
              res.send(output);    
            }  
          }else{
            database.TkModel.where({_id:param_id}).update({d:ct,n:1},function(err){
              if(err){
                console.log('TkModel.update err');
                output.status=405;
                res.send(output);
                return;  
              }
                var post = new database.PostModel({"userid":paramid,"user_id":param_id,"username":paramname,"text":paramtext,"created_time":created_time,"tk":[paramid]});
                post.save(function(err,results){
                    if(err){
                        output.status = 4;
                        res.send(output);
                        return;
                    }
                    if(results){
                        var love =new database.LoveModel({_id:results._doc._id});
                        love.save(function(err,results){
                          if(err){
                            console.log('making loveModel err');
                            output.status=4;
                            res.send(output);
                            return;  
                          }
                          if(results){
                            output.status=1;
                            output.post_id= results._doc._id;
                            res.send(output);                      
                          }else{
                            output.status=4;
                            res.send(output);
                            console.log('after LoveModel  results.length==0 -->err');  
                          }
                        });

                    }else{
                      console.log('PostModel에 post document를 저장하고 난 후의 results 값이 없음 --> 에러로 간주할 것.');
                      output.status =401;
                      res.send(output);
                    }
                });                  
            });  
          }
        }else{
          console.log('TkModel.find results.length ==0 -->token changed or ddos');
          output.status=600;
          res.send(output);    
        }  
      });
    }else{
        console.log('mypost: database 없음');
        output.status = 10;
        res.send(output);
    }
};
module.exports.mypost = mypost;