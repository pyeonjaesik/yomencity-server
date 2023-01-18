// 1. singup.js 삭제할것
// 2. log2 삭제
// 3. dist 에서 login.html 삭제할것.
var express = require('express')
  , http = require('http')
  , path = require('path');
var helmet = require('helmet')
var aws = require('aws-sdk');
var multer = require('multer');
var multerS3 = require('multer-s3');
const spdy = require('spdy');
var bodyParser = require('body-parser')
  , cookieParser = require('cookie-parser')
  , static = require('serve-static')
  , errorHandler = require('errorhandler');
const Guid = require('guid');
const Mustache  = require('mustache');
const Request  = require('request');
const Querystring  = require('querystring');
var expressErrorHandler = require('express-error-handler');
var expressSession = require('express-session');
var cors = require('cors');
var config = require('./config');
var database = require('./database/database');
var route_loader = require('./routes/route_loader');
var fs = require('fs');
var app = express();
app.set('port', 80);
app.use(helmet());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/public', static(path.join(__dirname, 'public')));
app.use('/uploads', static(path.join(__dirname, 'uploads')));
app.use('/uploads_p', static(path.join(__dirname, 'uploads_p')));
app.use('/dist', static(path.join(__dirname, 'dist')));
app.use(cookieParser());
app.use(expressSession({
	secret:'my key',
	resave:true,
	saveUninitialized:true
}));
app.use(cors());
var csrf_guid = Guid.raw();
const account_kit_api_version = 'v1.0';
const app_id = '2135590560102184';
const app_secret = 'fd1905ca88bf5f74b6a861fb3a60e308';
const me_endpoint_base_url = 'https://graph.accountkit.com/v1.1/me';
const token_exchange_base_url = 'https://graph.accountkit.com/v1.1/access_token'; 

function loadLogin() {
  return fs.readFileSync('dist/login.html').toString();
}
function useinfo() {
  return fs.readFileSync('dist/useinfo.html').toString();
}
app.get('/useinfo', function(request, response){
  var html = Mustache.to_html(useinfo());
  response.send(html);
});
function useinfo2() {
  return fs.readFileSync('dist/useinfo2.html').toString();
}
app.get('/useinfo2', function(request, response){
  var html = Mustache.to_html(useinfo2());
  response.send(html);
});
app.get('/log', function(request, response){
  var view = {
    appId: app_id,
    csrf: csrf_guid,
    version: account_kit_api_version,
  };

  var html = Mustache.to_html(loadLogin(), view);
  response.send(html);
});

