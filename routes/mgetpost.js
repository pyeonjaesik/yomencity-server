var mgetpost = function(req,res){
    var post_id = req.body.post_id;
    var database = req.app.get('database');
    var output = {};
    var po_leng = post_id.length;
    output.userid = [];
    output.username = [];
    output.text = [];
    output.pimg=[];
    output.img1 = [];
    output.img2 = [];
    output.img3 = [];
    output.img4 = [];
    output.created_time = [];
    output.post_id = [];
    output.ln=[];
    output.cn=[];
    var i =0;   
    if(database){
      var dbrecycle = function(){
        if(i == po_leng){
          output.status=100;
          res.send(output);    
          return;
        }else{
        database.PostModel.find({_id:post_id[i]},function(err,results){
          if(err){
            console.log('mgetpost: PostModel.find 하려는 중 err 발생');
            output.status = 401;
            res.send(output);
            return;
          }
          if(results.length>0){
            output.userid[i] =  results[0]._doc.userid;
            output.post_id[i] = results[0]._doc._id;
            output.username[i] = results[0]._doc.username;
            output.text[i] = results[0]._doc.text;
            output.img1[i] = results[0]._doc.img1;
            output.img2[i] = results[0]._doc.img2;
            output.img3[i] = results[0]._doc.img3;
            output.img4[i] = results[0]._doc.img4;
            output.ln[i]=results[0]._doc.ln;
            output.cn[i]=results[0]._doc.cn;
            output.created_time[i] = results[0]._doc.created_time;
          database.UserPModel.find({id:output.userid[i]},function(err,results){
            if(err){
              output.pimg[i]='0';
              i++;
              dbrecycle();
              return;    
            }
            if(results.length>0){
              output.pimg[i]=results[0]._doc.img;
              i++;
              dbrecycle();                                
            }else{
              output.pimg[i]='0';
              i++;
              dbrecycle();                                
            }
          });
        }else{
           console.log('PostModel.find results.length== 0 post removed');
           output.created_time[i]=1;
           i++;
           dbrecycle();    
        }
        });            
        }    
        };
        dbrecycle();
    }else{
        console.log('database 없음');
        output.status = 403;
    }    
};
module.exports.mgetpost = mgetpost;