var vu = function(req,res){
  var _id=req.body._id;
  var id=req.body.id;
  var database= req.app.get('database');
  var ct=parseInt(Date.now()/1200000);    
  var output={};
  if(database){
    database.VModel.find({_id:_id},function(err,results){
      if(err){
        console.log('VModel.find err');
        output.status=401;
        res.send(output);
        return;  
      }
      if(results.length>0){
        var d=results[0]._doc.d;
        var v=results[0]._doc.v;  
        if(d==ct){
          var vi=v.indexOf(id);
          if(vi!=-1){
            console.log('조작 detected');
            output.status=500;
            res.send(output);
            return;  
          }else{
            v.unshift(id);  
            database.VModel.where({_id:_id}).update({v:v},function(err){
              if(err){
                console.log('v.update err');
                output.status=403;
                res.send(output);
                return;  
              }
              database.VModel.find({id:id},function(err,results){
                if(err){
                  console.log('VModel.find err');
                  output.status=404;
                  res.send(output);
                  return;    
                }
                if(results.length>0){
                  var n=results[0]._doc.n;
                  n++;
                  database.VModel.where({id:id}).update({n:n},function(err){
                    if(err){
                      console.log('vmodel update2 err');
                      output.status=406;
                      res.send(output);
                      return;    
                    }
                    output.status=100;
                    res.send(output);  
                  });    
                }else{
                  console.log('VModel.find results.length ==0 -->err');
                  output.status=405;
                  res.send(output);
                }  
              });    
            });  
          }    
        }else{
            var v=[];
            v.push(id);
            database.VModel.where({_id:_id}).update({v:v,d:ct},function(err){
              if(err){
                console.log('v.update err');
                output.status=403;
                res.send(output);
                return;  
              }
              database.VModel.find({id:id},function(err,results){
                if(err){
                  console.log('VModel.find err');
                  output.status=404;
                  res.send(output);
                  return;    
                }
                if(results.length>0){
                  var n=results[0]._doc.n;
                  n++;
                  database.VModel.where({id:id}).update({n:n},function(err){
                    if(err){
                      console.log('vmodel update2 err');
                      output.status=406;
                      res.send(output);
                      return;    
                    }
                    output.status=100;
                    res.send(output);  
                  });    
                }else{
                  console.log('VModel.find results.length ==0 -->err');
                  output.status=405;
                  res.send(output);
                }  
              });    
            });  
          }            
        }else{
        console.log('VModel.find results.length==0 -->err');
        output.status=402;
        res.send(output);  
      }    
    });  
  }else{
    console.log('no database');
    output.status=410;
    res.send(output);  
  }    
}
module.exports.vu = vu;