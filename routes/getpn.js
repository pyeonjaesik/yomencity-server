var getpn = function(req,res){
    var id = req.body.id;
    var output ={};
    var database = req.app.get('database');
    if(database){
      database.UserPModel.find({id:id},function(err,results){
        if(err){
          console.log('UserPModel.find err');
          output.status = 400;
          res.send(output);
          return;    
        }
        if(results.length>0){
          output.img = results[0]._doc.img;
          output.name=results[0]._doc.name;
          output.status =100;
          res.send(output);
        }else{
          console.log('UserPModel.find results.length ==0 -->err');
          output.status = 402;
          res.send(output);
        }
      });
    }else{
      console.log('getpn: no database');
      output.status= 410;
      res.send(output);
    }
};
module.exports.getpn = getpn;