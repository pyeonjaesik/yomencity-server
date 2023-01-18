var fds = function(req,res){
  var id= req.body.id;
  var output={};    
  var k =req.body.k;
  var er=0;  
  for (var i=0; i<k.length; i++)  {
    var chk = k.substring(i,i+1); 
    if(!chk.match(/[가-힣]|[a-z]|[A-Z]|[0-9]/)) { 
      er = er + 1; 
    } 
  } 
  if (er > 0) {
    output.status=400;
    res.send(output);
    return;
  }
  if(k.length<1){
    output.status=400;
    res.send(output)    
    return;  
  }    
  var k_r= new RegExp(k,'i');    
  var database= req.app.get('database');
  var tfd=[];  
  if(database){
    database.FModel.find({id:id},function(err,results){
      if(err){
        console.log('FModel.find err');
        output.status=401;
        res.send(output);
        return;  
      }
      if(results.length>0){
        var fd=results[0]._doc.fd;
        var fdl=fd.length;
        var fdid=[];       
        for(var i=0;i<fdl;i++){
          if(fd[i].id.search(k_r)!=-1||fd[i].n.search(k_r)!=-1){      
            if(fd[i].id==k||fd[i].n==k){
              tfd.push(fd[i].id);
            }else{
              fdid.push(fd[i].id);  
            }  
          }   
        }
        if(tfd.length>0){
          output.id=tfd.concat(fdid);  
        }else{
          output.id=fdid;
        }
        if(output.id.length==0){
          output.status=102;
        }else if(output.id.length<20){
          output.status=101;
        }else{
          output.status=100;
        }
        res.send(output); 
      }else{
        console.log('FModel.find results.length --> err');
        output.status=402;
        res.send(output);  
      }    
    });  
  }else{
    console.log('fds: no database');
    output.status=410;
    res.send(output);  
  }        
}
module.exports.fds = fds;