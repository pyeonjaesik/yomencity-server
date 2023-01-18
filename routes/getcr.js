var getcr = function(req,res){
  var _id = req.body._id;
  var database = req.app.get('database');
  var output ={};
  output.ch=[];    
  if(database){
    database.ChModel.find({_id:_id},function(err,results){
      if(err){
        console.log('ChModel.find err');
        output.status=401;
        res.send(output);
        return;  
      }
      if(results.length>0){
        output.ch =results[0]._doc.ch;
        if(output.ch.length>=20){
          output.status=100;    
        }else if(output.ch.length>0){
          output.status=101;
        }else{
          output.status=102;    
        }
        res.send(output);
      }else{
        console.log('ChModel.find results.length ==0 -->err');
        output.status=402;
        res.send(output);  
      }    
    });
  }else{
    console.log('getcr: no database');
    output.status=410;
    res.send(output);  
  }  
};
module.exports.getcr = getcr;