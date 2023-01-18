var follow = function(req,res){
    var id2 = req.body.id2;
    var _id1 = req.body._id1;
    var n1= req.body.n1;
    var id1;
    var _id2;
    var n2;
    var fgn1;
    var fdn2;
    var ti = parseInt(Date.now()/86400000)%10;
    var database = req.app.get('database');
    var output = {};
    var temp_arr1 = [];
    if(database){
        database.UserModel.find({id:id2},function(err,results){
            if(err){
                console.log('UsrModel.find for _id2 err');
                output.status = 401;
                res.send(output);
                return
            }
            if(results.length>0){
                _id2=results[0]._doc._id;
                n2=results[0]._doc.name;
                database.FModel.find({_id:_id1},function(err,results){
                  if(err){
                    console.log('UserModel.find for f1id err');
                    output.status=402;
                    res.send(output);
                    return;    
                  }
                  if(results.length>0){
                    id1=results[0]._doc.id;
                    fgn1=results[0]._doc.fgn;
                    fgn1++;
                    var tfg= results[0]._doc.fg;
                    var fgl=tfg.length;  
                    for(var q=0;q<fgl;q++){
                      temp_arr1.push(tfg[q].id);    
                    } 
                    if(temp_arr1.indexOf(id2)!=-1){
                      output.status = 102;
                      res.send(output);
                      return;                        
                    }
                    tfg.unshift({id:id2,n:n2});
                    database.FModel.where({_id:_id1}).update({fg:tfg,fgn:fgn1},function(err){
                        if(err){
                            output.status = 403;
                            res.send(output);
                            return;
                        }
                        database.FModel.find({_id:_id2},function(err,results){
                            if(err){
                                console.log('follow 당하는 아이디로 사용자를 조회하려했지만 오류발생');
                                output.status = 405;
                                res.send(output);
                                return;
                            }
                            if(results){
                                fdn2=results[0]._doc.fdn;
                                fdn2++;
                                var tfd =[];
                                tfd = results[0]._doc.fd;
                                tfd.unshift({id:id1,n:n1});
                                database.FModel.where({_id:_id2}).update({fd:tfd,fdn:fdn2},function(err){
                                    if(err){
                                        console.log('follow 당하는 사용자의 followed 에 _id1 를 추가하려 했지만 에러 발생');           output.status = 406;
                                        res.send(output);
                                        return;
                                    }
                                    database.UserinfoModel.find({_id:_id2},function(err,results){
                                      if(err){
                                        console.log('useronfoModel find 중 err 발생');
                                        output.status =407;
                                        res.send(output);
                                        return;  
                                      }
                                      if(results.length>0){
                                        var up = results[0]._doc.post_id;
                                        if(up=='0'){
                                          output.status =100;
                                          res.send(output);
                                          return;  
                                        }
                                        database.PboxModel.find({_id:_id1},function(err,results){
                                          if(err){
                                            console.log('follwing_id 를 기반으로 pboxModel.find 하려 하였으나 err 발생');
                                            output.status = 409;
                                            res.send(output);
                                            return;  
                                          }
                                          var p0 = results[0]._doc.p0;
                                          var p1 = results[0]._doc.p1;
                                          var p2 = results[0]._doc.p2;
                                          var p3 = results[0]._doc.p3;
                                          var p4 = results[0]._doc.p4;
                                          var p5 = results[0]._doc.p5;
                                          var p6 = results[0]._doc.p6;
                                          var p7 = results[0]._doc.p7;
                                          var p8 = results[0]._doc.p8;
                                          var p9 = results[0]._doc.p9;
                                          var pbox =[];    
                                          switch(ti){
                                              case 0:
                                                pbox=p0.concat(p1,p2,p3,p4,p5,p6,p7,p8,p9);
                                                if(pbox.indexOf(up)==-1){
                                                   if(results[0]._doc.lev==0){
                                                     p0.unshift(up);
                                                     database.PboxModel.where({_id:_id1}).update({p0:p0},function(err){
                                                       if(err){
                                                         console.log('_id1의 pbox에 post_id('+up+')를 추가 시도 중 err 발생');
                                                         output.status=420;
                                                         res.send(output);
                                                         return;     
                                                       }
                                                       output.status =100;
                                                       res.send(output);
                                                       return;
                                                     });                                                           
                                                   }else{
                                                     p0=[up];     
                                                     database.PboxModel.where({_id:_id1}).update({lev:0,p0:p0},function(err){
                                                       if(err){
                                                         console.log('_id1의 pbox에 post_id('+up+')를 추가 시도 중 err 발생');
                                                         output.status=420;
                                                         res.send(output);
                                                         return;     
                                                       }
                                                       output.status =100;
                                                       res.send(output);
                                                       return;
                                                     });                                                             
                                                   }    

                                                }else{
                                                  output.status =100;
                                                  res.send(output);    
                                                }
                                                break;
                                              case 1:
                                                pbox=p1.concat(p2,p3,p4,p5,p6,p7,p8,p9,p0);
                                                if(pbox.indexOf(up)==-1){    
                                                   if(results[0]._doc.lev==1){
                                                     p1.unshift(up);
                                                     database.PboxModel.where({_id:_id1}).update({p1:p1},function(err){
                                                       if(err){
                                                         console.log('_id1의 pbox에 post_id('+up+')를 추가 시도 중 err 발생');
                                                         output.status=420;
                                                         res.send(output);
                                                         return;     
                                                       }
                                                       output.status =100;
                                                       res.send(output);
                                                       return;
                                                     });                                                           
                                                   }else{
                                                     p1=[up];     
                                                     database.PboxModel.where({_id:_id1}).update({lev:1,p1:p1},function(err){
                                                       if(err){
                                                         console.log('_id1의 pbox에 post_id('+up+')를 추가 시도 중 err 발생');
                                                         output.status=420;
                                                         res.send(output);
                                                         return;     
                                                       }
                                                       output.status =100;
                                                       res.send(output);
                                                       return;
                                                     });                                                             
                                                   }
                                                }else{
                                                  output.status =100;
                                                  res.send(output);    
                                                }
                                                break;
                                              case 2:
                                                pbox=p2.concat(p3,p4,p5,p6,p7,p8,p9,p0,p1);
                                                if(pbox.indexOf(up)==-1){
                                                   if(results[0]._doc.lev==2){
                                                     p2.unshift(up);
                                                     database.PboxModel.where({_id:_id1}).update({p2:p2},function(err){
                                                       if(err){
                                                         console.log('_id1의 pbox에 post_id('+up+')를 추가 시도 중 err 발생');
                                                         output.status=420;
                                                         res.send(output);
                                                         return;     
                                                       }
                                                       output.status =100;
                                                       res.send(output);
                                                       return;
                                                     });                                                           
                                                   }else{
                                                     p2=[up];     
                                                     database.PboxModel.where({_id:_id1}).update({lev:2,p2:p2},function(err){
                                                       if(err){
                                                         console.log('_id1의 pbox에 post_id('+up+')를 추가 시도 중 err 발생');
                                                         output.status=420;
                                                         res.send(output);
                                                         return;     
                                                       }
                                                       output.status =100;
                                                       res.send(output);
                                                       return;
                                                     });                                                             
                                                   }
                                                }else{
                                                  output.status =100;
                                                  res.send(output);    
                                                }
                                                break;
                                              case 3:
                                                pbox=p3.concat(p4,p5,p6,p7,p8,p9,p0,p1,p2);
                                                if(pbox.indexOf(up)==-1){
                                                   if(results[0]._doc.lev==3){
                                                     p3.unshift(up);
                                                     database.PboxModel.where({_id:_id1}).update({p3:p3},function(err){
                                                       if(err){
                                                         console.log('_id1의 pbox에 post_id('+up+')를 추가 시도 중 err 발생');
                                                         output.status=420;
                                                         res.send(output);
                                                         return;     
                                                       }
                                                       output.status =100;
                                                       res.send(output);
                                                       return;
                                                     });                                                           
                                                   }else{
                                                     p3=[up];     
                                                     database.PboxModel.where({_id:_id1}).update({lev:3,p3:p3},function(err){
                                                       if(err){
                                                         console.log('_id1의 pbox에 post_id('+up+')를 추가 시도 중 err 발생');
                                                         output.status=420;
                                                         res.send(output);
                                                         return;     
                                                       }
                                                       output.status =100;
                                                       res.send(output);
                                                       return;
                                                     });                                                             
                                                   }
                                                }else{
                                                  output.status =100;
                                                  res.send(output);    
                                                }
                                                break;
                                              case 4:
                                                pbox=p4.concat(p5,p6,p7,p8,p9,p0,p1,p2,p3);
                                                if(pbox.indexOf(up)==-1){
                                                   if(results[0]._doc.lev==4){
                                                     p4.unshift(up);
                                                     database.PboxModel.where({_id:_id1}).update({p4:p4},function(err){
                                                       if(err){
                                                         console.log('_id1의 pbox에 post_id('+up+')를 추가 시도 중 err 발생');
                                                         output.status=420;
                                                         res.send(output);
                                                         return;     
                                                       }
                                                       output.status =100;
                                                       res.send(output);
                                                       return;
                                                     });                                                           
                                                   }else{
                                                     p4=[up];     
                                                     database.PboxModel.where({_id:_id1}).update({lev:4,p4:p4},function(err){
                                                       if(err){
                                                         console.log('_id1의 pbox에 post_id('+up+')를 추가 시도 중 err 발생');
                                                         output.status=420;
                                                         res.send(output);
                                                         return;     
                                                       }
                                                       output.status =100;
                                                       res.send(output);
                                                       return;
                                                     });                                                             
                                                   }
                                                }else{
                                                  output.status =100;
                                                  res.send(output);    
                                                }
                                                break;
                                              case 5:
                                                pbox=p5.concat(p6,p7,p8,p9,p0,p1,p2,p3,p4);
                                                if(pbox.indexOf(up)==-1){
                                                   if(results[0]._doc.lev==5){
                                                     p5.unshift(up);
                                                     database.PboxModel.where({_id:_id1}).update({p5:p5},function(err){
                                                       if(err){
                                                         console.log('_id1의 pbox에 post_id('+up+')를 추가 시도 중 err 발생');
                                                         output.status=420;
                                                         res.send(output);
                                                         return;     
                                                       }
                                                       output.status =100;
                                                       res.send(output);
                                                       return;
                                                     });                                                           
                                                   }else{
                                                     p5=[up];     
                                                     database.PboxModel.where({_id:_id1}).update({lev:5,p5:p5},function(err){
                                                       if(err){
                                                         console.log('_id1의 pbox에 post_id('+up+')를 추가 시도 중 err 발생');
                                                         output.status=420;
                                                         res.send(output);
                                                         return;     
                                                       }
                                                       output.status =100;
                                                       res.send(output);
                                                       return;
                                                     });                                                             
                                                   }
                                                }else{
                                                  output.status =100;
                                                  res.send(output);    
                                                }
                                                break;
                                              case 6:
                                                pbox=p6.concat(p7,p8,p9,p0,p1,p2,p3,p4,p5);
                                                if(pbox.indexOf(up)==-1){
                                                   if(results[0]._doc.lev==6){
                                                     p6.unshift(up);
                                                     database.PboxModel.where({_id:_id1}).update({p6:p6},function(err){
                                                       if(err){
                                                         console.log('_id1의 pbox에 post_id('+up+')를 추가 시도 중 err 발생');
                                                         output.status=420;
                                                         res.send(output);
                                                         return;     
                                                       }
                                                       output.status =100;
                                                       res.send(output);
                                                       return;
                                                     });                                                           
                                                   }else{
                                                     p6=[up];     
                                                     database.PboxModel.where({_id:_id1}).update({lev:6,p6:p6},function(err){
                                                       if(err){
                                                         console.log('_id1의 pbox에 post_id('+up+')를 추가 시도 중 err 발생');
                                                         output.status=420;
                                                         res.send(output);
                                                         return;     
                                                       }
                                                       output.status =100;
                                                       res.send(output);
                                                       return;
                                                     });                                                             
                                                   }
                                                }else{
                                                  output.status =100;
                                                  res.send(output);    
                                                }
                                                break;
                                              case 7:
                                                pbox=p7.concat(p8,p9,p0,p1,p2,p3,p4,p5,p6);
                                                if(pbox.indexOf(up)==-1){
                                                   if(results[0]._doc.lev==7){
                                                     p7.unshift(up);
                                                     database.PboxModel.where({_id:_id1}).update({p7:p7},function(err){
                                                       if(err){
                                                         console.log('_id1의 pbox에 post_id('+up+')를 추가 시도 중 err 발생');
                                                         output.status=420;
                                                         res.send(output);
                                                         return;     
                                                       }
                                                       output.status =100;
                                                       res.send(output);
                                                       return;
                                                     });                                                           
                                                   }else{
                                                     p7=[up];     
                                                     database.PboxModel.where({_id:_id1}).update({lev:7,p7:p7},function(err){
                                                       if(err){
                                                         console.log('_id1의 pbox에 post_id('+up+')를 추가 시도 중 err 발생');
                                                         output.status=420;
                                                         res.send(output);
                                                         return;     
                                                       }
                                                       output.status =100;
                                                       res.send(output);
                                                       return;
                                                     });                                                             
                                                   }
                                                }else{
                                                  output.status =100;
                                                  res.send(output);    
                                                }
                                                break;
                                              case 8:
                                                pbox=p8.concat(p9,p0,p1,p2,p3,p4,p5,p6,p7);
                                                if(pbox.indexOf(up)==-1){
                                                   if(results[0]._doc.lev==8){
                                                     p8.unshift(up);
                                                     database.PboxModel.where({_id:_id1}).update({p8:p8},function(err){
                                                       if(err){
                                                         console.log('_id1의 pbox에 post_id('+up+')를 추가 시도 중 err 발생');
                                                         output.status=420;
                                                         res.send(output);
                                                         return;     
                                                       }
                                                       output.status =100;
                                                       res.send(output);
                                                       return;
                                                     });                                                           
                                                   }else{
                                                     p8=[up];     
                                                     database.PboxModel.where({_id:_id1}).update({lev:8,p8:p8},function(err){
                                                       if(err){
                                                         console.log('_id1의 pbox에 post_id('+up+')를 추가 시도 중 err 발생');
                                                         output.status=420;
                                                         res.send(output);
                                                         return;     
                                                       }
                                                       output.status =100;
                                                       res.send(output);
                                                       return;
                                                     });                                                             
                                                   }
                                                }else{
                                                  output.status =100;
                                                  res.send(output);    
                                                }
                                                break;
                                              case 9:
                                                pbox=p9.concat(p0,p1,p2,p3,p4,p5,p6,p7,p8);
                                                if(pbox.indexOf(up)==-1){
                                                   if(results[0]._doc.lev==9){
                                                     p9.unshift(up);
                                                     database.PboxModel.where({_id:_id1}).update({p9:p9},function(err){
                                                       if(err){
                                                         console.log('_id1의 pbox에 post_id('+up+')를 추가 시도 중 err 발생');
                                                         output.status=420;
                                                         res.send(output);
                                                         return;     
                                                       }
                                                       output.status =100;
                                                       res.send(output);
                                                       return;
                                                     });                                                           
                                                   }else{
                                                     p9=[up];     
                                                     database.PboxModel.where({_id:_id1}).update({lev:9,p9:p9},function(err){
                                                       if(err){
                                                         console.log('_id1의 pbox에 post_id('+up+')를 추가 시도 중 err 발생');
                                                         output.status=420;
                                                         res.send(output);
                                                         return;     
                                                       }
                                                       output.status =100;
                                                       res.send(output);
                                                       return;
                                                     });                                                             
                                                   }
                                                }else{
                                                  output.status =100;
                                                  res.send(output);    
                                                }
                                                break;                                                
                                          }    
                                        });  
                                      }else{
                                          console.log('followe_id로 UserinfoModel의 post_id를 찾으려 하였으나 results.length가 0이다. -->err이거나 그사이에 회원이 탈퇴함. --> 99.9% err로 간주할 것');
                                          output.status =408;
                                          res.send(output);
                                      }

                                    }); 
                                });
                            }else{
                                console.log('follow 당하는 아이디로 사용자를 조회하려했지만 사용자가 조회되지 않는다.-->회원탈퇴(이 오류는 발생하지 않아야 할 오류다. 발생시 코드 재점검 할 것.)');
                                output.status=404;
                                res.send(output);
                                return;
                            }
                        });
                    });
                  }else{
                    console.log('UserModel.find results.length ==0 --> err');
                    output.status=404;
                    res.send(output);  
                  }
                });
            }else{
                console.log('follow 당하는 _id로 사용자 정보를 조회한 결과, 아무런 결과값이 나오지않음 --> 사용자 회원탈퇴 추정됨.');
                output.status = 103;
                res.send(output);
                return
            }
        });
    }else{
        output.status = 410;
        res.send(output);
    }
}
module.exports.follow = follow;