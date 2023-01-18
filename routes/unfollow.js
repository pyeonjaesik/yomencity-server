var unfollow = function(req,res){
  var id2 = req.body.id2;
  var _id1 = req.body._id1;
  var id1 = req.body.id1;    
  var database = req.app.get('database');
  var output = {};    
  if(database){
    database.FModel.find({_id:_id1},function(err,results){
      if(err){
        console.log('unfollow : UserModel.find1: err');
        output.status=401;
        res.send(output);
        return;    
      }
      if(results.length>0){
        var fgn1 = results[0]._doc.fgn;
        fgn1--;  
        var tmp = results[0]._doc.fg;
        function checkf(em){
          return em.id==id2;
        }
        var io=tmp.findIndex(checkf);
        if(io!=-1){
          tmp.splice(io,1);
          database.FModel.where({_id:_id1}).update({fg:tmp,fgn:fgn1},function(err){
            if(err){
              console.log('unfollow : UserModel.find2: err');
              output.status=403;
              res.send(output);
              return;    
            }
            database.FModel.find({id:id2},function(err,results){
              if(err){
                console.log('FModel.find err');
                output.status=404;
                res.send(output);
                return;  
              }
              if(results.length>0){
                var fdn2=results[0]._doc.fdn;
                fdn2--;  
                var tfd= results[0]._doc.fd;
                function checkf2(em){
                  return em.id==id1;
                }
                var io2=tfd.findIndex(checkf2);
                if(io2!=-1){
                  tfd.splice(io2,1);
                  database.FModel.where({id:id2}).update({fd:tfd,fdn:fdn2},function(err){
                    if(err){
                      console.log('FModel.update2 err');
                      output.status=406;
                      res.send(output);
                      return;    
                    }
                    output.status=100;
                    res.send(output);  
                  });    
                }else{
                  output.status=407;
                  res.send(output);    
                }  
              }else{
                console.log('FModel.find results.length==0 --> err');
                output.status=405;
                res.send(output);  
              }
            });
          });
        }else{
          database.FModel.find({id:id2},function(err,results){
            if(err){
              console.log('FModel.find err');
              output.status=404;
              res.send(output);
              return;  
            }
            if(results.length>0){
              var tfd= results[0]._doc.fd;
              function checkf2(em){
                return em.id==id1;
              }
              var io2=tfd.findIndex(checkf2);
              if(io2!=-1){
                tfd.splice(io2,1);
                database.FModel.where({id:id2}).update({fd:tfd},function(err){
                  if(err){
                    console.log('FModel.update2 err');
                    output.status=406;
                    res.send(output);
                    return;    
                  }
                  output.status=100;
                  res.send(output);  
                });    
              }else{
                output.status=407;
                res.send(output);    
              }  
            }else{
              console.log('FModel.find results.length==0 --> err');
              output.status=405;
              res.send(output);  
            }
          });  
        }    
      }else{
        console.log('UserModel.find{_id:follwing_id} results.length==0 --> err');
        output.status=402;
        res.send(output);    
      } 
    });              
  }else{
    console.log('unfollow: no database');
    output.status=410;
    res.send(output);  
  }   
};
module.exports.unfollow = unfollow;