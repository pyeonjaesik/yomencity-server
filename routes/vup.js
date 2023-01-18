var vup=function(req,res){
  var _id=req.body._id;
  var va=req.body.va;
  var val=va.length;
  var i=0;    
  var database=req.app.get('database');
  var output={};
  output.va=[];
  var sva=[];    
  if(database){
    database.VModel.where({_id:_id}).update({va:va},function(err){
      if(err){
        console.log('VModel.update err');
        output.status=401;
        res.send(output);
        return;  
      }
      var db_r=function(){
        if(i==val){
          output.va=sva;
          output.status=100;
          res.send(output);
          return;    
        }
        database.VModel.find({id:va[i].id},function(err,results){
          if(err){
            output.status=402;
            res.send(output);
            return;  
          }
          if(results.length>0){
            sva=sva.concat(results[0]._doc.va);  
            i++;
            db_r();  
          }else{
            console.log('VModel.find results.length==0-->err');
            i++;
            db_r();  
          }    
        });  
      };    
      db_r();
    });  
  }else{
    console.log('vup no database');
    output.status=410;
    res.send(output);
    return;  
  }    
}
module.exports.vup = vup;