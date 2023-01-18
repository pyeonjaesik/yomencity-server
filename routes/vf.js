var vf = function(req,res){
  var id=req.body.id;
  var database= req.app.get('database');
  var output={};
  if(database){
    database.VModel.find({id:id},function(err,results){
      if(err){
        console.log('VModel.find err');
        output.status=401;
        res.send(output);
        return;  
      }
      if(results.length>0){
        var n=results[0]._doc.n;
        output.n=n;
        output.status=100;
        res.send(output);
      }else{
        console.log('VModel.find results.length ==0 --> err');
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
module.exports.vf = vf;