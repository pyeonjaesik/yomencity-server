var getlpp = function(req,res){
  var lat = parseFloat(req.body.lat);
  var long = parseFloat(req.body.long);
  var _id = req.body._id;
  var database = req.app.get('database');
  var output = {};
  output.ff=[];
  var lim=400;    
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
          var ff=[];
          var fi=(lat.toFixed(3)*1000)+''+(long.toFixed(3)*1000);
          var tp=results[0]._doc.p;
          var tpl=tp.length;
          if(tpl>7){
            tpl=7;  
          }
          for(var i=0;i<tpl;i++){
            var tfi=(tp[i].p[0].toFixed(3)*1000)+''+(tp[i].p[1].toFixed(3)*1000); 
             if(tfi!=fi){
               ff.push(tfi);  
             }  
          }    
          ff.unshift(fi);
          ff=ff.filter((value, idx, arr) => arr.indexOf(value) === idx);
          var ffl=ff.length;
          var k=0;
          var ffn=0;
          var lct=ct-259200000;
          var db_recycle=function(){
            if(k==ffl||ffn>=lim){
              output.status=100;
              var temp={};
              output.ff = output.ff.filter(function (o) { 
                if (temp.hasOwnProperty(o.id)) { 
                 temp[o.id].fi += ',' + o.fi; 
                 return false; 
                } 
                else { 
                 temp[o.id] = o; 
                 return true; 
                } 
              });
              res.send(output);
              return;    
            }else{
              database.LocModel.find({},function(err,results){
                if(err){
                  console.log('LocModel.find err');
                  output.status=405;
                  k++;
                  db_recycle();    
                  return;    
                }
                var rel=results.length;  
                if(rel>0){
                  for(var i=0;i<rel;i++){  
                    output.ff.push({id:results[i]._doc.id,name:results[i]._doc.name,img:results[i]._doc.img,fi:ff[k]});  
                  }
                  lim-=rel;
                  ffn+=rel;    
                  k++;
                  db_recycle();    
                }else{
                  console.log('LocModel.find results.length==0');
                  output.status=406;
                  k++;    
                  db_recycle();    
                }  
              }).sort({_id:-1}).limit(lim);    
            }  
          };
          db_recycle();    
      }else{
        console.log('LocModel.find results.length ==0 --> err');
        output.status=402;
        res.send(output);  
      }    
    });  
  }else{
    console.log('getlpp no database');
    output.status = 410;
    res.send(output);
  }
};
module.exports.getlpp = getlpp;