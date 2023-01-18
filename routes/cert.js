var cert = function(req,res){
    var paramId = req.body.id||0;
    var output = {};
    var er=0;
    for (var i=0; i<paramId.length; i++)  {
      var chk = paramId.substring(i,i+1); 
      if(!chk.match(/[a-z]|[A-Z]|[0-9]/)) { 
        er = er + 1; 
      } 
    } 
    if (er > 0) {
      console.log('not valid info');
      output.status=800;
      res.send(output);
      return;
    }
    if(paramId.length<1||paramId.length>13){
      console.log('not valid info11');
      output.status=800;
      res.send(output)    
      return;  
    }    
    var xss = require("xss");
    paramId=xss(paramId);
    var k_r= new RegExp('script','i');
    var sc_i=paramId.search(k_r);
    if(sc_i!=-1){
      output.status=700;    
      res.send(output);
      return;    
    }
    var database = req.app.get('database');    
    if(database.db){
        database.UserModel.find({id:paramId},function(err,results){
            if(err){
              output.status=401;
              res.send(output);
              return;
            }
            if(results.length >0){
                output.status = 2;
                res.send(output);
                return;
            }
            output.status = 1;
            res.send(output);            
        });
    }else{
        output.status = 10;
        res.send(output);
    }
};
module.exports.cert = cert;