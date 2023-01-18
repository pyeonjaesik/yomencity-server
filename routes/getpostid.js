var getpostid = function(req,res){
    var td = parseInt(Date.now()/3600000);
    var database = req.app.get('database');
    var output = {};
    var p_arr= [];
    var p_arr_m = [];
    if(database){
        database.PostModel.find({created_hour:td},function(err,results){
            if(err){
                output.status = 4;
                res.send(output);
                return;
            }
            var re_leng = results.length;
            if(re_leng == 0){
                console.log('없지롱');
                output.status = 2;
                res.send(output);
                return;
            }else if(re_leng < 20){
                for(var j =0; j<re_leng; j++){
                    p_arr_m.push(results[j]._doc._id);
                }
                output.status = 101;
                output.parrm = p_arr_m;
                output.post_cont = 0;
                res.send(output);
                return;
            }else{
                output.status = 100;
                var post_cont = parseInt(re_leng/20);
                var post_leng = post_cont*20;
                for(var k = 0; k< post_leng; k++){
                    p_arr[k] = results[k]._doc._id;
                    
                }
                output.parr = p_arr;
                output.post_cont = post_cont;
                res.send(output);
            }
            
        }).limit(200);
    }else{
        output.status = 10;
        res.send(output);
    }
};

module.exports.getpostid = getpostid;