var vupf=function(req,res){
  var _id=req.body._id;
  var database=req.app.get('database');
  var output={};    
  if(database){
    database.VModel.find({_id:_id},function(err,results){
      if(err){
        output.status=401;
        res.send(output);
        return;  
      }
      if(results.length>0){
        var va=results[0]._doc.va;
        output.status=100;
        output.va=[];
        output.va=va;
        res.send(output);  
      }else{
        console.log('results.length==0 --> err');
        output.status=402;
        res.send(output);  
      }    
    });
  }else{
    console.log('vup no database');
    output.status=410;
    res.send(output);
    return;  
  }    
}
module.exports.vupf = vupf;