var getsreplyid = function(req,res){
  var comment_id = req.body.comment_id;
  var database = req.app.get('database');
  var output={};
  output.reply_id=[];    
  if(database){
    database.CommentModel.find({_id:comment_id},function(err,results){
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
    console.log('getsreplyid : no database');
    output.status=410;
    res.send(output);  
  }
};
module.exports.getsreplyid = getsreplyid;