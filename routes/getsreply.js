var getsreply = function(req,res){
    var rs_id = req.body.rs_id;
    var r_leng= rs_id.length;
    var database = req.app.get('database');
    var output = {};
    var nt = parseInt(Date.now());
    output.comment_id = [];
    output.id = [];
    output.username = [];
    output.created_time = [];
    output.text = [];
    output.time=[];
    output.img=[];
    var i=0;
    if(database){
      var dbrecycle= function(){
        if(i == r_leng){
          output.status=100;
          res.send(output);
          return;
        }else{
        database.ScommentModel.find({_id:rs_id[i]},function(err,results){
          if(err){
            console.log('err');
            ouput.status = 401;
            res.send(output);  
            return;
          }
          if(results.length>0){
            output.id[i] = results[0]._doc.tk[0]
            output.comment_id[i] = results[0]._doc._id;
            output.username[i] = results[0]._doc.username;
            output.text[i] = results[0]._doc.text;
            output.created_time[i] = results[0]._doc.created_time;
             database.UserPModel.find({id:output.id[i]},function(err,results){
                if(err){
                  console.log('UserPModel.find err');
                  output.img[i]='0';
                  i++;
                  dbrecycle();
                  return;    
                }
                if(results.length>0){
                  output.img[i]=results[0]._doc.img;
                  i++;
                  dbrecycle();                                
                }else{
                  output.img[i]='0';
                  i++;
                  dbrecycle();                                
                }
            });
          }else{
            console.log('CommentModel.find 하였으나 results.length== 0 이다 --> err');
            output.status = 402;
            res.send(output);
            return;
          }
        });            
        }
      };
      dbrecycle();        
    }else{
        output.status = 402;
        res.send(output);
        return;
    }
};

module.exports.getsreply = getsreply;