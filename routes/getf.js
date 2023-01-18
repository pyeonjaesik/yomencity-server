var getf = function(req,res){
  var userid = req.body.userid;
  var u_leng = userid.length;    
  var database = req.app.get('database');
  var output ={};
  output.name=[];
  output.img = [];
  var i =0;
  if(database){
    var dbrecycle = function(){
      if(i==u_leng){
        output.status=100;
        res.send(output);
        return;  
      }else{
      database.UserPModel.find({id:userid[i]},function(err,results){
        if(err){
          output.status =401;
          res.send(output);
          return;    
        }
        if(results.length>0){
          output.name[i]=results[0]._doc.name;
          output.img[i]=results[0]._doc.img;
          i++;
          dbrecycle();    
        }else{
          console.log((1+i)+'번 째 UserPModel.find 호출 시도하였으나 results.length=0 --> 90% err 또는 팔로우 취소시 일어났던 err(following 에서 상대방 _id 를 안뺌) 에대한 결과');
          output.name[i]='0';
          output.img[i]='0';
          i++;
          dbrecycle();    
        }
      });          
      }   
    };
    dbrecycle();  
  }else{
    console.log('getf: database 없음');
    output.status=410;
    res.send(output);  
  }   
};
module.exports.getf = getf;