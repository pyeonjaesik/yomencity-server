var achd3 = function(req,res){
  var _id=req.body._id||0;
  var c_id=req.body.c_id||0;
  var al=[];
  var afi;    
  var output={};    
  if(_id==0||c_id==0){
    console.log('_id/id no detect err');
    output.status=500;
    res.send(output);
    return;  
  }
  var database=req.app.get('database');
  if(database){
    database.AlModel.find({_id:_id},function(err,results){
      if(err){
        console.log('AlModel.find err');
        output.status=401;
        res.send(output);
        return;  
      }
      if(results.length>0){
        al=results[0]._doc.al;
        function checkAl(em) {
          return em.type=='3'&&em.comment_id==c_id;
        }
        afi=al.findIndex(checkAl);
        if(afi==-1){
          console.log('afi==-1 --> err');
          output.status=403;
          res.send(output);
          return;    
        }
        al.splice(afi,1,{type:'3',id:al[afi].id,name:al[afi].name,post_id:al[afi].post_id,comment_id:c_id,cn:al[afi].cn,ct:al[afi].ct,d:0});
        database.AlModel.where({_id:_id}).update({al:al},function(err){
          if(err){
            console.log('AlModel.update err');
            output.status=404;
            res.send(output);
            return;  
          }
          output.status=100;
          res.send(output);    
        });  
      }else{
        console.log('AlModel.find results.length ==0 -->err');
        output.status=402;
        res.send(output);  
      }    
    });  
  }else{
    console.log('achd3 no database');
    output.status=410;
    res.send(output);  
  }    
};
module.exports.achd3 = achd3;