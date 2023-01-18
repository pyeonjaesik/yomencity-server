var lgid = function(req,res){
  var post_id = req.body.post_id;
  var database = req.app.get('database');
  var output ={};
  output.userid=[];
  if(database){
    database.LoveModel.find({_id:post_id},function(err,results){
      if(err){
        console.log('LoveModel.find err');
        output.status=401;
        res.send(output);
        return;
      }
      if(results.length>0){
        var ruid=results[0]._doc.id;
        if(ruid.length==0){
          output.status=102;
          res.send(output);
          return;    
        }  
        if(ruid.length<20){
          output.status=101;
          output.userid=ruid;
          res.send(output);
        }else{
          output.status=100;
          output.userid=ruid.splice(0,300);
          res.send(output);
        }     
      }else{
        console.log('LoveModel.find results.length==0 -->err');
        output.status=402;
        res.send(output);    
      }
    });  
  }else{
    console.log('lgid: no database');
    output.status=410;
    res.send(output);
  }   
};
module.exports.lgid = lgid;