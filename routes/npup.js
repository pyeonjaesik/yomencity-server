var npup = function(req,res){
  var _id = req.body._id;
  var id= req.body.id;
  var li=req.body.li;
  li=li.split(',').map(function(n) {return Number(n);}); 
  var database = req.app.get('database');
  var output = {};  
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
        var li_l=li.length;
        var tp=results[0]._doc.p;
        var tpl=tp.length;
        if(tpl>7){tpl=7;}
        for(var i=0;i<li_l;i++){
          for(var j=0;j<tpl;j++){
            var tfl1=Math.floor(tp[j].p[0]*1000)+''+Math.floor(tp[j].p[1]*1000);
            var tfl2=(Math.floor(tp[j].p[0]*1000)+1)+''+Math.floor(tp[j].p[1]*1000);
            var tfl3=Math.floor(tp[j].p[0]*1000)+''+(Math.floor(tp[j].p[1]*1000)+1);
            var tfl4=(Math.floor(tp[j].p[0]*1000)+1)+''+(Math.floor(tp[j].p[1]*1000)+1);
            if(tfl1==li[i]||tfl2==li[i]||tfl3==li[i]||tfl4==li[i]){
              var ttp=tp[j];    
              tp.splice(j,1,{p:[ttp.p[0],ttp.p[1]],n:(ttp.n+1)});    
            }  
          }    
        }
        if(tpl>1){
          tp.sort(function(a, b) {
            return b.n - a.n;
          });
        }         
        database.LocModel.where({_id:_id}).update({p:tp},function(err){
          if(err){
            console.log('LocModel.udpate err');
            output.status=403;
            res.send(output);
            return;  
          }
          database.LocModel.find({id:id},function(err,results){
            if(err){
              console.log('LocModel.find2 err');
              output.status=404;
              res.send(output);
              return;    
            }
            if(results.length>0){
              var tn=results[0]._doc.n;
              var tnl=tn.length;                
              for(var i=0;i<li_l;i++){
                for(var j=0;j<tnl;j++){
                  var tfl1=Math.floor(tn[j].p[0]*1000)+''+Math.floor(tn[j].p[1]*1000);
                  var tfl2=(Math.floor(tn[j].p[0]*1000)+1)+''+Math.floor(tn[j].p[1]*1000);
                  var tfl3=Math.floor(tn[j].p[0]*1000)+''+(Math.floor(tn[j].p[1]*1000)+1);
                  var tfl4=(Math.floor(tn[j].p[0]*1000)+1)+''+(Math.floor(tn[j].p[1]*1000)+1);
                  if(tfl1==li[i]||tfl2==li[i]||tfl3==li[i]||tfl4==li[i]){
                    var ttn=tn[j];
                    var tn_t=ttn.t;
                    tn_t+=600000;
                    if(tn_t>(ct+260000000)){
                      tn_t=ct+260000000    
                    }  
                    tn.splice(j,1,{p:[ttn.p[0],ttn.p[1]],t:tn_t});    
                  }  
                }    
              }              
              var ttn=[];    
              for(var j=0;j<tnl;j++){
                if(tn[j].t>(ct-10800000)){
                  ttn.push(tn[j]);  
                }      
              }                
              database.LocModel.where({id:id}).update({n:ttn},function(err){
                if(err){
                  console.log('LocModel.update2 err');
                  output.status=406;
                  res.send(output);
                  return;    
                }
                output.status=100;  
                res.send(output);
              });    
            }else{
              console.log('LocModel.find results.length==0');
              output.status=405;
              res.send(output);
              return;      
            }  
          });    
        });  
      }else{
        console.log('LocModel.find results.length==0');
        output.status=402;
        res.send(output);  
      }    
    });  
  }else{
    console.log('npup: no database');
    output.status=410;
    res.send(output);  
  }    
};
module.exports.npup = npup;