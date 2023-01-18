var lvarr = function(req,res){
  var _id = req.body._id||'0';
  var li =req.body.li;
  var database = req.app.get('database');
  var output={};
  output.post_id=[];
  output.lpost_id=[];
  output.mfg=[];
  if(database){
    database.MlvModel.find({_id:_id},function(err,results){
      if(err){
        console.log('MlbModel.find err');
        output.status=401;
        res.send(output);
        return;  
      }
      if(results.length>0){
        output.post_id=results[0]._doc.post_id;
        database.FModel.find({_id:_id},function(err,results){
          if(err){
            console.log('FModel.find err');
            output.status=401;
            res.send(output);
            return;  
          }
          if(results.length>0){
            output.mfg=results[0].fg;
            database.TkModel.find({_id:_id},function(err,results){
              if(err){
                console.log('TkModel.find err');
                output.status=403;
                res.send(output);
                return;  
              }
              if(results.length>0){
                output.i1=results[0]._doc.i1;
                output.i2=results[0]._doc.i2;
                output.i3=results[0]._doc.i3;
                output.i4=results[0]._doc.i4;
                output.i11=results[0]._doc.i11;
                output.i12=results[0]._doc.i12;  
                if(li==0){
                  database.UserinfoModel.find({_id:_id},function(err,results){
                    if(err){
                      console.log('UserinfoModel.find err');
                      output.status=404;
                      res.send(output);
                      return;  
                    }
                    if(results.length>0){
                      var li=results[0]._doc.li;
                      li++;
                      database.UserinfoModel.where({_id:_id}).update({li:li},function(err){
                        if(err){
                          console.log('UserinfoModel.update err');
                          output.status=406;
                          res.send(output);
                          return;    
                        }
                        output.li=li;
                        database.AlModel.find({_id:_id},function(err,results){
                          if(err){
                            console.log('AlModel.find err');
                            output.status=401;
                            res.send(output);
                            return;    
                          }
                          if(results.length>0){
                            output.d=results[0]._doc.d;
                            database.VModel.find({_id:_id},function(err,results){
                              if(err){
                                console.log('VModel.find err');
                                output.status=406;
                                res.send(output);
                                return;  
                              }
                              if(results.length>0){
                                output.vd=results[0]._doc.d;
                                output.vv=[];
                                output.vv=results[0]._doc.v;
                                database.MlvlModel.find({_id:_id},function(err,results){
                                  if(err){
                                    console.log('MlvlModel.find err');
                                    output.status=407;
                                    res.send(output);
                                    return;  
                                  }
                                  if(results.length>0){
                                    output.lpost_id=results[0]._doc.post_id;
                                    database.LaModel.find({_id:_id},function(err,results){
                                      if(err){
                                        console.log('LaModel.find err');
                                        output.status=408;
                                        res.send(output);
                                        return;  
                                      }
                                      if(results.length>0){
                                        output.status=100;
                                        output.p2al=results[0]._doc.a.length;
                                        res.send(output);
                                      }else{
                                        console.log('LaModel.find results.length ==0 -->err');
                                        output.status=409;
                                        res.send(output);  
                                      }    
                                    });  
                                  }else{
                                    console.log('Mlvl.find results.length ==0 -->err');
                                    output.status=409;
                                    res.send(output);  
                                  }    
                                });  
                              }else{
                                console.log('VModel.find results.length ==0 -->err');
                                output.status=407;
                                res.send(output);  
                              }    
                            });    
                          }else{
                            console.log('AlModel results.length ==0 -->err');
                            output.status=402;
                            res.send(output);    
                          }  
                        });
                      });    
                    }else{
                      console.log('UserinfoModel.find results.length ==0 -->err');
                      output.status=405;
                      res.send(output);    
                    }    
                  });                    
                }else{
                  database.UserinfoModel.find({_id:_id},function(err,results){
                    if(err){
                      console.log('UserinfoModel.find err');
                      output.status=406;
                      res.send(output);
                      return;    
                    }
                    if(results.length>0){
                      output.li=results[0]._doc.li;
                      database.AlModel.find({_id:_id},function(err,results){
                        if(err){
                          console.log('AlModel.find err');
                          output.status=401;
                          res.send(output);
                          return;    
                        }
                        if(results.length>0){
                          output.d=results[0]._doc.d;
                          database.MlvlModel.find({_id:_id},function(err,results){
                            if(err){
                              console.log('MlvlModel.find err');
                              output.status=407;
                              res.send(output);
                              return;  
                            }
                            if(results.length>0){
                              output.lpost_id=results[0]._doc.post_id;
                              database.LaModel.find({_id:_id},function(err,results){
                                if(err){
                                  console.log('LaModel.find err');
                                  output.status=408;
                                  res.send(output);
                                  return;  
                                }
                                if(results.length>0){
                                  output.status=100;
                                  output.p2al=results[0]._doc.a.length;
                                  res.send(output);
                                }else{
                                  console.log('LaModel.find results.length ==0 -->err');
                                  output.status=409;
                                  res.send(output);  
                                }    
                              }); 
                            }else{
                              console.log('Mlvl.find results.length ==0 -->err');
                              output.status=409;
                              res.send(output);  
                            }    
                          });    
                        }else{
                          console.log('AlModel results.length ==0 -->err');
                          output.status=402;
                          res.send(output);    
                        }  
                      });    
                    }else{
                      output.status=409;
                      res.send(output);    
                    }  
                  });    
                }  
              }else{
                output.status=402;
                console.log('TkModel.find results.length==0 --> err');
                res.send(output);  
              }    
            });    
          }else{
            output.status=402;
            console.log('FModel.find results.length==0 -->err');
            res.send(output);  
          }    
        });  
      }else{
        console.log('MlvModel.find results.length==0 --> err');
        output.status=402;
        res.send(output);  
      }
    });  
  }else{
    console.log('lvarr no database');
    output.status=410;
    res.send(output);
  }   
};
module.exports.lvarr = lvarr;