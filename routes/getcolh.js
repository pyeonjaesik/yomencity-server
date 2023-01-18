var getcolh = function(req,res){
    var _id = req.body._id;
    var database = req.app.get('database');
    var output = {};
    output.pl=[];
    if(database){
      database.LhModel.find({_id:_id},function(err,results){
        if(err){
          console.log('LhModel.find err');
          output.status=401;
          res.send(output);
          return;    
        }
        if(results.length>0){
          var m=results[0]._doc.c;
          var ml=m.length;
          var i=0;
          var dbrecycle = function(){
            if(i==ml){
              output.status=100;
              res.send(output);
              return;    
            }else{
              database.LpModel.find({_id:m[i]},function(err,results){
                if(err){
                  console.log('LpModel.find err');
                  i++;
                  dbrecycle();
                  return;    
                }
                if(results.length>0){
                     output.pl.push({_id:results[0]._doc._id,s:results[0]._doc.text,t:results[0]._doc.ct,r:results[0]._doc.p[1],l:results[0]._doc.p[0],ln:results[0]._doc.ln,cn:results[0]._doc.cn,nn:results[0]._doc.nn});
                    i++;
                    dbrecycle();
                }else{
                  console.log('LpModel.find results.length==0 -->err');
                  i++;
                  dbrecycle();
                }  
              });    
            }  
          };
          dbrecycle();
        }else{
          console.log('LhModel.find results.length ==0 --> err');
          output.status=402;
          res.send(output);    
        }  
      });    
    }else{
        console.log('database 없음');
        output.status = 403;
    }    
};
module.exports.getcolh = getcolh;