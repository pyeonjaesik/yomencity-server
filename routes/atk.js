var atk = function(req,res){
  var _id=req.body._id;
  var tk =req.body.tk;
  var database = req.app.get('database');
  var output={};
  if(database){
    database.TkModel.find({_id:_id},function(err,results){
      if(err){
        console.log('TkModel.find err');
        output.status=410;
        res.send(output);
        return;  
      }
      if(results.length>0){
        if(results[0]._doc.tk==tk){
          if(results[0]._doc.p<100){
            output.status=100;
            res.send(output);  
          }else{
            output.status=102;
            res.send(output);  
          }    
        }else{
          console.log('token changed or ddos attack detected');
          output.status=600;
          res.send(output);    
        }  
      }else{
        console.log('TkModel.find results.length==0 -->err');
        output.status=402;
        res.send(output);  
      }    
    });  
  }else{
    console.log('atk no database');
    output.status=410;
    res.send(output);  
  }    
}
module.exports.atk = atk;