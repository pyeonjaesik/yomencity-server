var getlp = function(req,res){
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
        var tp=results[0]._doc.p;
        var tpl=tp.length;
        var epp=0;
        for(var i=0;i<tpl;i++){
          if(Math.floor(tp[i].p[0]*1000)==Math.floor(lat*1000)&&Math.floor(tp[i].p[1]*1000)==Math.floor(long*1000)){
            if(i<7){
              var p=tp[i];
              tp.splice(i,1,{p:[p.p[0],p.p[1]],n:(p.n+1)});
              epp=1;    
            }else{
              var t_tp=tp[i];    
              tp.splice(i,1);
              tp.splice(7,0,{p:[t_tp.p[0],t_tp.p[1]],n:(tp[6].n)});    
              epp=2;    
            }  
            break;  
          }    
        }
        if(epp==0){
          if(tpl>6){
            tp.push({p:[lat,long],n:(tp[6].n)});  
          }else if(tpl>0){
            tp.push({p:[lat,long],n:(tp[(tpl-1)].n)});  
          }else{
            tp.push({p:[lat,long],n:1});  
          }    
          tpl++;    
        }
        if(tpl>1){
          tp.sort(function(a, b) {
            return b.n - a.n;
          });
        }          
        var ttn=results[0]._doc.n;
        var ttnl=ttn.length;
        var tn=[];  
        for(var j=0;j<ttnl;j++){
          if(ttn[j].t>(ct-10800000)){
            tn.push(ttn[j]);  
          }      
        }
        var tnl=tn.length;  
        for(var i=0;i<tnl;i++){
          if(Math.floor(tn[i].p[0]*1000)==Math.floor(lat*1000)&&Math.floor(tn[i].p[1]*1000)==Math.floor(long*1000)){
            tn.splice(i,1);
            break;  
          }    
        }          
        tn.unshift({p:[lat,long],t:ct});  
        var tf=[];
        if(tpl>7){
          tpl=7;
        }  
        for(var p=0;p<tpl;p++){
          var tfl1=Math.floor(tp[p].p[0]*1000)+''+Math.floor(tp[p].p[1]*1000);
          var tfl2=(Math.floor(tp[p].p[0]*1000)+1)+''+Math.floor(tp[p].p[1]*1000);
          var tfl3=Math.floor(tp[p].p[0]*1000)+''+(Math.floor(tp[p].p[1]*1000)+1);
          var tfl4=(Math.floor(tp[p].p[0]*1000)+1)+''+(Math.floor(tp[p].p[1]*1000)+1);    
          tf.push(tfl1,tfl2,tfl3,tfl4);  
        }
        tnl=tn.length; 
        for(var p=0;p<tnl;p++){
          var tfl1=Math.floor(tn[p].p[0]*1000)+''+Math.floor(tn[p].p[1]*1000);
          var tfl2=(Math.floor(tn[p].p[0]*1000)+1)+''+Math.floor(tn[p].p[1]*1000);
          var tfl3=Math.floor(tn[p].p[0]*1000)+''+(Math.floor(tn[p].p[1]*1000)+1);
          var tfl4=(Math.floor(tn[p].p[0]*1000)+1)+''+(Math.floor(tn[p].p[1]*1000)+1);    
          tf.push(tfl1,tfl2,tfl3,tfl4);  
        }
        tf=tf.filter((value, idx, arr) => arr.indexOf(value) === idx);
        tf=tf.splice(0,40);  
        database.LocModel.where({_id:_id}).update({f:tf,p:tp,n:tn,l:ct},function(err){
          if(err){
            console.log('LocModel.update err');
            output.status=403;
            res.send(output);
            return;  
          }
          var ff=[];
          var fi=(lat.toFixed(3)*1000)+''+(long.toFixed(3)*1000);    
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
                  output.status=406;
                  k++;    
                  db_recycle();    
                }  
              }).sort({_id:-1}).limit(lim);    
            }  
          };
          db_recycle();    
        });  
      }else{
        console.log('LocModel.find results.length ==0 --> err');
        output.status=402;
        res.send(output);  
      }    
    });  
  }else{
    console.log('getlp no database');
    output.status = 404;
    res.send(output);
  }
};
module.exports.getlp = getlp;