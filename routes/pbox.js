var pbox = function(req,res){
  var post_id = req.body.post_id;
  var user_id = req.body.user_id;
  var userid = req.body.userid;    
  var output={};
  var fd=[];
  var ti = parseInt(Date.now()/86400000)%10;
  var re_leng =0;
  var i=0;
  var database = req.app.get('database');
  if(database){
    database.FModel.find({_id:user_id},function(err,results){
      if(err){
        console.log('UserModel 에서 user_id로 follwed 찾으려고 시도 중 err');
        output.status = 401;
        res.send(output);
        return;
      }
      if(results.length>0){
        var tfd = results[0]._doc.fd;
        var fdl=tfd.length;  
        for(var g=0;g<fdl;g++){
          fd.push(tfd[g].id);    
        }  
        fd.unshift(userid);
        fdl++;
        var dbrecycle = function(){
          if(i==fdl){
              if(i==0){
              }
              output.status = 100;
              res.send(output);
              return;
          }else{
          database.PboxModel.find({id:fd[i]},function(err,results){
            if(err){
              console.log('fd['+i+'] PboxMdoel find err');
              output.status = 402;
              res.send(output);
              return;    
            }
            if(results.length>0){
              if(results[0]._doc.lev != ti){
                switch(ti){
                case 0:
                  database.PboxModel.where({id:fd[i]}).update({p0:[post_id],lev:0},function(err){
                    if(err){
                        console.log('pboxmodel 에서 _id:'+fd[i]+'의 document의 p0를 update 시도 중 err');
                    }
                    i++;
                    dbrecycle();
                  });
                  break;
                case 1:
                  database.PboxModel.where({id:fd[i]}).update({p1:[post_id],lev:1},function(err){
                    if(err){
                        console.log('pboxmodel 에서 _id:'+fd[i]+'의 document의 p1를 update 시도 중 err');
                    }
                    i++;
                    dbrecycle();
                  });
                  break;
                case 2:
                  database.PboxModel.where({id:fd[i]}).update({p2:[post_id],lev:2},function(err){
                    if(err){
                        console.log('pboxmodel 에서 _id:'+fd[i]+'의 document의 p2를 update 시도 중 err');
                    }
                    i++;
                    dbrecycle();
                  });
                  break;
                case 3:
                  database.PboxModel.where({id:fd[i]}).update({p3:[post_id],lev:3},function(err){
                    if(err){
                        console.log('pboxmodel 에서 _id:'+fd[i]+'의 document의 p3를 update 시도 중 err');
                    }
                    i++;
                    dbrecycle();
                  });
                  break;
                case 4:
                  database.PboxModel.where({id:fd[i]}).update({p4:[post_id],lev:4},function(err){
                    if(err){
                        console.log('pboxmodel 에서 _id:'+fd[i]+'의 document의 p4를 update 시도 중 err');
                    }
                    i++;
                    dbrecycle();
                  });
                  break;
                case 5:
                  database.PboxModel.where({id:fd[i]}).update({p5:[post_id],lev:5},function(err){
                    if(err){
                        console.log('pboxmodel 에서 _id:'+fd[i]+'의 document의 p5를 update 시도 중 err');
                    }
                    i++;
                    dbrecycle();
                  });
                  break;
                case 6:
                  database.PboxModel.where({id:fd[i]}).update({p6:[post_id],lev:6},function(err){
                    if(err){
                        console.log('pboxmodel 에서 _id:'+fd[i]+'의 document의 p6를 update 시도 중 err');
                    }
                    i++;
                    dbrecycle();
                  });
                  break;
                case 7:
                  database.PboxModel.where({id:fd[i]}).update({p7:[post_id],lev:7},function(err){
                    if(err){
                        console.log('pboxmodel 에서 _id:'+fd[i]+'의 document의 p7를 update 시도 중 err');
                    }
                    i++;
                    dbrecycle();
                  });
                  break;
                case 8:
                  database.PboxModel.where({id:fd[i]}).update({p8:[post_id],lev:8},function(err){
                    if(err){
                        console.log('pboxmodel 에서 _id:'+fd[i]+'의 document의 p8를 update 시도 중 err');
                    }
                    i++;
                    dbrecycle();
                  });
                  break;
                case 9:
                  database.PboxModel.where({id:fd[i]}).update({p9:[post_id],lev:9},function(err){
                    if(err){
                        console.log('pboxmodel 에서 _id:'+fd[i]+'의 document의 p9를 update 시도 중 err');
                    }
                    i++;
                    dbrecycle();
                  });
                  break;                        
            }                  

          }else{
            database.PboxModel.find({id:fd[i]},function(err,results){
              if(err){
                console.log('pboxmodel _id:'+fd[i]+'의 document를 find하려다 err 발생');
                output.status = 403;
                res.send(output);
                return;  
              }
              if(results.length>0){
                switch(ti){
                    case 0:
                      var post_arr = [];
                      post_arr=results[0]._doc.p0;
                      post_arr.unshift(post_id);    
                      database.PboxModel.where({id:fd[i]}).update({p0:post_arr},function(err){
                        if(err){
                            console.log('pboxmodel 에서 _id:'+fd[i]+'의 document의 p0를 update 시도 중 err');
                        }
                        i++;
                        dbrecycle();  
                      });
                      break;
                    case 1:
                      var post_arr = [];
                      post_arr=results[0]._doc.p1;
                      post_arr.unshift(post_id);    
                      database.PboxModel.where({id:fd[i]}).update({p1:post_arr},function(err){
                        if(err){
                            console.log('pboxmodel 에서 _id:'+fd[i]+'의 document의 p1를 update 시도 중 err');
                        }
                        i++;
                        dbrecycle();
                      });                            
                      break;
                    case 2:
                      var post_arr = [];
                      post_arr=results[0]._doc.p2;
                      post_arr.unshift(post_id);    
                      database.PboxModel.where({id:fd[i]}).update({p2:post_arr},function(err){
                        if(err){
                            console.log('pboxmodel 에서 _id:'+fd[i]+'의 document의 p2를 update 시도 중 err');
                        }
                        i++;
                        dbrecycle();
                      });                            
                      break;
                    case 3:
                      var post_arr = [];
                      post_arr=results[0]._doc.p3;
                      post_arr.unshift(post_id);    
                      database.PboxModel.where({id:fd[i]}).update({p3:post_arr},function(err){
                        if(err){
                            console.log('pboxmodel 에서 _id:'+fd[i]+'의 document의 p3를 update 시도 중 err');
                        }
                        i++;
                        dbrecycle();
                      });                            
                      break;
                    case 4:
                      var post_arr = [];
                      post_arr=results[0]._doc.p4;
                      post_arr.unshift(post_id);    
                      database.PboxModel.where({id:fd[i]}).update({p4:post_arr},function(err){
                        if(err){
                            console.log('pboxmodel 에서 _id:'+fd[i]+'의 document의 p4를 update 시도 중 err');
                        }
                        i++;
                        dbrecycle();
                      });                            
                      break;
                    case 5:
                      var post_arr = [];
                      post_arr=results[0]._doc.p5;
                      post_arr.unshift(post_id);    
                      database.PboxModel.where({id:fd[i]}).update({p5:post_arr},function(err){
                        if(err){
                            console.log('pboxmodel 에서 _id:'+fd[i]+'의 document의 p5를 update 시도 중 err');
                        }
                        i++;
                        dbrecycle();
                      });                            
                      break;
                    case 6:
                      var post_arr = [];
                      post_arr=results[0]._doc.p6;
                      post_arr.unshift(post_id);    
                      database.PboxModel.where({id:fd[i]}).update({p6:post_arr},function(err){
                        if(err){
                            console.log('pboxmodel 에서 _id:'+fd[i]+'의 document의 p6를 update 시도 중 err');
                        }
                        i++;
                        dbrecycle();
                      });                            
                      break;
                    case 7:
                      var post_arr = [];
                      post_arr=results[0]._doc.p7;
                      post_arr.unshift(post_id);    
                      database.PboxModel.where({id:fd[i]}).update({p7:post_arr},function(err){
                        if(err){
                            console.log('pboxmodel 에서 _id:'+fd[i]+'의 document의 p7를 update 시도 중 err');
                        }
                        i++;
                        dbrecycle();
                      });                            
                      break;
                    case 8:
                      var post_arr = [];
                      post_arr=results[0]._doc.p8;
                      post_arr.unshift(post_id);    
                      database.PboxModel.where({id:fd[i]}).update({p8:post_arr},function(err){
                        if(err){
                            console.log('pboxmodel 에서 _id:'+fd[i]+'의 document의 p8를 update 시도 중 err');
                        }
                        i++;
                        dbrecycle();
                      });                            
                      break;
                    case 9:
                      var post_arr = [];
                      post_arr=results[0]._doc.p9;
                      post_arr.unshift(post_id);    
                      database.PboxModel.where({id:fd[i]}).update({p9:post_arr},function(err){
                        if(err){
                            console.log('pboxmodel 에서 _id:'+fd[i]+'의 document의 p9를 update 시도 중 err');
                        }
                        i++;
                        dbrecycle();
                      });                            
                      break;                            
                    }                      
                  }    
                });
              }
            }  
          });              
          }    
        };
        dbrecycle();
      }    
    });      
  }else{
      
  }
};
module.exports.pbox = pbox;
