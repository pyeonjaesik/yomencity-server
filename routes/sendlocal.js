var sendlocal = function(req,res){
  var paramlat = req.body.location.coords.latitude;
  var paramlong = req.body.location.coords.longitude;
  var param_id = req.body._id;
  var li=req.body.li||0;
  var database = req.app.get('database');
  var output = {};
  var u_t = parseInt(Date.now());
  var ti = parseInt(Date.now()/43200000);
  var lat = parseFloat(paramlat);
  var long = parseFloat(paramlong);
  if(database){
    database.UserinfoModel.find({_id:param_id},function(err,results){
      if(err){
        console.log('UserinfoModel.find err');
        output.status=401;
        res.send(output);
        return;  
      }
      if(results.length>0){
        if(li==results[0]._doc.li){
          database.UserinfoModel.where({_id:param_id}).update({"t_i":ti,"u_t":u_t,geometry:{type:'Point',coordinates:[long,lat]}},function(err){
            if(err){
              console.log('Userinfo geometry update err');
              output.status = 401;
              res.send(output);
              return;
            }
            output.status = 100;
            res.send(output);
          });            
        }else{
          output.status=101;
          res.send(output);    
        }  
      }else{
        console.log('UserinfoModel.find results.length==0 -->err');
        output.status=402;
        res.send(output);  
      }    
    });
  }else{
    console.log('sendlocal no database');
    output.status = 404;
    res.send(output);
  }
};
module.exports.sendlocal = sendlocal;