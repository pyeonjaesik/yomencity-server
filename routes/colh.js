var colh = function(req,res){
  var post_id=req.body.post_id||0;
  var user_id=req.body._id||'script';
  var output={};    
  if(post_id==0||user_id=='script'){
    console.log('500');
    output.status=500;
    res.send(output);
    return;  
  }
  var database=req.app.get('database');
  if(database){
    database.LhModel.find({_id:user_id},function(err,results){
      if(err){
        console.log('LhModel.find err');
        output.status=401;
        res.send(output);
        return;  
      }
      if(results.length>0){
        var c=results[0]._doc.c;
        var ci=c.indexOf(post_id);
        if(ci!=-1){c.splice(ci,1);}
        c.unshift(post_id);
        c=c.splice(0,49);
        database.LhModel.where({_id:user_id}).update({c:c},function(err){
          if(err){
            console.log('LhModel.update err');
            output.status=401;
            res.send(output);
            return;  
          }
          output.status=100;
          res.send(output);
        });  
      }else{
        console.log('LhModel.find results.length ==0 -->err');
        output.status=402;
        res.send(output);  
      }    
    }); 
  }else{
    console.log('achd1 no database');
    output.status=410;
    res.send(output);  
  }    
};
module.exports.colh = colh;