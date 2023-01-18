var pci4 =function(req,res){
  var _id = req.body._id||0;
  var i = req.body.i||2;
  var output={};    
  if(_id==0||i==2){
    output.status=300;
    res.send(output);
    return;  
  }
  var database = req.app.get('database');
  if(database){
    if(i==0){
      i=1;    
    }else{
      i=0;    
    }
    database.TkModel.where({_id:_id}).update({i4:i},function(err){
      if(err){
        console.log('TkModel.update err');
        outputs.status=401;
        res.send(output);
        return;  
      }
      output.status=100;
      res.send(output);    
    });  
  }else{
    console.log('pci no database');
    output.status=410;
    res.send(output);  
  }    
}
module.exports.pci4 = pci4;