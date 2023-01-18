var signup = function(req, res) {
    console.log('signup');
    var xss = require("xss");   
	var paramId = req.body.id || req.query.id;
    var paramPassword = req.body.password || req.query.password;
    var paramName = req.body.name || req.query.name;
    var paramAge = req.body.age || req.query.age;
    var paramGender = req.body.gender || req.query.gender;
    var ph=req.body.ph;
    var output={};
  var er=0;  
  for (var i=0; i<paramId.length; i++)  {
    var chk = paramId.substring(i,i+1); 
    if(!chk.match(/[a-z]|[A-Z]|[0-9]/)) { 
      er = er + 1; 
    } 
  } 
  if (er > 0) {
    console.log('not valid info');
    output.status=800;
    res.send(output);
    return;
  }
  if(paramId.length<1||paramId.length>13){
    console.log('not valid info11');
    output.status=800;
    res.send(output)    
    return;  
  }
  er=0;  
  for (var i=0; i<paramName.length; i++)  {
    var chk = paramName.substring(i,i+1); 
    if(!chk.match(/[가-힣]|[a-z]|[A-Z]/)) { 
      er = er + 1; 
    } 
  } 
  if (er > 0) {
    console.log('not valid info22');
    output.status=800;
    res.send(output);
    return;
  }
  if(paramName.length<1||paramName.length>11){
    console.log('not valid info33');
    output.status=800;
    res.send(output)    
    return;  
  } 
  if(paramAge<1890||paramAge>2020){
    console.log('not valid info44');
    output.status=800;
    res.send(output)    
    return;       
  } 
  if(paramPassword.length<6||paramPassword.length>20){
    console.log('not valid info55');
    output.status=800;
    res.send(output)    
    return;      
  }
  if(paramGender=='1'&&paramGender=='2'){
    console.log('not valid info66');
    output.status=800;
    res.send(output)    
    return;      
  }   
    paramId=xss(paramId);
    paramPassword=xss(paramPassword);
    paramName=xss(paramName);
    var k_r= new RegExp('script','i');
    var sc_i=paramId.search(k_r);
    if(sc_i!=-1){
      output.status=700;    
      res.send(output);
      return;    
    }
    var sc_i2=paramPassword.search(k_r);
    if(sc_i2!=-1){
      output.status=701;    
      res.send(output);
      return;    
    }
    var sc_i3=paramName.search(k_r);
    if(sc_i3!=-1){
      output.status=702;    
      res.send(output);
      return;    
    }     
    var time = parseInt(Date.now());
    var td = parseInt(Date.now()/1800000);
	var database = req.app.get('database');
	if (database.db) {
		addUser(database, paramId, paramPassword, paramName,paramAge,paramGender, function(err, addedUser) {
			if (err) {
                console.error('사용자 추가 중 에러 발생 : ' + err.stack);
                output.status = 2;
                res.send(output);
                
                return;
            }
			if (addedUser) {
				database.UserModel.find({id:paramId},function(err,results){
                    if(err){
                        console.log('회원가입이 모두 되었으나 userinfo의 위한 _id 찾기를 실패하였습니다.');
                        output.status = 401;
                        res.send(output);
                        return;
                    }
                    if(results.length>0){
                        var rdi = results[0]._doc._id;
                        var userinfo = new database.UserinfoModel({"_id":rdi,"t_i":td,"u_t":time,id:paramId,name:paramName,geometry:{type:'Point',coordinates:[0,0]}});
                        userinfo.save(function(err){
                            if(err){
                                console.log('userinfo 를 생성하려고 시도하였지만 오류발생.');
                                output.status = 402;
                                res.send(output);
                                return;
                            }
                            var postinfo = new database.PostinfoModel({"_id":rdi,"id":paramId});
                            postinfo.save(function(err){
                                if(err){
                                    console.log('postinfo 를 생성하려고 시도하였지만 오류발생.');
                                    output.status =403;
                                    res.send(output);
                                    return;
                                }
                                var user_p = new database.UserPModel({'_id':rdi,'id':paramId,'name':paramName,'nn':paramName,'img':paramGender,'ph':ph});
                                user_p.save(function(err){
                                  if(err){
                                      output.status = 409;
                                      console.log('userPSchema 에 _id/id/name 을 등록하려 하였으나 에러발생');
                                      res.send(output);
                                  }
                                  var pbox = new database.PboxModel({'_id':rdi,'id':paramId});
                                  pbox.save(function(err){
                                    if(err){
                                      console.log('pboxModel에 object_id 박기 err');
                                      output.status = 421;
                                      res.send(output);
                                      return;
                                    }
                                    var mlv = new database.MlvModel({'_id':rdi});
                                    mlv.save(function(err){
                                      if(err){
                                        console.log('making mlvModel err');
                                        output.status =421;
                                        res.send(output);
                                        return;  
                                      }
                                      var tk = new database.TkModel({'_id':rdi,'id':paramId});
                                      tk.save(function(err){
                                        if(err){
                                          console.log('making TkModel err');
                                          output.status =422;
                                          res.send(output);
                                          return;    
                                        }
                                        var al = new database.AlModel({'_id':rdi});
                                        al.save(function(err){
                                          if(err){
                                            console.log('making AlModel err');
                                            output.status =423;
                                            res.send(output);
                                            return;  
                                          }
                                          var hl = new database.HlModel({'_id':rdi,'id':paramId});
                                          hl.save(function(err){
                                            if(err){
                                              console.log('hl.save err');
                                              output.status=424;
                                              res.send(output);
                                              return;    
                                            }
                                            var ch = new database.ChModel({'_id':rdi,'id':paramId,'n':paramName});
                                            ch.save(function(err){
                                              if(err){
                                                console.log('ch.save err');
                                                output.status=425;
                                                res.send(output);
                                                return;  
                                              }
                                              var f = new database.FModel({'_id':rdi,id:paramId});
                                              f.save(function(err){
                                                if(err){
                                                  console.log('f.save err');
                                                  output.status=426;
                                                  res.send(output);    
                                                  return;
                                                }
                                                var vv= new database.VModel({'_id':rdi,'id':paramId});
                                                vv.save(function(err){
                                                  if(err){
                                                    console.log('v.save err');
                                                    output.status=427;
                                                    res.send(output);
                                                    return;  
                                                  }
                                                  var mlvl = new database.MlvlModel({'_id':rdi});
                                                  mlvl.save(function(err){
                                                    if(err){
                                                      console.log('mlvl.save err');
                                                      output.status=430;
                                                      res.send(output);
                                                      return;    
                                                    }
                                                    var lh = new database.LhModel({'_id':rdi});
                                                    lh.save(function(err){
                                                      if(err){
                                                        console.log('lh.save err');
                                                        output.status=431;
                                                        res.send(output);
                                                        return;     
                                                      }
                                                      var la = new database.LaModel({'_id':rdi});
                                                      la.save(function(err){
                                                        if(err){
                                                          console.log('la.save err');
                                                          output.status=432;
                                                          res.send(output);
                                                          return;    
                                                        }
                                                        var loc = new database.LocModel({'_id':rdi,'img':paramGender,'id':paramId,'name':paramName});
                                                        loc.save(function(err){
                                                          if(err){
                                                            console.log('loc.save err');
                                                            output.status=433;
                                                            res.send(output);
                                                            return;  
                                                          }
                                                          console.log('signup success');
                                                          output._id=rdi;
                                                          output.status = 1;
                                                          res.send(output);                                                              
                                                        });  
                                                      });    
                                                    });  
                                                  });
                                                });                                   
                                              });    
                                                  
                                            });                                               
                                          });                                                 
                                        });
                                      });                                             
                                    });  
                                  
                                  });
                                });
                            });
                                                  
                        });
                    }else{
                        console.log('user_schema 의 id중 paramId 인 것을 찾으려고했지만 아무것도 검색되지 않는다.');
                        output.status = 403;
                        res.send(output);
                    }
                    
                });

			} else {
                output.status = 3;
                res.send(output);
			}
		});
	} else {
        output.status =4;
        res.send(output);
	}
	
};


var addUser = function(database, id, password, name,age,gender, callback) {	
	var user = new database.UserModel({"id":id, "password":password, "name":name, "age":age, "gender":gender,"postnumber":1});
	user.save(function(err) {
		if (err) {
			callback(err, null);
			return;
		}
	    console.log("사용자 데이터 추가함.");
	    callback(null, user);
	});
}
module.exports.signup = signup;