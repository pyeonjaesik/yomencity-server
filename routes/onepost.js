var onepost = function(req,res){
  var post_id = req.body.post_id;
  var database = req.app.get('database');
  var output={};
  if(database){
    database.PostModel.find({_id:post_id},function(err,results){
      if(err){
      output.status = 401;
      res.send(output);
      return;
      }
      if(results.length>0){
        output.userid =  results[0]._doc.userid;
        output.post_id = results[0]._doc._id;
        output.username = results[0]._doc.username;
        output.text = results[0]._doc.text;
        output.img1 = results[0]._doc.img1;
        output.img2 = results[0]._doc.img2;
        output.img3 = results[0]._doc.img3;
        output.img4 = results[0]._doc.img4;
        output.ln = results[0]._doc.ln;
        output.cn = results[0]._doc.cn;
        output.created_time = results[0]._doc.created_time;
          database.UserPModel.find({id:output.userid},function(err,results){
            if(err){
              console.log(output.userid[i]+'로 UserPModle 의 프로필 이미지를 찾으려 했지만 err발생.');
              output.pimg='0';
              output.status= 403;    
              res.send(output);
              return;    
            }
            if(results.length>0){
              output.pimg=results[0]._doc.img;
              output.status=100;
              res.send(output);    
            }else{
              output.pimg='0';
              output.status=402;
              res.send(output);                
            }
          });          
      }
    });
  }else{
    console.log('onepost no database');
    output.status=410;
    res.send(output);
  }
};
module.exports.onepost = onepost;