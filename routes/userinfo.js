var userinfo = function(req,res){
  var userid = req.body.userid;
  var database = req.app.get('database');
  var output ={};
  if(database){
    database.UserPModel.find({id:userid},function(err,results){
      if(err){
        console.log('UserPModel find err');
        output.status =401;
        res.send(output);
        return;  
      }
      if(results.length>0){
        output.id = results[0]._doc.id;
        output.name = results[0]._doc.name;
        output.img = results[0]._doc.img;
        output.status=100;
        res.send(output);
      }else{
        console.log('UserPModel find: results.length ==0 --> err');
        output.status=402;
        res.send(output);
      }
    });      
  }else{
    console.log('userinfo no database');
    output.status =410;
    res.send(output);
  }    
};
module.exports.userinfo = userinfo;