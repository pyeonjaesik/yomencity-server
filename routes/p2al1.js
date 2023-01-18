var p2al1 = function(req,res){
  var _id = req.body._id||0;
  var post_id = req.body.post_id||0;
  var nn=req.body.nn||0;    
  var FCM = require('fcm-node');
  var database = req.app.get('database');
  var ct = parseInt(Date.now());    
  var output ={};
  var serverKey = 'AAAASxph3LE:APA91bHwCvOclbNM_sQhwsaQmU4sop7s3wMMbORX-4kzSOmhBaAkPOzOIZcOl1ETarg6_dbRnnneZr4wEfRj62av2zf0f4HjO4-qAQyiFaelhnL7ediQ2yJTTn4YpefLplJQB1U3WppH';    
  if(database){
    database.LpModel.find({_id:post_id},function(err,results){
      if(err){
        console.log('LpModel.find err');
        output.status=401;
        res.send(output);
        return;  
      }
      if(results.length>0){
        var _id2=results[0]._doc.user_id;
        var pnn=results[0]._doc.nn;  
        if(_id==_id2){
          output.status=102;
          res.send(output);
          return;    
        }  
        database.TkModel.find({_id:_id2},function(err,results){
          if(err){
            console.log('TkModel.find err');
            output.status=402;
            res.send(output);
            return;    
          }
          var tk=results[0]._doc.tk;
          var i11=results[0]._doc.i11;    
          database.LaModel.find({_id:_id2},function(err,results){
            if(err){
              console.log('LaModel.find err');
              output.status=404;
              res.send(output);
              return;    
            }
            if(results.length>0){
              var al=results[0]._doc.a;
              function checkAl(em) {
                return em.type=='1'&&em._id==post_id;
              }
              var afi=al.findIndex(checkAl);
              if(afi==-1){
                al.unshift({_id:post_id,type:1,n:1,ct:ct,nn:nn,pnn:pnn});  
              }else{
                var tal=al[afi];  
                al.splice(afi,1);
                al.unshift({_id:post_id,type:1,n:(tal.n+1),ct:ct,nn:nn,pnn:pnn});  
              }
              al=al.splice(0,100);
              database.LaModel.where({_id:_id2}).update({a:al},function(err){
                if(err){
                  console.log('LaModel.update');
                  output.status=405;
                  res.send(output);
                  return;    
                }
                if(i11==0){
                  var pdata={type:11,post_id:post_id,nn:nn,pnn:pnn};  
                  var push_data = {
                    to: tk,
                    notification: {
                      title: "새로운 플래그 댓글",
                      body: nn+"님이 플래그에 댓글을 달았습니다.",
                      sound: "default",
                      icon: "fcm_push_icon"
                    },
                    priority: "high",
                    restricted_package_name: "com.app.yomencity",
                    data: pdata
                  };
                  var fcm = new FCM(serverKey);
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
                }                  
              });    
            }else{
              console.log('LaModel.find results.length ==0 -->err');
              output.status=405;
              res.send(output);    
            }  
          });    
        });          
      }else{
        console.log('LpModel.find results.length ==0 -->err');
        output.status=402;
        res.send(output);  
      }        
    });  
  }else{
    console.log('p2al1: no database');
    output.status=410;
    res.send(output);  
  }    
};
module.exports.p2al1 = p2al1;