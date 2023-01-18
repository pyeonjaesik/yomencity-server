var dcplag = function(req,res){
  var _id=req.body._id;
  var id=req.body.id;
  var database= req.app.get('database');
  var ct=parseInt(Date.now());    
  var output={};
  if(database){
    database.LpModel.find({_id:_id},function(err,results){
      if(err){
        console.log('LpModel.find err');
        output.status=401;
        res.send(output);
        return;  
      }
      if(results.length>0){
        var user_id=results[0]._doc.user_id;
        var dc=results[0]._doc.dc;
        var dcn=results[0]._doc.dcn+1;  
        var dci= dc.indexOf(id); 
        if(dci==-1){
          dc.push(id);
          database.LpModel.where({_id:_id}).update({dc:dc,dcn:dcn},function(err){
            if(err){
              console.log('dc.update err');
              output.status=403;
              res.send(output);
              return;  
            }    
            database.TkModel.find({_id:user_id},function(err,results){
              if(err){
                console.log('TkModel.find err');
                output.status=404;
                res.send(output);
                return;    
              }
              if(results.length>0){
                var dcp=results[0]._doc.dcp;  
                if(dcp<ct){
                  dcp=ct+4000000;  
                }else{
                  dcp+=4000000;  
                }
                database.TkModel.where({_id:user_id}).update({dcp:dcp},function(err){
                 if(err){
                    console.log('TkModel.udpate err');
                    output.status=406;
                    res.send(output);
                    return;    
                  }
                  output.status=100;
                  res.send(output);  
                });    
              }else{
                console.log('TkModel.update err');
                output.status=405;
                res.send(output);    
              }  
            });    
          });        
        }else{
          console.log('dcplag already declared');
          output.status=101;
          res.send(output);    
        }  
      }else{
        console.log('LpModel.find resutls.length ==0 --> err');
        output.status=402;
        res.send(output);  
      }    
    });
  }else{
    console.log('dcplag no database');
    output.status=410;
    res.send(output);  
  }    
}
module.exports.dcplag = dcplag;