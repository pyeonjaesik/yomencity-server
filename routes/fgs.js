var fgs = function(req,res){
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
    console.log('not valid k');
    output.status=400;
    res.send(output);
    return;
  }
  if(k.length<1){
    console.log('not valid k');
    output.status=400;
    res.send(output)    
    return;  
  }    
  var k_r= new RegExp(k,'i');    
  var database= req.app.get('database');
  var tfg=[];  
  if(database){
    database.FModel.find({id:id},function(err,results){
      if(err){
        console.log('FModel.find err');
        output.status=401;
        res.send(output);
        return;  
      }
      if(results.length>0){
        var fg=results[0]._doc.fg;
        var fgl=fg.length;
        var fgid=[];       
        for(var i=0;i<fgl;i++){
          if(fg[i].id.search(k_r)!=-1||fg[i].n.search(k_r)!=-1){      
            if(fg[i].id==k||fg[i].n==k){
              tfg.push(fg[i].id);
            }else{
              fgid.push(fg[i].id);  
            }  
          }   
        }
        if(tfg.length>0){
          output.id=tfg.concat(fgid);  
        }else{
          output.id=fgid;
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
    console.log('fgs: no database');
    output.status=410;
    res.send(output);  
  }        
}
module.exports.fgs = fgs;