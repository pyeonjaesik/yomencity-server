var getmypostid = function(req,res){
  var _id = req.body._id;
  var database = req.app.get('database');
  var output ={};
  output.post_id =[];    
  if(database){
    database.PostModel.find({},function(err,results){
      if(err){
        console.log('PostModel.find err');
        output.status=403;
        res.send(output);
        return;  
      }
      if(results){
        var rel=results.length;
        for(var i=0;i<rel;i++){
          output.post_id.push(results[i]._doc._id);    
        }
        if(rel==0){
          output.status =402;
        }else if(rel<20){
          output.status = 101;
        }else{
          output.status =100;
          output.post_cont=parseInt(rel/20);    
        }
        res.send(output);  
      }else{
        output.status=402;
        res.send(output);  
      }    
    }).sort({_id:-1}).limit(300);  
  }else{
    console.log('database 없음');
    output.status =410;
    res.send(output);
  }
};
module.exports.getmypostid = getmypostid;