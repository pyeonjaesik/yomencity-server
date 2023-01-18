var cget = function(req,res){
  var _id1 = req.body._id1||0;
  var id1 = req.body.id1||0;
  var id2 = req.body.id2||0;
  var database = req.app.get('database');
  var output = {};
  var cfi;
  var cr_id;
  var ch=[];
  if(database){
    database.ChModel.find({_id:_id1},function(err,results){
      if(err){
        console.log('ChModel.find err');
        output.status=401;
        res.send(output);
        return;  
      }
      if(results.length>0){
        if(id1!=results[0]._doc.id){
          output.status=500;
          res.send(output);
          return;    
        }  
        ch=results[0]._doc.ch;
        function checkCh(em){
          return em.id==id2;
        }
        cfi=ch.findIndex(checkCh);
        if(cfi!=-1){
          cr_id=ch[cfi].cr_id;
          var b1_1=ch[cfi].b1;
          output.b1=b1_1;    
          ch.splice(cfi,1,{id:id2,cr_id:cr_id,b1:b1_1,b2:0});    
          database.ChModel.where({_id:_id1}).update({ch:ch},function(err){
            if(err){
              console.log('ChModel.update1 err');
              output.status=405;
              res.send(output);
              return;    
            }
            database.ChModel.find({id:id2},function(err,results){
              if(err){
                console.log('ChModel.find2 err');
                output.status=406;
                res.send(output);
                return;  
              }
              if(results.length>0){
                var ch2=results[0]._doc.ch;
                function checkCh2(em){
                  return em.id==id1;
                }
                var cfi2=ch2.findIndex(checkCh2);
                if(cfi2!=-1){
                  var b2_2=ch2[cfi2].b2;    
                  ch2.splice(cfi2,1,{id:id1,cr_id:cr_id,b1:0,b2:b2_2});   database.ChModel.where({id:id2}).update({ch:ch2},function(err){
                    if(err){
                      console.log('ChModel.update2 err');
                      output.status=407;
                      res.send(output);
                      return;    
                    }
                    database.CrModel.find({_id:cr_id},function(err,results){
                      if(err){
                        console.log('crModel.find err');
                        output.status=406;
                        res.send(output);
                        return;    
                      }
                      if(results.length>0){
                        output.txt=[];
                        output.txt=results[0]._doc.txt;
                        if(output.txt.length>30){
                          output.status=100;  
                        }else{
                          output.status=101;  
                        }
                        output.ci=results[0]._doc.id.indexOf(id1);    
                        res.send(output);
                      }else{
                        console.log('CrModel.find results.length ==0 --> err');
                        output.status=407;
                        res.send(output);    
                      }  
                    });                      
                  }); 
                }else{
                  console.log('cfi2==-1  --> err');
                  output.status=407;
                  res.send(output);    
                }  
              }else{
                console.log('ChModel.find2 results.length ==0 -->err');
                output.status=407;
                res.send(output);
                return;  
              }    
            });  
          });    
        }else{
          output.status=102;
          res.send(output);
        }                    
      }else{
        console.log('ChModel.find results.length ==0 --> err');
        output.status=402;
        res.send(output);  
      }    
    });      
  }else{
    console.log('cget : no database');
    output.status=410;
    res.send(output);
  }    
};
module.exports.cget = cget;