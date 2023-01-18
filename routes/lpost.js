var lpost = function(req,res){
    var _id = req.body._id || 'script';
    var text = req.body.text || ' ';
    var lat=req.body.lat;
    var long=req.body.long;
    var xss = require("xss");
    text=xss(text);    
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
          console.log('lpost: TkModel.find err');
          output.status=501;
          res.send(output);
          return;    
        }  
        if(results.length>0){
          var dcp=results[0]._doc.dcp;
          if(dcp>created_time+60000000){
            output.status=999;
            output.dcp=dcp;  
            res.send(output);
            return;  
          }    
          if(results[0]._doc._id!=_id){
            console.log('ddos detected-- hacker stoled other token or objectid');
            output.status=502;
            res.send(output);
            return;  
          }
          if(ct==results[0]._doc.q){
            var rdn = results[0]._doc.j;
            if(rdn<97){
              rdn++
              database.TkModel.where({_id:_id}).update({j:rdn},function(err){
                if(err){
                  console.log('lpost: TkModel.update err');
                  output.status=402;
                  res.send(output);
                  return;    
                }
                database.UserPModel.find({_id:_id},function(err,results){
                  if(err){
                    console.log('UserPModel.find err');
                    output.status=401;
                    res.send(output);
                    return;  
                  }
                  if(results.length>0){
                    var tff=[];  
                    for(var i=-1;i<=2;i++){
                      var tfl1=Math.floor(lat*1000)+i;    
                      for(var j=-1;j<=2;j++){
                        var tfl2=Math.floor(long*1000)+j; 
                        tff.push((tfl1+''+tfl2));  
                      }    
                    } 
                    var nn=results[0]._doc.nn;
                    var lpost = new database.LpModel({"user_id":_id,"nn":nn,"text":text,"ct":created_time,"pt":created_time,ff:tff,p:[lat,long]});
                    lpost.save(function(err,results){
                      if(err){
                        output.status = 401;
                        res.send(output);
                        return;
                      }
                      if(results){
                        output._id=results._doc._id;
                        var cc = new database.LcModel({"_id":results._doc._id});
                        cc.save(function(err){
                          if(err){
                            console.log('lc.save err');  
                            output.status=401;
                            res.send(output);
                            return;  
                          }
                          output.post_id=results._doc._id;    
                          output.status=100;
                          res.send(output);      
                        });  
                      }else{
                        console.log('lpostModel에 post document를 저장하고 난 후의 results 값이 없음 --> 에러로 간주할 것.');
                        output.status =402;
                        res.send(output);
                      }
                    });                      
                  }else{
                    console.log('UserPModel.find results.length==0 --> err');
                    output.status=402;
                    res.send(output);  
                  }    
                });  
                  //
              });    
            }else{
              console.log('하루 이용 초과');
              output.status=102;
              res.send(output);    
            }  
          }else{
            database.TkModel.where({_id:_id}).update({q:ct,j:1},function(err){
              if(err){
                console.log('lpost: TkModel.update err');
                output.status=405;
                res.send(output);
                return;  
              }
            database.UserPModel.find({_id:_id},function(err,results){
              if(err){
                console.log('UserPModel.find err');
                output.status=401;
                res.send(output);
                return;  
              }
              if(results.length>0){
                var tff=[];  
                for(var i=-1;i<=2;i++){
                  var tfl1=Math.floor(lat*1000)+i;    
                  for(var j=-1;j<=2;j++){
                    var tfl2=Math.floor(long*1000)+j; 
                    tff.push((tfl1+''+tfl2));  
                  }    
                } 
                var nn=results[0]._doc.nn;
                var lpost = new database.LpModel({"user_id":_id,"nn":nn,"text":text,"ct":created_time,"pt":created_time,ff:tff,p:[lat,long]});
                lpost.save(function(err,results){
                  if(err){
                    output.status = 401;
                    res.send(output);
                    return;
                  }
                  if(results){
                    output._id=results._doc._id;
                    var cc = new database.LcModel({"_id":results._doc._id});
                    cc.save(function(err){
                      if(err){
                        console.log('lc.save err');  
                        output.status=401;
                        res.send(output);
                        return;  
                      }
                      output.post_id=results._doc._id;    
                      output.status=100;
                      res.send(output);      
                    });  
                  }else{
                    console.log('lpostModel에 post document를 저장하고 난 후의 results 값이 없음 --> 에러로 간주할 것.');
                    output.status =402;
                    res.send(output);
                  }
                });                    
              }else{
                console.log('UserPModel.find results.length==0 --> err');
                output.status=402;
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
module.exports.lpost = lpost;