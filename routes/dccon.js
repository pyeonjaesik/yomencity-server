var dccon = function(req,res){
  var _id=req.body._id;
  var post_id=req.body.post_id;
  var ti=req.body.ti;
  var database= req.app.get('database');
  var output={};
  if(database){
    database.PboxModel.find({_id:_id},function(err,results){
      if(err){
        console.log('PboxModel.find err');
        output.status=401;
        res.send(output);
        return;  
      }
      if(results.length>0){
        var p0=results[0]._doc.p0;
        var p1=results[0]._doc.p1;
        var p2=results[0]._doc.p2;
        var p3=results[0]._doc.p3;
        var p4=results[0]._doc.p4;
        var p5=results[0]._doc.p5;
        var p6=results[0]._doc.p6;
        var p7=results[0]._doc.p7;
        var p8=results[0]._doc.p8;
        var p9=results[0]._doc.p9;  
        if(p0.indexOf(post_id)!=-1){
          p0.splice(p0.indexOf(post_id),1);    
          database.PboxModel.where({_id:_id}).update({p0:p0},function(err){
            if(err){
              console.log('PboxModel.update err');
              output.status=403;
              res.send(output);
              return;    
            }
            output.status=100;
            res.send(output);  
          });    
        }else if(p1.indexOf(post_id)!=-1){
          p1.splice(p1.indexOf(post_id),1);    
          database.PboxModel.where({_id:_id}).update({p1:p1},function(err){
            if(err){
              console.log('PboxModel.update err');
              output.status=403;
              res.send(output);
              return;    
            }
            output.status=100;
            res.send(output);  
          });    
        }else if(p2.indexOf(post_id)!=-1){
          p2.splice(p2.indexOf(post_id),1);    
          database.PboxModel.where({_id:_id}).update({p2:p2},function(err){
            if(err){
              console.log('PboxModel.update err');
              output.status=403;
              res.send(output);
              return;    
            }
            output.status=100;
            res.send(output);  
          });    
        }else if(p3.indexOf(post_id)!=-1){
          p3.splice(p3.indexOf(post_id),1);    
          database.PboxModel.where({_id:_id}).update({p3:p3},function(err){
            if(err){
              console.log('PboxModel.update err');
              output.status=403;
              res.send(output);
              return;    
            }
            output.status=100;
            res.send(output);  
          });    
        }else if(p4.indexOf(post_id)!=-1){
          p4.splice(p4.indexOf(post_id),1);    
          database.PboxModel.where({_id:_id}).update({p4:p4},function(err){
            if(err){
              console.log('PboxModel.update err');
              output.status=403;
              res.send(output);
              return;    
            }
            output.status=100;
            res.send(output);  
          });    
        }else if(p5.indexOf(post_id)!=-1){
          p5.splice(p5.indexOf(post_id),1);    
          database.PboxModel.where({_id:_id}).update({p5:p5},function(err){
            if(err){
              console.log('PboxModel.update err');
              output.status=403;
              res.send(output);
              return;    
            }
            output.status=100;
            res.send(output);  
          });    
        }else if(p6.indexOf(post_id)!=-1){
          p6.splice(p6.indexOf(post_id),1);    
          database.PboxModel.where({_id:_id}).update({p6:p6},function(err){
            if(err){
              console.log('PboxModel.update err');
              output.status=403;
              res.send(output);
              return;    
            }
            output.status=100;
            res.send(output);  
          });    
        }else if(p7.indexOf(post_id)!=-1){
          p7.splice(p7.indexOf(post_id),1);    
          database.PboxModel.where({_id:_id}).update({p7:p7},function(err){
            if(err){
              console.log('PboxModel.update err');
              output.status=403;
              res.send(output);
              return;    
            }
            output.status=100;
            res.send(output);  
          });    
        }else if(p8.indexOf(post_id)!=-1){
          p8.splice(p8.indexOf(post_id),1);    
          database.PboxModel.where({_id:_id}).update({p8:p8},function(err){
            if(err){
              console.log('PboxModel.update err');
              output.status=403;
              res.send(output);
              return;    
            }
            output.status=100;
            res.send(output);  
          });    
        }else if(p9.indexOf(post_id)!=-1){
          p9.splice(p9.indexOf(post_id),1);    
          database.PboxModel.where({_id:_id}).update({p9:p9},function(err){
            if(err){
              console.log('PboxModel.update err');
              output.status=403;
              res.send(output);
              return;    
            }
            output.status=100;
            res.send(output);  
          });    
        }else{
          console.log('dccon error');    
          output.status=404;
          res.send(output);
          return;    
        }  
      }else{
        console.log('dccon pboxmodel.find err');
        output.status=402;
        res.send(output);  
      }    
    });
  }else{
    console.log('dccon no database');
    output.status=410;
    res.send(output);  
  }    
}
module.exports.dccon = dccon;