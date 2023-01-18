var hl2 = function(req,res){
  var _id1 = req.body._id1;
  var id2 = req.body.id2;
  var post_id= req.body.post_id;
  var database = req.app.get('database');
  var output = {};
  var ct = parseInt(Date.now());
  var hl=[];
  var hl2=[];
  var hl3={};
  var hfi;    
  if(database){
    database.HlModel.find({_id:_id1},function(err,results){
      if(err){
        console.log('HlModel.find err');
        output.status=401;
        res.send(output);
        return;  
      }
      if(results.length>0){
        hl=results[0]._doc.hl;
        function checkHl(em){
          return em.type=='2'&&em.post_id==post_id;
        }
        hfi=hl.findIndex(checkHl);
        if(hfi!=-1){
          hl.splice(hfi,1);
          hl2=hl;
        }else{
          hl2=hl.splice(0, 199);  
        }
        hl3={type:'2',id:id2,post_id:post_id,ct:ct};
        hl2.unshift(hl3);
        database.HlModel.where({_id:_id1}).update({hl:hl2},function(err){
          if(err){
            console.log('Hl.update err');
            output.status=403;
            res.send(output);
            return;  
          }
          output.status=100;
          res.send(output);
        });  
      }else{
        console.log('HlModel.find results.length ==0 --> err');
        output.status=402;
        res.send(output);  
      }
    });  
  }else{
    console.log('hl2 : no database');
    output.status=410;
    res.send(output);
  }
};
module.exports.hl2 = hl2;