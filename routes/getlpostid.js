var getlpostid = function(req,res){
    var paramlong = req.body.long || req.query.long;
    var paramlat = req.body.lat || req.query.lat;
    var ds=req.body.d||100;
    var long = parseFloat(paramlong);
    var lat = parseFloat(paramlat);
    var t_i = parseInt(Date.now()/43200000);
    var output = {}
    var pn = 0;
    var dn = 0;
    output.post_id = [];
    var post_id = [];
    var database = req.app.get('database');
    if(database.db){
        var db_recycle = function(t_i){
            if(pn>=300){
                output.post_id = post_id;
                output.status = 100;               
                res.send(output);
                return;
            }else{
            if(dn>2){
                if(pn ==0){
                    output.status = 402;                   
                    res.send(output);
                    return;
                }else{
                    output.post_id = post_id;
                    if(pn>20){
                      output.status =100;
                    }else{
                      output.status = 101;                        
                    }
                    res.send(output);
                    return;
                }
            }
            database.UserinfoModel.findNear(long,lat,ds,(300-pn),t_i,1,function(err,results){
               if(err){
                   console.log('err');
                   output.status = 400;
                   res.send(output);
                   return;
               } 
               if(results){
                   var re_leng = results.length;
                   pn+= re_leng;
                   dn++;
                   for(var i =0;i<re_leng;i++){
                       post_id.push(results[i]._doc.post_id);
                   }
               }
                t_i--;
                db_recycle(t_i);
            });                
            }
        }
        db_recycle(t_i);
    }else{
        console.log('getlpost에서 데이터베이스가 없습니다.');
        output.status = 410;
        res.send(output);
    }
}
module.exports.getlpostid = getlpostid;