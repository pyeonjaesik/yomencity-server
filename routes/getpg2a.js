var getpg2a = function(req,res){
  var _id = req.body._id;
  var database = req.app.get('database');
  var output = {};
  output.pl=[];
  if(database){
    database.LaModel.find({_id:_id},function(err,results){
      if(err){
        console.log('LaModel.find err');
        output.status=401;
        res.send(output);
        return;    
      }
      if(results.length>0){
        output.pl=results[0]._doc.a;
        output.status=100;
        res.send(output);
      }else{
        console.log('LaModel.find results.length ==0 --> err');
        output.status=402;
        res.send(output);    
      }  
    });    
  }else{
    console.log('getpg2a: no database');
    output.status = 403;
  }    
};
module.exports.getpg2a = getpg2a;