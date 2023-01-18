var phu = function(req,res){
  var ph=req.body.ph;
  var _id=req.body._id;
  var id=req.body.id;
  var name=req.body.n;
  var ct=parseInt(Date.now());    
  var database= req.app.get('database');    
  var output={};
  if(database){
    database.PModel.find({r:ph},function(err,results){
      if(err){
        output.status=401;
        res.send(output);
        return;  
      }
      var rel=results.length;    
      if(rel>0){
        var pua=[];
        for(var i=0;i<rel;i++){
          pua.push(results[i]._doc._id);    
        }
        var k=0;  
        var prec=function(){
          if(k>=rel){
            output.status=100;
            res.send(output);
            return;  
          }else{
          database.PModel.find({_id:pua[k]},function(err,results){
            if(err){
              console.log('PModel.find err');
              k++;
              prec();    
            }
            if(results.length>0){
              var c=results[0]._doc.c;
              c.unshift({i:id,n:name,p:ph,t:ct});  
              database.PModel.where({_id:pua[k]}).update({c:c},function(err){
                if(err){
                  console.log('PModel.update err'); 
                }
                k++;
                prec();     
              });   
            }else{
              console.log('results.length ==0 --> err');    
              k++;
              prec();    
            }  
          });              
          }    
        };
        prec();
      }else{
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
module.exports.phu = phu;