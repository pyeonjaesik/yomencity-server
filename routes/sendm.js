var sendm = function(req,res){
  var txt = req.body.txt;
  var xss = require("xss");
  txt=xss(txt);
  var _id1 =req.body._id1;
  var id1= req.body.id1;    
  var id2 = req.body.id2;
  var FCM = require('fcm-node');
  var key= 'AAAASxph3LE:APA91bHwCvOclbNM_sQhwsaQmU4sop7s3wMMbORX-4kzSOmhBaAkPOzOIZcOl1ETarg6_dbRnnneZr4wEfRj62av2zf0f4HjO4-qAQyiFaelhnL7ediQ2yJTTn4YpefLplJQB1U3WppH';   
  var database = req.app.get('database');
  var output = {};
  var client_token;
  var cfi;
  var ch=[];    
  var ct = parseInt(Date.now());
  if(database){
    database.TkModel.find({id:id2},function(err,results){
      if(err){
        console.log('TkModel.find err');
        output.status=401;
        res.send(output);
        return;  
      }
      if(results.length>0){
        client_token = results[0]._doc.tk;
        database.ChModel.find({_id:_id1},function(err,results){
          if(err){
            console.log('ChModel.find err');
            output.status=403;
            res.send(output);
            return;  
          }
          if(results.length>0){
            if(id1!=results[0]._doc.id){
              console.log('window.localStorage[_id] modify dectected');
              output.status=500;
              res.send(output);
              return;    
            }  
            ch = results[0]._doc.ch;
            var p_n=results[0]._doc.n;  
            function checkCh(em) {
              return em.id==id2;
            }
            cfi=ch.findIndex(checkCh);
            if(cfi!=-1){
              var cr_id_t=ch[cfi].cr_id;
              var b1_1=ch[cfi].b1;
              b1_1++;    
              ch.splice(cfi,1);
              ch.unshift({id:id2,cr_id:cr_id_t,b1:b1_1,b2:0});   
              database.ChModel.where({_id:_id1}).update({ch:ch},function(err){
                if(err){
                  console.log('ChModel.update1 err');
                  output.status=411;
                  res.send(output);
                  return;    
                }
                database.ChModel.find({id:id2},function(err,results){
                  if(err){
                    console.log('ChModel.find err');
                    output.status=412;
                    res.send(output);
                    return;  
                  }
                  if(results.length>0){
                    var ch2 = results[0]._doc.ch;
                    function checkCh2(em) {
                      return em.id==id1;
                    }
                    var cfi2=ch2.findIndex(checkCh2);
                    if(cfi2!=-1){
                      var b2_2=ch2[cfi2].b2;
                      b2_2++;
                      ch2.splice(cfi2,1);
                      ch2.unshift({id:id1,cr_id:cr_id_t,b1:0,b2:b2_2});
                      database.ChModel.where({id:id2}).update({ch:ch2},function(err){
                        if(err){
                          console.log('ChModel.update err');
                          output.status=413;
                          res.send(output);
                          return;    
                        }
                        database.CrModel.find({_id:cr_id_t},function(err,results){
                          if(err){
                            console.log('CrModel.find err');
                            output.status=414;
                            res.send(output);
                            return;  
                          }
                          if(results.length>0){
                            var id_arr=results[0]._doc.id;
                            var ci = id_arr.indexOf(id1);
                            var t_txt={t:txt,ci:ci,ct:ct};
                            var a_txt=results[0]._doc.txt;
                            a_txt.unshift(t_txt);
                            var a_txt2= a_txt.splice(0,299);
                            database.CrModel.where({_id:cr_id_t}).update({txt:a_txt2},function(err){
                              if(err){
                                console.log('CrModel.update err');
                                output.status=415;
                                res.send(output);
                                return;  
                              }
                                var p_txt = txt.replace(/(<br>)/g, '\n');
                                var push_data = {
                                  to: client_token,
                                  notification: {
                                    title: p_n+'님의 메시지',
                                    body: p_txt,
                                    sound: "default",
                                    icon: "fcm_push_icon"
                                  },
                                  priority: "high",
                                  restricted_package_name: "com.app.yomencity",
                                  data: {type:6,id:id1,txt:t_txt.t}
                                };
                                var fcm = new FCM(key);

                                fcm.send(push_data, function(err, response) {
                                  if (err) {
                                    console.log(err);
                                    output.status=700;
                                    res.send(output);                                      
                                    return;
                                  }
                                  output.status=100;
                                  res.send(output);
                                });                                 
                                  
                            });  
                          }else{
                            console.log('CrModel.find results.length ==0 -->err');
                            output.status=415;
                            res.send(output);  
                          }    
                        });  
                      });    
                    }else{
                      console.log('cfi2==-1 -->err');
                      output.status=413;
                      res.send(output);    
                    }  
                  }else{
                    console.log('ChModel.find results.length==0 --> err');
                    output.status=413;
                    res.send(output);  
                  }
                });  
              });   
            }else{
              var t_txt={t:txt,ci:0,ct:ct};    
              var cr = new database.CrModel({id:[id1,id2],a:[0,0],txt:[t_txt]});
              cr.save(function(err,results){
                if(err){
                  console.log('cr.save err');
                  output.status=404;
                  res.send(output);
                  return;    
                }
                var cr_id2=results._doc._id;
                database.ChModel.find({_id:_id1},function(err,results){
                  if(err){
                    console.log('ChModel.find1 err');
                    output.status=405;
                    res.send(output);
                    return;  
                  }
                  if(results.length>0){
                    var ch2 = results[0]._doc.ch;
                    ch2.unshift({id:id2,cr_id:cr_id2,b1:1,b2:0});
                    database.ChModel.where({_id:_id1}).update({ch:ch2},function(err){
                      if(err){
                        console.log('ChModel update1 err');
                        output.status=407;
                        res.send(output);
                        return;
                      }
                      database.ChModel.find({id:id2},function(err,results){
                        if(err){
                          console.log('ChModel find2 err');
                          output.status=408;
                          res.send(output);
                          return;    
                        }
                        var ch3 = results[0]._doc.ch;
                        ch3.unshift({id:id1,cr_id:cr_id2,b1:0,b2:1});
                        database.ChModel.where({id:id2}).update({ch:ch3},function(err){
                          if(err){
                            console.log('ChModel update2 err');
                            output.status=409;
                            res.send(output);
                            return;  
                          }
                            var p_txt=txt;
                            var push_data = {
                              to: client_token,
                              notification: {
                                title: p_n+'님의 메시지',
                                body: p_txt,
                                sound: "default",
                                icon: "fcm_push_icon"
                              },
                              priority: "high",
                              restricted_package_name: "com.app.yomencity",
                              data: {type:6,id:id1,txt:t_txt.t}
                            };
                            var fcm = new FCM(key);

                            fcm.send(push_data, function(err, response) {
                              if (err) {
                                output.status=700;
                                res.send(output);                                  
                                return;
                              }
                              output.status=101;
                              res.send(output);
                            });                            
                        });  
                      });
                    });  
                  }else{
                    console.log('ChModel.find results.length==0 -->err');
                    output.status=406;
                    res.send(output);                      
                  }    
                });  
              });    
            }              
          }else{
            console.log('ChModel.find results.length ==0 --> err');
            output.status=404;
            res.send(output);
          }    
        });
      }else{
        console.log('TkModel.find results.length==0 -->err'); 
        output.status=402;
        res.send(output);
        return;  
      }
    });  
  }else{
    console.log('sendm: no database');
    output.status=410;
    res.send(output);  
  }
};
module.exports.sendm = sendm;