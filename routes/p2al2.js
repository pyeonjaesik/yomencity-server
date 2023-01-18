var p2al2 = function(req,res){
  var _id = req.body._id||0;
  var post_id = req.body.post_id||0;
  var nn=req.body.nn||0;
  var ni=req.body.ni;
  var ti=req.body.ti;
  var pnn=req.body.pnn;
  var txt=req.body.txt;  
  var FCM = require('fcm-node');
  var database = req.app.get('database');
  var ct = parseInt(Date.now());    
  var output ={};
  var serverKey = 'AAAASxph3LE:APA91bHwCvOclbNM_sQhwsaQmU4sop7s3wMMbORX-4kzSOmhBaAkPOzOIZcOl1ETarg6_dbRnnneZr4wEfRj62av2zf0f4HjO4-qAQyiFaelhnL7ediQ2yJTTn4YpefLplJQB1U3WppH';    
  if(database){
    database.LcModel.find({_id:post_id},function(err,results){
      if(err){
        console.log('LcModel.find err');
        output.status=401;
        res.send(output);
        return;  
      }
      if(results.length>0){
        var cm=results[0]._doc.cm;  
        function checkCm(em) {
          return em.ct==ti&&em.nn==ni;
        }
        var ci=cm.findIndex(checkCm);
        if(ci==-1){
          output.status=403;
          console.log('p2al2 ci==-1 -->err');
          res.send(output);
          return;    
        }
        var tcm=cm[ci];
        var tml=tcm.cm.length;
        var tk_s=[];
        for(var j=0;j<tml;j++){
          tk_s.push(tcm.cm[j]._id);    
        }
        tk_s.unshift(''+tcm._id);
        var utks = tk_s.reduce(function(a,b){
            if (a.indexOf(b) < 0 ) a.push(b);
            return a;
        },[]);
        var uti=utks.indexOf(_id);
        if(uti!=-1){utks.splice(uti,1);}
        var utl=utks.length;  
        var i=0;  
        var db_recycle=function(){
          if(i==utl){
            utks=utks.splice(0,14);
            var utksl=utks.length;
            var k=0;
            var ftks=[];  
            var db_recycle2=function(){
              if(k==utksl){  
                var push_data = {
                  registration_ids: ftks,
                  notification: {
                    title: "새로운 플래그 답글",
                    body: nn+"님이 플래그에 답글을 달았습니다.",
                    sound: "default",
                    icon: "fcm_push_icon"
                  },
                  priority: "high",
                  restricted_package_name: "com.app.yomencity",
                  data: {type:12,post_id:post_id,nn:nn,ni:ni,ti:ti,pnn:pnn,txt:txt}
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
                database.TkModel.find({_id:utks[k]},function(err,results){
                  if(err){
                    console.log('TkModel.find err');
                    k++;
                    db_recycle2();
                    return;  
                  }
                  if(results.length>0){
                    if(results[0]._doc.i12==0){
                      ftks.push(results[0]._doc.tk);   
                    }  
                    k++;
                    db_recycle2();  
                  }else{
                    console.log('TkModel.find results.length ==0 -->err');
                    k++;
                    db_recycle2();  
                  }    
                });  
              }    
            };
            db_recycle2();  
          }else{
            database.LaModel.find({_id:utks[i]},function(err,results){
              if(err){
                console.log('LaModel.find err');
                i++;
                db_recycle();
                return;  
              }
              if(results.length>0){
                var al=results[0]._doc.a;
                function checkAl(em) {
                  return em.type=='2'&&em._id==post_id&&em.ni==ni&&em.ti==ti;
                }
                var afi=al.findIndex(checkAl);
                if(afi==-1){
                  al.unshift({_id:post_id,type:2,n:1,ct:ct,ni:ni,ti:ti,nn:nn,pnn:pnn,txt:txt});  
                }else{
                  var tal=al[afi];  
                  al.splice(afi,1);
                  al.unshift({_id:post_id,type:2,n:(tal.n+1),ct:ct,ni:ni,ti:ti,nn:nn,pnn:pnn,txt:txt});  
                }
                al=al.splice(0,100);
                database.LaModel.where({_id:utks[i]}).update({a:al},function(err){
                  if(err){
                    console.log('LaModel.update err');
                    i++;
                    db_recycle();
                    return;  
                  }
                  i++;
                  db_recycle();    
                });  
              }else{
                console.log('LaModel.find results.length==0 -->err');
                i++;
                db_recycle();  
              }    
            });  
          }    
        };
        db_recycle();  
      }else{
        console.log('LcModel.find results.length==0 -->err');
        output.status=402;
        res.send(output);  
      }    
    });
  }else{
    console.log('p2al2: no database');
    output.status=410;
    res.send(output);  
  }    
};
module.exports.p2al2 = p2al2;