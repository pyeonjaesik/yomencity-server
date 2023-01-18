var getcm = function(req,res){
  var c_id=req.body.c_id;
  var database=req.app.get('database');
  var output={};
  if(database){
    database.CommentModel.find({_id:c_id},function(err,results){
      if(err){
        console.log('commentModel.find err');  
        output.status=401;
        res.send(output);
        return;  
      }
      if(results.length>0){
        output.status=100;
        output.txt=results[0]._doc.text;
        output.t=results[0]._doc.created_time;
        output.id = results[0]._doc.tk[0];  
        database.UserPModel.find({id:output.id},function(err,results){
          if(err){
            console.log('UserPModel.find err');
            output.status=403;
            res.send(output);
            return;  
          }
          output.img=results[0]._doc.img;
          output.n=results[0]._doc.name;
          res.send(output);    
        }); 
      }else{
        console.log('commentModel.find results.length==0 --> err');
        outputs.status=402;
        res.send(output);  
      }    
    });  
  }else{
    console.log('getcm: no database');
    output.status=410;
    res.send(output);  
  }    
};
module.exports.getcm = getcm;