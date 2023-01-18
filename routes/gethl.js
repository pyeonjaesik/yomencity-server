var gethl = function(req,res){
  var id=req.body.id;
  var database =req.app.get('database');
  var output={};
  output.hl=[];
  if(database){
    database.HlModel.find({id:id},function(err,results){
      if(err){
        console.log('HlModel.find err');
        output.status=401;
        res.send(output);
        return;  
      }
      if(results.length>0){
        output.hl=results[0]._doc.hl;
        if(output.hl.length>=20){
          output.status=100;    
        }else if(output.hl.length>0){
          output.status=101;    
        }else{
          output.status=102;
        }
        res.send(output); 
      }else{
        console.log('HlModel.find results.length ==0 --> err');
        output.status=402;
        res.send(output);  
      }    
    });  
  }else{
    console.log('get hl: no database');
    output.status=410;
    res.send(output);  
  }       
};
module.exports.gethl = gethl;