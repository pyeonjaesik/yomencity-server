var getal = function(req,res){
  var _id=req.body._id||0;
  var database=req.app.get('database');
  var output={};
  output.al=[];
  if(database){
    database.AlModel.where({_id:_id}).update({d:0},function(err){
      if(err){
        console.log('AlModel.update err');
        output.status=400;
        res.send(output);
        return;  
      }
      database.AlModel.find({_id:_id},function(err,results){
        if(err){
          console.log('AlModel.find err');  
          output.status=401;
          res.send(output);
          return;
        }
        if(results.length>0){
          output.al=results[0]._doc.al;
          if(output.al.length>=20){
            output.status=100;
          }else if(output.al.length>0){
            output.status=101;
          }else{
            output.status=102;
          }
          res.send(output);
        }else{
          console.log('AlModel.find results.length==0 --> err');
          output.status=402;
          res.send(output);  
        }    
      });    
    });    
  }else{
    console.log('get al: no database');
    output.status=410;
    res.send(output);   
  }    
};
module.exports.getal = getal;