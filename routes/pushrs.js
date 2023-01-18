var pushrs = function(req,res){
  var _id1 = req.body._id1||0;
  var id1 = req.body.id1||0;    
  var tk_arr = req.body.tk_arr||[0];
  var name = req.body.name||0;
  var post_id = req.body.post_id||0;
  var comment_id = req.body.comment_id||0;
  var cn = req.body.cn||0;
  cn--;
  var img = req.body.img||0;
  var FCM = require('fcm-node');
  var database = req.app.get('database');
  var output ={};
  var tk_arr_s=[];
  var t_leng=tk_arr.length;
  var ct = parseInt(Date.now());    
  var i=0;
  var al=[];
  var al2=[];
  var al3={type:'3',id:id1,name:name,post_id:post_id,comment_id:comment_id,img:img,cn:cn,ct:ct,d:1};    
  if(database){
    database.UserModel.find({_id:_id1},function(err,results){
      if(err){
        console.log('UserModel.find err');
        output.status=501;
        res.send(output);
        return;  
      }
      if(results.length>0){
        if(id1==results[0]._doc.id){
        var db_recycle=function(){   
          if(i==t_leng){
            if(t_leng==0){
              output.status=102;
              res.send(output);
              return;
            }  
            var serverKey = 'AAAASxph3LE:APA91bHwCvOclbNM_sQhwsaQmU4sop7s3wMMbORX-4kzSOmhBaAkPOzOIZcOl1ETarg6_dbRnnneZr4wEfRj62av2zf0f4HjO4-qAQyiFaelhnL7ediQ2yJTTn4YpefLplJQB1U3WppH';
            var push_data = {
              registration_ids: tk_arr_s,
              notification: {
                title: "새로운 답글",
                body: name+"님이 답글을 달았습니다.",
                sound: "default",
                icon: "fcm_push_icon"
              },
              priority: "high",
              restricted_package_name: "com.app.yomencity",
              data: al3
            };
            var fcm = new FCM(serverKey);
            if(tk_arr_s.length>0){
                fcm.send(push_data, function(err, response) {
                  if (err) {
                    output.status=700;
                    res.send(output);                      
                    return;
                  }
                  output.status=100;
                  res.send(output);
                  return;    
                });            
            }else{
              output.status=101;
              res.send(output);
              return;    
            }            
          }
          if(i<t_leng){
            if(tk_arr[i]==id1){
              i++;
              db_recycle();    
            }else{
              database.TkModel.find({id:tk_arr[i]},function(err,results){
                if(err){
                  console.log('TkModel.find err');
                  output.status=401;
                  res.send(output);
                  return;    
                }
                if(results.length>0){
                  if(results[0]._doc.i3==0){  
                    tk_arr_s.push(results[0]._doc.tk); 
                  }
                  var t_id=results[0]._doc._id;    
                  database.AlModel.find({_id:t_id},function(err,results){
                    if(err){
                      console.log('AlModel.find err');
                      output.status=407;
                      res.send(output);
                      return;    
                    }
                    if(results.length>0){
                      al=results[0]._doc.al;
                      function checkAl(em) {
                        return em.type=='3'&&em.comment_id==comment_id;
                      }
                      afi=al.findIndex(checkAl);
                      if(afi!=-1){
                        al.splice(afi,1);
                        al2=al;  
                      }else{
                        al2=al.splice(0, 199);  
                      }
                      al2.unshift({type:'3',id:id1,name:name,post_id:post_id,comment_id:comment_id,cn:cn,ct:ct,d:1});
                      database.AlModel.where({_id:t_id}).update({al:al2,d:1},function(err){
                        if(err){
                          console.log('AlModel.update err');
                          res.send(output);
                          return;    
                        }
                        i++;
                        db_recycle();                       
                      });      
                    }else{
                      console.log('AlModel.find results.length ==0 -->err');
                      i++;
                      db_recycle();
                    }  
                  });    
                }else{
                  console.log('TkModel.find results.length ==0 -->err');
                  i++;
                  db_recycle();    
                }  
              });        
            }          
          }

        }
        db_recycle();            
        }else{
          console.log('window.localStorage[_id] modify detection');
          output.status=500;
          res.send(output);
          return;    
        }  
      }else{
        console.log('UserModel.find results.length ==0 --> err');
        output.status=502;
        res.send(output);
        return;  
      }    
    });
  }else{
    console.log('pushrs: no database');
    output.status=410;
    res.send(output);  
  }   
};
module.exports.pushrs = pushrs;