var getpb = function(req,res){
  var _id = req.body._id;
  var database = req.app.get('database');
  var output ={};
  output.p=[];
  output.c=[];
  output.n=[];    
  if(database){
    database.PModel.find({_id:_id},function(err,results){
      if(err){
        console.log('PModel.find err');
        output.status=401;
        res.send(output);
        return;  
      }
      if(results.length>0){
        output.p=results[0]._doc.p;
        output.n=results[0]._doc.n;
        output.c=results[0]._doc.c;
        if(output.p.length+output.n.length+output.c.length>0){
          output.status=100;   
        }else{
          output.status=102;      
        }
        res.send(output);  
      }else{
        console.log('PModel.find results.length==0 -->err');
        output.status=402;
        res.send(output);  
      }    
    });  
  }else{
    console.log('database 없음');
    output.status= 410;
    res.send(output);  
  }   
};
module.exports.getpb = getpb;