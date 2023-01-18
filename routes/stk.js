var stk = function(req,res){
  var tk = req.body.tk||'12';
  var _id = req.body._id||'12';
  var id = req.body.id||'script';
  var name= req.body.name||'12';    
  var database = req.app.get('database');
  var output={};
  if(database){
    database.UserinfoModel.find({_id:_id},function(err,results){
      if(err){
        console.log('UserModel.find err');
        output.status=401;
        res.send(output);
        return;  
      }
      if(results.length>0){
        if(results[0]._doc.id!=id||results[0]._doc.name!=name){
          console.log('other id detected');
          output.status=500;
          res.send(output);
          return;    
        }
        database.TkModel.where({_id:_id}).update({tk:tk},function(err){
          if(err){
            console.log('tk update err');
            output.status =401;
            res.send(output);
            return;  
          }
          output.status=100;
          res.send(output);
        });          
      }else{
        console.log('UserModel.find results.length ==0 -->err');
        output.status=402;
        res.send(output);  
      }    
    }); 
  }else{
    console.log('tk: no database');
    output.status=410;
    res.send(output);  
  }    
};
module.exports.stk = stk;
