var oneplag = function(req,res){
    var post_id = req.body.post_id;
    var database = req.app.get('database');
    var output = {};
    if(database){
      database.LpModel.find({_id:post_id},function(err,results){
        if(err){
          console.log('LpModel.find err');
          output.status=401;
          res.send(output);    
          return;    
        }
        if(results.length>0){
          output.p={_id:results[0]._doc._id,s:results[0]._doc.text,t:results[0]._doc.ct,r:results[0]._doc.p[1],l:results[0]._doc.p[0],ln:results[0]._doc.ln,cn:results[0]._doc.cn,nn:results[0]._doc.nn}
          output.status=100;
          res.send(output);
          return;    
        }else{
          console.log('LpModel.find results.length==0 -->err');
          output.status=402;
          res.send(output);    
        }  
      });    
    }else{
        console.log('database 없음');
        output.status = 403;
    }    
};
module.exports.oneplag = oneplag;