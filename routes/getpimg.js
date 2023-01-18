var getpimg = function(req,res){
    var _id = req.body._id;
    var output ={};
    var database = req.app.get('database');
    if(database){
      database.UserPModel.find({_id:_id},function(err,results){
        if(err){
          console.log('_id를 근거하여 UserPModel의 document를 찾으려 했으나 err 발생');
          output.status = 400;
          res.send(output);
        }
        if(results.length>0){
          output.img = results[0]._doc.img;
          output.status =100;
          res.send(output);
        }else{
          console.log('get p img_id를 근거하여 UserPModel의 document를 찾으려 했으나 reulsts 값이 없음 --> err로 간주할 것');
          output.status = 402;
          res.send(output);
        }
      });
    }else{
      console.log('getpimg 에서 database 없음');
      output.status= 410;
      res.send(output);
    }
};
module.exports.getpimg = getpimg;