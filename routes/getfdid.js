var getfdid = function(req,res){
  var id = req.body.id;
  var database = req.app.get('database');
  var output ={};
  output.userid=[];    
  if(database){
    database.FModel.find({id:id},function(err,results){
      if(err){
        console.log('UserModel.find 시도 중 err 발생');
        output.status = 401;
        res.send(output);
        return;  
      }
      if(results.length>0){
        var fd=results[0]._doc.fd;
        var fdl=fd.length;
        var tfd=[];  
        for(var i=0;i<fdl;i++){
          tfd.push(fd[i].id);
        }
        output.userid=tfd;
        if(fdl>20){
          output.status=100;
          res.send(output);            
        }else if(fdl>0){
          output.status=101;
          res.send(output);
        }else{
          output.status=102;
          res.send(output);    
        } 
 
      }else{
        console.log('UserModel.find 한 결과 results.length ==0 -->err로 간주');
        output.status =402;
        res.send(output);  
      }    
    });      
  }else{
    console.log('database 없음');
    output.status= 410;
    res.send(output);  
  }   
};
module.exports.getfdid = getfdid;