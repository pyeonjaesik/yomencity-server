var getinfoimg = function(req,res){
    var post_id = req.body.post_id;
    var database = req.app.get('database');
    var output = {};
    var p_leng = post_id.length;
    output.img = [];
    output.img_leng=[];
    var i =0;
    if(database){
        var dbrecycle = function(){
            if(i == p_leng){
              output.status=100;
              res.send(output);    
              return;
            }else{
            database.PostModel.find({_id:post_id[i]},function(err,results){
                if(err){
                    console.log('PostModel 에서 find 하려 했지만 err 발생');
                    output.status = 401;
                    res.send(output);
                    return;
                }
                if(results.length>0){
                    if(results[0].created_time==1){
                      output.img[i]='-1';
                      i++;
                      dbrecycle();                        
                    }else{
                      output.img[i] = results[0]._doc.img1;
                      output.img_leng[i]=4;
                      if(results[0]._doc.img2=='0'){output.img_leng[i]=1;}
                      if(results[0]._doc.img3=='0'){output.img_leng[i]=2;}
                      if(results[0]._doc.img4=='0'){output.img_leng[i]=3;}
                      i++;
                      dbrecycle();                        
                    }
                }else{
                    console.log('PostModel.find results.length==0-->err');
                    output.img[i]='-1';
                    i++;
                    dbrecycle();
                }
            });                
            }
        };
        dbrecycle();
    }else{
        console.log('database 없음');
        output.status = 410;
    }    
};
module.exports.getinfoimg = getinfoimg;