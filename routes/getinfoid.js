var getinfoid = function(req,res){
  var userid = req.body.userid;
  var database = req.app.get('database');
  var output = {};
  output.post_id =[];
  if(database){
    database.PostinfoModel.find({id:userid},function(err,results){
      if(err){
        console.log('_id('+_id+')postinfoModel 에서 post_id 를 가져오려고 시도 중 err 발생');
        output.status = 400;
        res.send(output);
        return;  
      }
      if(results.length>0){
        output.post_id = results[0]._doc.post_id;
        var opl=output.post_id.length;
        if(opl>=21){
          output.status =100;
          res.send(output);
        }else if(opl>0){
          output.status =101;
          res.send(output);
        }else{
          output.status =102;
          res.send(output);
        }
      }else{
        output.status =401;
        res.send(output);
      }   
    });      
  }else{
    console.log('getinfoid: database 없음');
    output.status =410;
    res.send(output);  
  }   
};
module.exports.getinfoid = getinfoid;