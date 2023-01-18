var getlaa = function(req,res){
    var _id=req.body._id;
    var lat=req.body.lat;
    var long=req.body.long;
    var ct = parseInt(Date.now());
    var output = {}
    output.pl=[];
    var database = req.app.get('database');
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
          var tpl=tp.length;
          if(tpl>7){tpl=7};
          var ff=[];
          var stp=[];    
          for(var i=0;i<tpl;i++){
            stp.push((tp[i].p[0].toFixed(3)*1000)+''+(tp[i].p[1].toFixed(3)*1000));              
          }
          var fi=(lat.toFixed(3)*1000)+''+(long.toFixed(3)*1000);
          var fii=stp.indexOf(fi);
          if(fii!=-1){
            stp.unshift(fi);  
          }
          database.LpModel.find({dcn:{ $lt: 15 }},function(err,results){
            if(err){
              console.log('getls err');
              output.status=401;
              res.send(output);
              return;    
            } 
            var rel=results.length;
            if(rel>0){
              for(var i=0;i<rel;i++){
                output.pl.push({_id:results[i]._id,s:results[i].text,t:results[i].ct,d:results[i].pt,r:results[i].p[1],l:results[i].p[0],ln:results[i]._doc.ln,cn:results[i]._doc.cn,nn:results[i]._doc.nn});  
              }
              output.status=100;    
              res.send(output);
            }else{
              output.status=100;
              res.send(output);
              return;    
            }  
          }).sort({_id:-1}).limit(300);              
        }else{
          console.log('LocModel.find results.length==0 -->err');
          output.status=402;
          res.send(output);    
        }  
      });    
    }else{
      console.log('gelaa no database');
      output.status = 410;
      res.send(output);
    }
}
module.exports.getlaa = getlaa;