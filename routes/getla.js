var getla = function(req,res){
    var paramlong = req.body.long || req.query.long;
    var paramlat = req.body.lat || req.query.lat;
    var ds=req.body.d;
    var long = parseFloat(paramlong)||127;
    var lat = parseFloat(paramlat)||37;
    var ct = parseInt(Date.now());
    var output = {}
    var pn = 0;
    var dn = 0;
    var ti=0;
    output.pl=[];
    var database = req.app.get('database');
    if(database.db){        
        var db_recycle = function(dn){
            if(pn>=300){
              output.status = 100;               
              res.send(output);
              return;
            }else{
            if(dn>5){
              var mx=ct-(dn*7200000);
              var mn=mx-864000000;    
              database.LpModel.findNear(long,lat,ds,(300-pn),mn,mx,function(err,results){
                if(err){
                  console.log('err');
                  output.status = 400;
                  res.send(output);
                  return;
                } 
                if(results){ 
                   var re_leng = results.length;
                   pn+= re_leng;
                   dn++;
                   for(var i =0;i<re_leng;i++){
                     output.pl.push({_id:results[i]._id,s:results[i].text,t:results[i].ct,d:results[i].pt,r:results[i].geometry.coordinates[0],l:results[i].geometry.coordinates[1],ln:results[i]._doc.ln,cn:results[i]._doc.cn,nn:results[i]._doc.nn});
                   }
                   output.status=100;
                   res.send(output);
                   return;                    
                 }  
              });
            }else{
                var mx=ct-(dn*7200000);
                var mn=mx-7200000;
                database.LpModel.findNear(long,lat,ds,(300-pn),mn,mx,function(err,results){
                  if(err){
                    console.log('err');
                    output.status = 400;
                    res.send(output);
                    return;
                  } 
                  if(results){ 
                     var re_leng = results.length;
                     pn+= re_leng;
                     dn++;
                     for(var i =0;i<re_leng;i++){
                       output.pl.push({_id:results[i]._id,s:results[i].text,t:results[i].ct,d:results[i].pt,r:results[i].geometry.coordinates[0],l:results[i].geometry.coordinates[1],ln:results[i]._doc.ln,cn:results[i]._doc.cn,nn:results[i]._doc.nn});
                     }
                  }
                  db_recycle(dn);
                });                
            }                
            }
        }
        db_recycle(dn);
    }else{
        console.log('getlpost에서 데이터베이스가 없습니다.');
        output.status = 410;
        res.send(output);
    }
}
module.exports.getla = getla;