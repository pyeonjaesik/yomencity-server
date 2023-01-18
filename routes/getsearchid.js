var getsearchid = function(req,res){
  var output = {};
  output.p = [];
  var k_word = req.body.k_word;    
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
  var database = req.app.get('database'); 
 if(database){
   database.UserPModel.find({id:{'$regex': k_word, '$options': 'i' }},function(err,results){
     if(err){
       output.status = 400;
       res.send(output);
       console.log('k_word에 근거하여 id를 찾으려 했으나 오류 발생');    
     }
     if(results.length>0){
       var re_leng2 = results.length;
       for(var i=0;i<re_leng2;i++){
         output.p.push({id:results[i]._doc.id,n:results[i]._doc.name,i:results[i]._doc.img});                    
       }       
       database.UserPModel.find({name:{'$regex': k_word, '$options': 'i' }},function(err,results){
         if(err){
           console.log('k_word에 근거하여 name를 찾으려 했으나 오류 발생');
           output.status=404;
           res.send(output);
           return;     
         }
         if(results.length>0){
           var re_leng = results.length;
           for(var i=0;i<re_leng;i++){
             output.p.push({id:results[i]._doc.id,n:results[i]._doc.name,i:results[i]._doc.img});                 
           }
           output.status = 100;
           res.send(output);
         }else{
           output.status = 100;            
           res.send(output);
         }   
       }).limit(300);     
     }else{
       database.UserPModel.find({name:{'$regex': k_word, '$options': 'i' }},function(err,results){
         if(err){
           console.log('k_word에 근거하여 name를 찾으려 했으나 오류 발생');     
         }
         if(results.length>0){
           var re_leng = results.length;
           for(var i=0;i<re_leng;i++){
             output.p.push({id:results[i]._doc.id,n:results[i]._doc.name,i:results[i]._doc.img});                   
           }
           output.status = 100;    
           res.send(output);
         }else{
           output.status = 120;       
           res.send(output);
         }   
       }).limit(300);         
     }
   }).limit(300);     
 }else{
   output.status = 410;
   res.send(output);
   console.log('getsearchid: database가 없습니다.');      
 }
};

module.exports.getsearchid = getsearchid;