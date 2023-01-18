var getlss = function(req,res){
  var k_word = req.body.k_word;
  var er=0;
  for (var i=0; i<k_word.length; i++)  {
    var chk = k_word.substring(i,i+1); 
    if(!chk.match(/[가-힣]|[a-z]|[A-Z]|[0-9]/)) { 
      er = er + 1; 
    } 
  } 
  if (er > 0) {
    output.status=400;
    res.send(output);
    return;
  }
  if(k_word.length<1){
    output.status=400;
    res.send(output)    
    return;  
  }    
  var _id = req.body._id;
  var database = req.app.get('database');
  var output = {};
  output.ff=[];
  var ct = parseInt(Date.now());
  if(database){
    database.LocModel.find({_id:_id},function(err,results){
      if(err){
        console.log('LocModel.find err');
        output.status=401;
        res.send(output);
        return;  
      }
      if(results.length>0){
          var tp=results[0]._doc.p;
          var stp=[];
          var stpl=tp.length;
          for(var i=0;i<stpl;i++){
            stp.push((tp[i].p[0].toFixed(3)*1000)+''+(tp[i].p[1].toFixed(3)*1000));  
          }    
          database.LocModel.find({ f: { $in: stp },$or: [ { id: {'$regex': k_word, '$options': 'i' } }, { name:{'$regex': k_word, '$options': 'i' } } ] },function(err,results){
            if(err){
              console.log('getls err');
              output.status=401;
              res.send(output);
              return;    
            } 
            var rel=results.length;
            output.p=[];  
            if(rel>0){
              for(var i=0;i<rel;i++){
                output.p.push({id:results[i]._doc.id,n:results[i]._doc.name,i:results[i]._doc.img});  
              }
              output.status=100;    
              res.send(output);
            }else{
              console.log('Locfind last results.length ==0');
              output.status=100;
              res.send(output);
              return;    
            }  
          }).limit(300);          
      }else{
        console.log('LocModel.find err');
        output.status=402;
        res.send(output);  
      }    
    });
  }else{
    console.log('getlss no database');
    output.status = 404;
    res.send(output);
  }
};
module.exports.getlss = getlss;