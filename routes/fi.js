var fi =function(req,res){
  var id2 = req.body.id2;
  var _id1 = req.body._id1;
  var database= req.app.get('database');
  var output= {};
  if(database){
    database.FModel.find({_id:_id1},function(err,results){
      if(err){
        console.log('fi: UserModel.find err');
        output.status=401;
        res.send(output);
        return;
      }
      if(results.length>0){
        var fg =results[0]._doc.fg;
        function checkf(em){
          return em.id==id2;
        }
        var io=fg.findIndex(checkf);
        if(io==-1){
          output.status=100;
          output.fi='0';
          res.send(output);  
        }else{
          output.status=100;
          output.fi='1';
          res.send(output);    
        }          
      }else{
        console.log('fi: UserModel.find results.length==0 -->err');
        output.status=402;
        res.send(output)  
      }
    });  
  }else{
    console.log('fi: no database');
    output.status=410;
    res.send(output);  
  }    
};
module.exports.fi = fi;