var remp2a2 = function(req,res){
  var post_id=req.body.post_id||0;
  var _id=req.body._id||'script';
  var ni=req.body.ni;
  var ti=req.body.ti;    
  var output={};    
  if(post_id==0||_id=='script'){
    console.log('500');
    output.status=500;
    res.send(output);
    return;  
  }
  var database=req.app.get('database');
  if(database){
    database.LaModel.find({_id:_id},function(err,results){
      if(err){
        console.log('LaModel.find err');
        output.status=401;
        res.send(output);
        return;  
      }
      if(results.length>0){
        var al=results[0]._doc.a;
        function checkAl(em) {
          return em.type=='2'&&em._id==post_id&&em.ni==ni&&em.ti==ti;
        }
        var afi=al.findIndex(checkAl);
        al.splice(afi,1);
        database.LaModel.where({_id:_id}).update({a:al},function(err){
          if(err){
            console.log('LaModel.update err');
            output.status=403;
            res.send(output);
            return;  
          }
          output.status=100;
          res.send(output);    
        });  
      }else{
        console.log('LaModel.find results.length==0 -->err');
        output.status=402;
        res.send(output);  
      }    
    }); 
  }else{
    console.log('remp2a2 no database');
    output.status=410;
    res.send(output);  
  }    
};
module.exports.remp2a2 = remp2a2;