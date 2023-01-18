var phl = function(req,res){
  var _id=req.body._id;
  var database= req.app.get('database');    
  var output={};
  if(database){
    database.PModel.find({_id:_id},function(err,results){
      if(err){
        console.log('PModel.find err');
        output.status=401;
        res.send(output);
        return;  
      }
      if(results.length>0){
        var rpnc=results[0]._doc.r;  
        var p=results[0]._doc.p;
        var n=results[0]._doc.n;
        var c=results[0]._doc.c;
        var pl=p.length;
        var nl=n.length;
        var cl=c.length;
        for(var i=0;i<pl;i++){
          rpnc.push(p[i].p);      
        }
        for(var j=0;j<nl;j++){
          rpnc.push(n[j].p);    
        }
        for(var k=0;k<cl;k++){
          rpnc.push(c[k].p)    
        }
        output.rpnc=[];
        output.rpnc=rpnc;
        output.status=100;
        res.send(output);  
      }else{
        console.log('results.length==0 --> err');
        output.status=402;
        res.send(output);  
      }    
    });  
  }else{
    console.log('no database');
    output.status=410;
    res.send(output);  
  }    
}
module.exports.phl = phl;