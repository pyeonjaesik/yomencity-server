var getfgid = function(req,res){
  var id = req.body.id;
  var database = req.app.get('database');
  var output ={};
  output.userid=[];    
  if(database){
    database.FModel.find({id:id},function(err,results){
      if(err){
        console.log('FModel.find err');
        output.status = 401;
        res.send(output);
        return;  
      }
      if(results.length>0){
        var fg=results[0]._doc.fg;
        var fgl=fg.length;
        var tfg=[];  
        for(var i=0;i<fgl;i++){
          tfg.push(fg[i].id);
        }
        output.userid=tfg;  
        if(fgl>20){
          output.status=100;
          res.send(output);           
        }else if(fgl>0){
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
module.exports.getfgid = getfgid;