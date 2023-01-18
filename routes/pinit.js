var pinit = function(req,res){
  var _id=req.body._id;
  var pb=req.body.pb;  
  var database= req.app.get('database');    
  var output={};
  if(database){
    var k=0;
    var pbpa=[];
    var pbra=[];
    var pbl=pb.length;    
    var pb_rec=function(){
      if(k>=pbl){                                        
        var pp= new database.PModel({'_id':_id,'r':pb,'p':pbpa});
        pp.save(function(err){
          if(err){
            console.log('p.save err');
            output.status=428;
            return;    
          }
          database.UserPModel.find({'_id':_id},function(err,results){
            if(err){
              console.log('UserPModel.find err');
              output.status=401;
              res.send(output);
              return;    
            }
            if(results.length>0){
              output.ph=results[0]._doc.ph;
              output.status = 100;
              res.send(output);                
            }else{
              console.log('UserPModel.find err');
              output.status=402;
              res.send(output);
              return;    
            }  
          });    
        });    
      }else{
        database.UserPModel.find({'ph':pb[k]},function(err,results){
          if(err){
            console.log('UserModel.find err for pb update');
            k++;
            pb_rec();
            return;  
          }
          var phl=results.length;    
          if(phl>0){
            for(var w=0;w<phl;w++){
              pbpa.push({i:results[w].id,n:results[w].name,p:pb[k]});  
            }
            k++  
            pb_rec();  
          }else{ 
            k++;
            pb_rec();  
          }    
        });                                                        
      }  
    };
    pb_rec();  
  }else{
    console.log('no database');
    output.status=410;
    res.send(output);  
  }    
}
module.exports.pinit = pinit;