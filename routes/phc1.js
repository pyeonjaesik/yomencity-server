var phc1 = function(req,res){
  var ph=req.body.ph;
  var _id=req.body._id;
  var ct=parseInt(Date.now());    
  var database= req.app.get('database');    
  var output={};
  if(database){
    var phl=ph.length;
    var k=0;
    var phra=[];
    var phna=[];
    var prec=function(){
      if(k==phl){
        database.PModel.find({_id:_id},function(err,results){
          if(err){
            console.log('PModel.find err');
            output.status=402;
            res.send(output);
            return;  
          }
          if(results.length>0){
            var r=results[0]._doc.r;
            r=r.concat(ph);  
            var p=results[0]._doc.p;  
            var n=results[0]._doc.n;
            var c=results[0]._doc.c;  
            var nl=n.length;
            var cl=c.length;
            var n_c=[];
            var n_n=[];  
            for(var u=0;u<nl;u++){
              if(ct-n[u].t<86400000){
                n_n.push(n[u]);
              }else{
                p.push({i:n[u].i,n:n[u].n,p:n[u].p});  
              }    
            }
            for(var q=0;q<cl;q++){
              if(ct-c[q].t<86400000){
                n_c.push(c[q]);
              }else{
                p.push({i:c[q].i,n:c[q].n,p:c[q].p});  
              }           
            }
            n_n=phna.concat(n_n);             database.PModel.where({_id:_id}).update({r:r,p:p,n:n_n,c:n_c},function(err){
              if(err){
                console.log('PModel.update err');
                output.status=404;
                res.send(output);
                return;  
              }
              output.status=100;
              res.send(output);
              return;    
            });
          }else{
            console.log('PModel.find results.length==0 -->err');
            output.status=403;
            res.send(output);
            return;  
          }    
        });  
      }else{
        database.UserPModel.find({ph:ph[k]},function(err,results){
          if(err){
            console.log('UserPModel.find err');
            output.status=401;
            res.send(output);
            return;  
          }
          var rel=results.length;    
          if(rel>0){
            for(var i=0;i<rel;i++){
              phna.push({i:results[i]._doc.id,n:results[i]._doc.name,p:results[i]._doc.ph,t:ct});                
            }
            k++;
            prec();  
          }else{
            k++;
            prec();  
          }    
        });   
      }        
    };
    prec();
  }else{
    console.log('no database');
    output.status=410;
    res.send(output);  
  }    
}
module.exports.phc1 = phc1;