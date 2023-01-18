var getpnarr = function(req,res){
  var id = req.body.id;
  var database = req.app.get('database');
  var output={};
  output.img=[];
  output.name=[];
  var i_leng=id.length;
  var i=0;  
  if(database){
    var dbrecycle = function(){
      if(i==i_leng){
        output.status=100;
        res.send(output);
        return;  
      }else{
      database.UserPModel.find({id:id[i]},function(err,results){
        if(err){
          console.log('UserPModel.find err');
          output.status=401;
          res.send(output);
          return;    
        }
        if(results.length>0){
          output.img[i]=results[0]._doc.img;
          output.name[i]=results[0]._doc.name;
          i++;
          dbrecycle();    
        }else{
          console.log('UserPModel.find results.length==0 --> err');
          i++;
          dbrecycle();    
        }  
      });          
      }    
    };
    dbrecycle();  
  }else{
    console.log('get p n arr: no database');
    output.status=410;
    res.send(output);  
  }    
};
module.exports.getpnarr = getpnarr;