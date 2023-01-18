var pushl = function(req,res){
  var _id1= req.body._id1||0;
  var id1= req.body.id1||0;    
  var id2= req.body.id2||0;
  var _id2;    
  var post_id=req.body.post_id||0;
  var ln =req.body.ln||0;
  var FCM = require('fcm-node');
  var database = req.app.get('database');
  var output ={};
  var client_token;
  var ct = parseInt(Date.now());    
  var name;
  var al=[];
  var al2=[];
  var al3={};
  var i4;    
  if(database){
    database.TkModel.find({id:id2},function(err,results){
      if(err){
        console.log('TkModel.find err');
        output.status=401;
        res.send(output);
        return;  
      }
      if(results.length>0){
        i4=results[0]._doc.i4;
        _id2=results[0]._doc._id;  
        client_token = results[0]._doc.tk;   
        database.AlModel.find({_id:_id2},function(err,results){
          if(err){
            console.log('AlModel.find err');
            output.status=402;
            res.send(output);  
          }
          if(results.length>0){
            al=results[0]._doc.al;
            function checkAl(em) {
              return em.type=='4'&&em.post_id==post_id;
            }
            afi=al.findIndex(checkAl);
            if(afi!=-1){
              al.splice(afi,1);
              al2=al;  
            }else{
              al2=al.splice(0, 199);  
            }                  
            database.UserPModel.find({_id:_id1},function(err,results){
              if(err){
                console.log('UserPModel.find err');
                output.status=406;
                res.send(output);
                return;  
              }
              if(results.length>0){
                if(id1!=results[0]._doc.id){
                  console.log('window.localStorage[_id] modify detection');
                  output.status=500;
                  return;    
                } 
                name=results[0]._doc.name;
                al3 = {type:'4',id:id1,name:results[0]._doc.name,img:results[0]._doc.img,post_id:post_id,ln:ln,ct:ct,d:1};                      
                al2.unshift({type:'4',id:id1,name:results[0]._doc.name,post_id:post_id,ln:ln,ct:ct,d:1});  
                database.AlModel.where({_id:_id2}).update({al:al2,d:1},function(err){
                  if(err){
                    console.log('AlModel.update err');
                    output.status=403;
                    res.send(output);
                    return;  
                  }
                  if(i4==0){
                    var serverKey = 'AAAASxph3LE:APA91bHwCvOclbNM_sQhwsaQmU4sop7s3wMMbORX-4kzSOmhBaAkPOzOIZcOl1ETarg6_dbRnnneZr4wEfRj62av2zf0f4HjO4-qAQyiFaelhnL7ediQ2yJTTn4YpefLplJQB1U3WppH';
                    var push_data = {
                      to: client_token,
                      notification: {
                        title: "새로운 좋아요",
                        body: name+"님이 게시물을 좋아합니다.",
                        sound: "default",
                        icon: "fcm_push_icon"
                      },
                      priority: "high",
                      restricted_package_name: "com.app.yomencity",
                      data: al3
                    };
                    var fcm = new FCM(serverKey);

                    fcm.send(push_data, function(err, response) {
                      if (err) {
                        output.status=700;
                        res.send(output);                              
                        return;
                      }
                      res.send(output);
                    });                      
                  }else{
                    output.status=101;
                    res.send(output);  
                  }                         
                });                      
              }else{
                console.log('UserPModel.find results.length==0');
                output.status=408;
                res.send(output);  
              }                      
            });  
          }else{
            console.log('AlModel.find results.length==0');
            output.status=405;
            res.send(output);  
          }
        });       
      }else{
        console.log('TkModel.find: results.length==0 -->err');
        output.status=411;
        res.send(output);  
      }    
    });  
  }else{
    console.log('pushl: no database');
    output.status=410;
    res.send(output);  
  }   
 
    
};
module.exports.pushl = pushl;