function loadLoginSuccess() {
  return fs.readFileSync('dist/login_success.html').toString();
}
app.post('/login_success', function(request, response){
  if (request.body.csrf === csrf_guid) {
    var app_access_token = ['AA', app_id, app_secret].join('|');
    var params = {
      grant_type: 'authorization_code',
      code: request.body.code,
      access_token: app_access_token
    };
    var token_exchange_url = token_exchange_base_url + '?' + Querystring.stringify(params);
    Request.get({url: token_exchange_url, json: true}, function(err, resp, respBody) {
      var view = {
        user_access_token: respBody.access_token,
        expires_at: respBody.expires_at,
        user_id: respBody.id,	
      };
      var me_endpoint_url = me_endpoint_base_url + '?access_token=' + respBody.access_token;
      Request.get({url: me_endpoint_url, json:true }, function(err, resp, respBody) {
        var ph;  
        if (respBody.phone) {
          view.phone_num = respBody.phone.number;
          ph=respBody.phone.number;    
        } else if (respBody.email) {
          view.email_addr = respBody.email.address;
        }
        var html = Mustache.to_html(loadLoginSuccess(), view);
    var xss = require("xss");   
	var paramId = request.body.id_i || request.query.id;
    var paramPassword = request.body.pw_i || request.query.password;
    var paramName = request.body.name_i || request.query.name;
    var paramAge = request.body.age_i || request.query.age;
    var paramGender = request.body.gender_i || request.query.gender;
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
    response.send(output);
    return;
  }
  if(paramId.length<1||paramId.length>13){
    console.log('not valid info11');
    output.status=800;
    response.send(output)    
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
    response.send(output);
    return;
  }
  if(paramName.length<1||paramName.length>11){
    console.log('not valid info33');
    output.status=800;
    response.send(output)    
    return;  
  } 
  if(paramAge<1890||paramAge>2020){
    console.log('not valid info44');
    output.status=800;
    response.send(output)    
    return;       
  } 
  if(paramPassword.length<6||paramPassword.length>20){
    console.log('not valid info55');
    output.status=800;
    response.send(output)    
    return;      
  }
  if(paramGender=='1'&&paramGender=='2'){
    console.log('not valid info66');
    output.status=800;
    response.send(output)    
    return;      
  }   
    paramId=xss(paramId);
    paramPassword=xss(paramPassword);
    paramName=xss(paramName);
    var k_r= new RegExp('script','i');
    var sc_i=paramId.search(k_r);
    if(sc_i!=-1){
      output.status=700;    
      response.send(output);
      return;    
    }
    var sc_i2=paramPassword.search(k_r);
    if(sc_i2!=-1){
      output.status=701;    
      response.send(output);
      return;    
    }
    var sc_i3=paramName.search(k_r);
    if(sc_i3!=-1){
      output.status=702;    
      response.send(output);
      return;    
    }     
    var time = parseInt(Date.now());
    var td = parseInt(Date.now()/1800000);
	var database = request.app.get('database');
	if (database.db) {
		addUser(database, paramId, paramPassword, paramName,paramAge,paramGender, function(err, addedUser) {
			if (err) {
                console.error('사용자 추가 중 에러 발생 : ' + err.stack);
                output.status = 2;
                response.send(output);
                return;
            }
			if (addedUser) {
				database.UserModel.find({id:paramId},function(err,results){
                    if(err){
                        console.log('회원가입이 모두 되었으나 userinfo의 위한 _id 찾기를 실패하였습니다.');
                        output.status = 401;
                        response.send(output);
                        return;
                    }
                    if(results.length>0){
                        var rdi = results[0]._doc._id;
                        var userinfo = new database.UserinfoModel({"_id":rdi,"t_i":td,"u_t":time,id:paramId,name:paramName,geometry:{type:'Point',coordinates:[0,0]}});
                        userinfo.save(function(err){
                            if(err){
                                console.log('userinfo 를 생성하려고 시도하였지만 오류발생.');
                                output.status = 402;
                                response.send(output);
                                return;
                            }
                            var postinfo = new database.PostinfoModel({"_id":rdi,"id":paramId});
                            postinfo.save(function(err){
                                if(err){
                                    console.log('postinfo 를 생성하려고 시도하였지만 오류발생.');
                                    output.status =403;
                                    response.send(output);
                                    return;
                                }
                                var user_p = new database.UserPModel({'_id':rdi,'id':paramId,'name':paramName,'nn':paramId,'img':paramGender,'ph':ph});
                                user_p.save(function(err){
                                  if(err){
                                      output.status = 409;
                                      console.log('userPSchema 에 _id/id/name 을 등록하려 하였으나 에러발생');
                                      response.send(output);
                                  }
                                  var pbox = new database.PboxModel({'_id':rdi,'id':paramId});
                                  pbox.save(function(err){
                                    if(err){
                                      console.log('pboxModel에 object_id 박기 err');
                                      output.status = 421;
                                      response.send(output);
                                      return;
                                    }
                                    var mlv = new database.MlvModel({'_id':rdi});
                                    mlv.save(function(err){
                                      if(err){
                                        console.log('making mlvModel err');
                                        output.status =421;
                                        response.send(output);
                                        return;  
                                      }
                                      var tk = new database.TkModel({'_id':rdi,'id':paramId});
                                      tk.save(function(err){
                                        if(err){
                                          console.log('making TkModel err');
                                          output.status =422;
                                          response.send(output);
                                          return;    
                                        }
                                        var al = new database.AlModel({'_id':rdi});
                                        al.save(function(err){
                                          if(err){
                                            console.log('making AlModel err');
                                            output.status =423;
                                            response.send(output);
                                            return;  
                                          }
                                          var hl = new database.HlModel({'_id':rdi,'id':paramId});
                                          hl.save(function(err){
                                            if(err){
                                              console.log('hl.save err');
                                              output.status=424;
                                              response.send(output);
                                              return;    
                                            }
                                            var ch = new database.ChModel({'_id':rdi,'id':paramId,'n':paramName});
                                            ch.save(function(err){
                                              if(err){
                                                console.log('ch.save err');
                                                output.status=425;
                                                response.send(output);
                                                return;  
                                              }
                                              var f = new database.FModel({'_id':rdi,id:paramId});
                                              f.save(function(err){
                                                if(err){
                                                  console.log('f.save err');
                                                  output.status=426;
                                                  response.send(output);    
                                                  return;
                                                }
                                                var vv= new database.VModel({'_id':rdi,'id':paramId});
                                                vv.save(function(err){
                                                  if(err){
                                                    console.log('v.save err');
                                                    output.status=427;
                                                    response.send(output);
                                                    return;  
                                                  }
                                                  var mlvl = new database.MlvlModel({'_id':rdi});
                                                  mlvl.save(function(err){
                                                    if(err){
                                                      console.log('mlvl.save err');
                                                      output.status=430;
                                                      response.send(output);
                                                      return;    
                                                    }
                                                    var lh = new database.LhModel({'_id':rdi});
                                                    lh.save(function(err){
                                                      if(err){
                                                        console.log('lh.save err');
                                                        output.status=431;
                                                        response.send(output);
                                                        return;     
                                                      }
                                                      var la = new database.LaModel({'_id':rdi});
                                                      la.save(function(err){
                                                        if(err){
                                                          console.log('la.save err');
                                                          output.status=432;
                                                          response.send(output);
                                                          return;    
                                                        }
                                                        var loc = new database.LocModel({'_id':rdi,'img':paramGender,'id':paramId,'name':paramName});
                                                        loc.save(function(err){
                                                          if(err){
                                                            console.log('loc.save err');
                                                            output.status=433;
                                                            responses.send(output);
                                                            return;  
                                                          }
                                                          output.status = 1;
                                                          response.send(html);                                        
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
                        response.send(output);
                    }
                    
                });

			} else {
                output.status = 3;
                response.send(output);
			}
		});
	} else {
        output.status =4;
        response.send(output);
	}          
      });
    });
  } 
  else {
    response.writeHead(200, {'Content-Type': 'text/html'});
    response.end("Something went wrong. :( ");
  }
});
var addUser = function(database, id, password, name,age,gender, callback) {	
	var user = new database.UserModel({"id":id, "password":password, "name":name, "age":age, "gender":gender,"postnumber":1});
	user.save(function(err) {
		if (err) {
			callback(err, null);
			return;
		}
	    callback(null, user);
	});
}

var s3 = new aws.S3({});
var maxim=100; // The number of maximun images 
var upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'yomenpost',
    acl: 'public-read',  
    metadata: function (req, file, cb) {
      var post_id=req.body.post_id;
      var tk=req.body.tk||'123';
      var ni=req.body.ni;    
      var database =req.app.get('database');
      if(tk.length<4){
         return; 
      }    
      if(database){
        database.TkModel.find({tk:tk},function(err,results){
          if(err){
            console.log('TkModel.find err');
            return;  
          }
          if(results.length>0){
            var ct = parseInt(Date.now()/86400000);
            var user_id=results[0]._doc._id;
            if(results[0]._doc.d==ct){
              var rdn=results[0]._doc.n;    
              if(rdn<maxim){
                rdn++;
                database.TkModel.where({_id:user_id}).update({n:rdn},function(err){
                  if(err){
                    console.log('TkModel.update err');
                    return;  
                  }
                  database.PostModel.find({_id:post_id},function(err,results){
                    if(err){
                      console.log('PostModel.find err');
                    //  res.send(output);
                      return;    
                    }
                    if(results.length>0){
                      if(results[0]._doc.user_id!=user_id){
                        console.log('results[0]._doc.user_id!=user_id --> hacker stoled tokens 90%');
                     //   res.send(output);
                        return;  
                      }
                      cb(null, {fieldName: file.fieldname});    
                    }
                  });      
                });
              }else{
              //  res.send(output);  
              }    
            }else{
              database.TkModel.where({_id:user_id}).update({d:ct,n:1},function(err){
                if(err){
                  console.log('TkModel update 2 err');
                 // res.send(output);
                  return;    
                }
                database.PostModel.find({_id:post_id},function(err,results){
                  if(err){
                    console.log('PostModel.find err');
                  //  res.send(output);
                    return;    
                  }
                  if(results.length>0){
                    if(results[0]._doc.user_id!=user_id){
                      console.log('results[0]._doc.user_id!=user_id --> hacker stoled tokens 90%');
                    //  res.send(output);
                      return;  
                    }
                    cb(null, {fieldName: file.fieldname});    
                  }  
                });                  
              });      
            }  
          }else{
            console.log('ddos detected (99%) or token changed(1%)');
            return;  
          }    
        });  
      }else{
        console.log('metadata no database');
        return;
      }    
      
    },
    key: function (req, file, cb) {
      var post_id=req.body.post_id;
      var tk=req.body.tk||'123';
      var ni=req.body.ni;    
      var database =req.app.get('database');
      if(tk.length<4){
        return;  
      }
      if(database){
        database.TkModel.find({tk:tk},function(err,results){
          if(err){
            console.log('TkModel.find err');
            return;  
          }
          if(results.length>0){
            var ct = parseInt(Date.now()/86400000);
            var user_id=results[0]._doc._id;
            if(results[0]._doc.d==ct){
              var rdn=results[0]._doc.n;    
              if(rdn<maxim){ 
                database.PostModel.find({_id:post_id},function(err,results){
                  if(err){
                    console.log('PostModel.find err');
                  //  res.send(output);
                    return;    
                  }
                  if(results.length>0){
                    if(results[0]._doc.user_id!=user_id){
                      console.log('results[0]._doc.user_id!=user_id --> hacker stoled tokens 90%');
                   //   res.send(output);
                      return;  
                    }
                    cb(null,post_id+ni);    
                  }  
                });
              }else{
                return;  
              //  res.send(output);  
              }    
            }else{
              database.PostModel.find({_id:post_id},function(err,results){
                if(err){
                  console.log('PostModel.find err');
                //  res.send(output);
                  return;    
                }
                if(results.length>0){
                  if(results[0]._doc.user_id!=user_id){
                    console.log('results[0]._doc.user_id!=user_id --> hacker stoled tokens 90%');
                  //  res.send(output);
                    return;  
                  }
                  cb(null,post_id+ni);    
                }  
              });     
            }  
          }else{
            console.log('ddos detected (99%) or token changed(1%)');
            return;  
          }    
        });  
      }else{
        console.log('metadata no database');
        return;  
      }   
    }
  })
}); 
app.post('/uploads3', upload.array('file',1), function(req, res, next) {
  var post_id = req.body.post_id;
  var ni=req.body.ni;
  var li=req.body.li; 
  var tk=req.body.tk;
  var database =req.app.get('database');
  if(database){
    database.TkModel.find({tk:tk},function(err,results){
      if(err){
        console.log('TkModel.find err');
        res.send('400');
        return;  
      }
      if(results.length>0){
        var user_id=results[0]._doc._id;
        database.PostModel.find({_id:post_id},function(err,results){
          if(err){
            console.log('postModel.find err');
            res.send('800');
            return;  
          }
          if(results.length>0){
            if(user_id!=results[0]._doc.user_id){
              res.send('802');    
              return;    
            }
    if(ni==1){
      database.PostModel.where({_id:post_id}).update({img1:req.files[0].location},function(err){
        if(err){
          console.log('PostModel.update err');
          res.send('401');
          return;    
        }
        if(li==0){
          res.send('100');    
        }else{
          database.UserinfoModel.where({_id:user_id}).update({post_id:post_id,p_index:1},function(err){
            if(err){
              console.log('USerinfoModel.update err');
              res.send('402');
              return;    
            }
            database.PostinfoModel.find({_id:user_id},function(err,results){
              if(err){
                console.log('PostinfoModel.find err');
                res.send('403');
                return;  
              }
              if(results.length>0){
                var p_arr=results[0]._doc.post_id;
                p_arr.unshift(post_id);
                database.PostinfoModel.where({_id:user_id}).update({post_id:p_arr},function(err){
                  if(err){
                    console.log('PostinfoModel.update err');
                    res.send('404');
                    return;  
                  }
                  res.send('101');
                });  
              }else{
                console.log('PostinfoModel.find results.length==0 -->err');
                res.send('404');  
              }    
            });  
          });  
        }  
      });    
    }else if(ni==2){
      database.PostModel.where({_id:post_id}).update({img2:req.files[0].location},function(err){
        if(err){
          console.log('PostModel.update err');
          res.send('401');
          return;    
        }
        if(li==0){
          res.send('100');    
        }else{
          database.UserinfoModel.where({_id:user_id}).update({post_id:post_id,p_index:1},function(err){
            if(err){
              console.log('USerinfoModel.update err');
              res.send('402');
              return;    
            }
            database.PostinfoModel.find({_id:user_id},function(err,results){
              if(err){
                console.log('PostinfoModel.find err');
                res.send('403');
                return;  
              }
              if(results.length>0){
                var p_arr=results[0]._doc.post_id;
                p_arr.unshift(post_id);
                database.PostinfoModel.where({_id:user_id}).update({post_id:p_arr},function(err){
                  if(err){
                    console.log('PostinfoModel.update err');
                    res.send('404');
                    return;  
                  }
                  res.send('101');
                });  
              }else{
                console.log('PostinfoModel.find results.length==0 -->err');
                res.send('404');  
              }    
            });  
          });  
        }  
      });    
    }else if(ni==3){
      database.PostModel.where({_id:post_id}).update({img3:req.files[0].location},function(err){
        if(err){
          console.log('PostModel.update err');
          res.send('401');
          return;    
        }
        if(li==0){
          res.send('100');    
        }else{
          database.UserinfoModel.where({_id:user_id}).update({post_id:post_id,p_index:1},function(err){
            if(err){
              console.log('USerinfoModel.update err');
              res.send('402');
              return;    
            }
            database.PostinfoModel.find({_id:user_id},function(err,results){
              if(err){
                console.log('PostinfoModel.find err');
                res.send('403');
                return;  
              }
              if(results.length>0){
                var p_arr=results[0]._doc.post_id;
                p_arr.unshift(post_id);
                database.PostinfoModel.where({_id:user_id}).update({post_id:p_arr},function(err){
                  if(err){
                    console.log('PostinfoModel.update err');
                    res.send('404');
                    return;  
                  }
                  res.send('101')
                });  
              }else{
                console.log('PostinfoModel.find results.length==0 -->err');
                res.send('404');  
              }    
            });  
          });  
        }  
      });    
    }else if(ni==4){
      database.PostModel.where({_id:post_id}).update({img4:req.files[0].location},function(err){
        if(err){
          console.log('PostModel.update err');
          res.send('401');
          return;    
        }
        if(li==0){
          res.send('100');    
        }else{
          database.UserinfoModel.where({_id:user_id}).update({post_id:post_id,p_index:1},function(err){
            if(err){
              console.log('USerinfoModel.update err');
              res.send('402');
              return;    
            }
            database.PostinfoModel.find({_id:user_id},function(err,results){
              if(err){
                console.log('PostinfoModel.find err');
                res.send('403');
                return;  
              }
              if(results.length>0){
                var p_arr=results[0]._doc.post_id;
                p_arr.unshift(post_id);
                database.PostinfoModel.where({_id:user_id}).update({post_id:p_arr},function(err){
                  if(err){
                    console.log('PostinfoModel.update err');
                    res.send('404');
                    return;  
                  }
                  res.send('101');
                });  
              }else{
                console.log('PostinfoModel.find results.length==0 -->err');
                res.send('404');  
              }    
            });  
          });  
        }  
      });    
    }              
          }else{
            console.log('postModel.find err');
            res.send('801');
            return;  
          }    
        });          
      }else{
        console.log('TkModel results.length ==0');
        res.send('402');
        return;  
      }    
    });
  }else{
    console.log('uploads3 no database');
    res.send('410');  
  }    
});
var upload_p = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'yomenprofile',
    acl: 'public-read',  
    metadata: function (req, file, cb) {
      var tk=req.body.tk;  
      var database =req.app.get('database');   
      if(database){
        database.TkModel.find({tk:tk},function(err,results){
          if(err){
            console.log('TkModel.find err');
            return;  
          }
          if(results.length>0){
            var ct = parseInt(Date.now()/86400000);
            var user_id=results[0]._doc._id;
            if(results[0]._doc.c==ct){
              var rdn=results[0]._doc.p;    
              if(rdn<50){
                rdn++;
                database.TkModel.where({_id:user_id}).update({p:rdn},function(err){
                  if(err){
                    console.log('TkModel.update err');
                  //  res.send(output);
                    return;  
                  }
                  cb(null, {fieldName: file.fieldname});      
                });
              }else{
                return;  
              //  res.send(output);  
              }    
            }else{
              database.TkModel.where({_id:user_id}).update({c:ct,p:1},function(err){
                if(err){
                  console.log('TkModel update 2 err');
                 // res.send(output);
                  return;    
                }
                cb(null, {fieldName: file.fieldname});  
              });      
            }  
          }else{
            console.log('ddos detected (99%) or token changed(1%)');
            return;  
          }    
        });  
      }else{
        console.log('metadata no database');
        return;
      }
    },
    key: function (req, file, cb) {
      var tk=req.body.tk;  
      var user_id=req.body.user_id;    
      var database =req.app.get('database');
      var id;    
      if(database){
        database.TkModel.find({tk:tk},function(err,results){
          if(err){
            console.log('TkModel.find err');
            return;  
          }
          if(results.length>0){
            var ct = parseInt(Date.now()/86400000);
            var user_id=results[0]._doc._id;
            id=results[0]._doc.id;  
            if(results[0]._doc.c==ct){
              var rdn=results[0]._doc.p;    
              if(rdn<50){
                rdn++;
                database.TkModel.where({_id:user_id}).update({p:rdn},function(err){
                  if(err){
                    console.log('TkModel.update err');
                  //  res.send(output);
                    return;  
                  }
                  cb(null,id+Date.now().toString());      
                });
              }else{
              //  res.send(output);  
              }    
            }else{
              database.TkModel.where({_id:user_id}).update({c:ct,p:1},function(err){
                if(err){
                  console.log('TkModel update 2 err');
                 // res.send(output);
                  return;    
                }  
                cb(null,id+Date.now().toString()); 
              });      
            }  
          }else{
            console.log('ddos detected (99%) or token changed(1%)');
            return;  
          }    
        });  
      }else{
        console.log('metadata no database');
        return;
      }    
    }
  })
});
app.post('/ppupload', upload_p.array('file',1), function(req, res, next) {
  var tk=req.body.tk||'123';    
  var database=req.app.get('database');    
    if(database){
      database.TkModel.find({tk:tk},function(err,results){
        if(err){
          console.log('TkModel.find err');
          res.send('400');
          return;    
        }
        var user_id=results[0]._doc._id;
        database.UserPModel.where({_id:user_id}).update({img:req.files[0].location},function(err){
          if(err){
            console.log('UserPModel.update err');
            res.send('401');
            return;
          }
          database.LocModel.where({_id:user_id}).update({img:req.files[0].location},function(err){
            if(err){
              console.log('LocModel.update err');
              res.send('402');
              return;    
            }
            res.send('100'); 
          });    
        });          
      });    
    }else{
        res.send('410');
        console.log('ppupload no database');
    }    
});
route_loader.init(app, express.Router());
var errorHandler = expressErrorHandler({
 static: {
   '404': './public/404.html'
 }
});

app.use( expressErrorHandler.httpError(404) );
app.use( errorHandler );


//===== 서버 시작 =====//

// 프로세스 종료 시에 데이터베이스 연결 해제
process.on('SIGTERM', function () {
    console.log("프로세스가 종료됩니다.");
    app.close();
});

app.on('close', function () {
	console.log("Express 서버 객체가 종료됩니다.");
	if (database.db) {
		database.db.close();
	}
});
const options = {
  key: fs.readFileSync('/etc/letsencrypt/live/www.yomencity.xyz/privkey.pem'),
  cert:  fs.readFileSync('/etc/letsencrypt/live/www.yomencity.xyz/cert.pem')
};
spdy
  .createServer(options, app)
  .listen(8443, (err) => {
    if (err) {
      throw new Error(err);
    }
    database.init(app, config);
    console.log('Listening on port: ' + 8443 + '.');
  });

// Express 서버 시작
http.createServer(app).listen(app.get('port'), function(){
    console.log('서버가 시작되었습니다. 포트 : ' + app.get('port'));

    // 데이터베이스 초기화
//    database.init(app, config);
   
});