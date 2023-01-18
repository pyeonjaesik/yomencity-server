var getreplyid = function(req,res){
  var post_id = req.body.post_id;
  var database = req.app.get('database');
  var output={};
  output.reply_id=[];    
  if(database){
    database.PostModel.find({_id:post_id},function(err,results){
      if(err){
        output.status =401;
        res.send(output);
        return;  
      }
      if(results.length>0){
        output.reply_id=results[0]._doc.cm;
        if(output.reply_id.length==0){
          output.status=102;
          res.send(output);
          return;    
        }  
        if(output.reply_id.length<=15){
          output.status=101;    
        }else{
          output.status=100;            
        } 
        res.send(output);  
      }else{
        console.log('database.PostModel.find resutls.length==0 --> err');
        output.status=402;
        res.send(output);  
      }    
    });  
  }else{
    console.log('getreplyid : no database');
    output.status=410;
    res.send(output);  
  }
};
module.exports.getreplyid = getreplyid;