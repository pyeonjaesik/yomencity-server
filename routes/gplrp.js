var gplrp = function(req,res){
  var _id=req.body._id;
  var database=req.app.get('database');
  var output={};
  if(database){
    database.LcModel.find({_id:_id},function(err,results){
      if(err){
        console.log('LcModel.find err');
        output.status=401;
        res.send(output);
        return;  
      }
      if(results.length>0){
        var ra=results[0]._doc.cm;
        var ral=ra.length;
        var rp=[];  
        for(var i=0;i<ral;i++){
          rp[i]={txt:ra[i].txt,t:ra[i].ct,nn:ra[i].nn,cn:ra[i].cn};    
        }
        output.rp=[];
        output.rp=rp;
        output.status=100;
        res.send(output);  
      }else{
        console.log('LcModel.find results.length==0 -->err');
        output.status=402;
        res.send(output);  
      }    
    });  
  }else{
    console.log('gplrp: no database');
    output.status=410;
    res.send(output);  
  }    
};

module.exports.gplrp = gplrp;