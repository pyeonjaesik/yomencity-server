var getsearchlid = function(req,res){
  var k_word = req.body.k_word;
  var output = {};    
  var er=0;  
  for (var i=0; i<k_word.length; i++)  {
    var chk = k_word.substring(i,i+1); 
    if(!chk.match(/[가-힣]|[a-z]|[A-Z]|[0-9]/)) { 
      er = er + 1; 
    } 
  } 
  if (er > 0) {
    console.log('not valid k_word');
    output.status=400;
    res.send(output);
    return;
  }
  if(k_word.length<1){
    console.log('not valid k_word');
    output.status=400;
    res.send(output)    
    return;  
  }    
  var lat = req.body.lat;
  var long = req.body.long;
  output.p=[];
  var database = req.app.get('database');    
  if(database.db){
    database.UserinfoModel.findSiNear(long,lat,500,300,k_word,function(err,results){
      if(err){
          console.log('k_word로 findSiNear 하려 했으나 err 발생');
          output.status = 400;
          res.send(output);
      }
      if(results.length>0){
          var re_leng2 = results.length;
          for(var i=0;i<re_leng2;i++){
            output.p.push(results[i].id);  
          } 
          database.UserinfoModel.findSnNear(long,lat,500,300,k_word,function(err,results){
          if(err){
            output.status=401;
            res.send(output);
            return;  
          }      
          var re_leng = results.length;
          for(var i=0;i<re_leng;i++){
            output.p.push(results[i].id);  
          }
          if(output.p.length>30){
            output.status=100;  
          }else if(output.p.length>0){
            output.status=101;  
          }else{
            output.status=102;  
          }
          res.send(output);      
        });  
      }else{
        database.UserinfoModel.findSnNear(long,lat,500,300,k_word,function(err,results){
          if(err){
            output.status=401;
            res.send(output);
            return;  
          }            
          var re_leng = results.length;
          for(var i=0;i<re_leng;i++){
            output.p.push(results[i].id);  
          }
          if(output.p.length>30){
            output.status=100;  
          }else if(output.p.length>0){
            output.status=101;  
          }else{
            output.status=102;  
          }
          res.send(output);    
        });          
      }    
    });      
  }else{
    console.log('getlsearchid no database');
    output.status=410;
    res.send(output);
    return;  
  }    
}
module.exports.getsearchlid = getsearchlid;