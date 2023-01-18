var ppupload = function(req,res){
    var param_id = req.params.user_id;
    var database = req.app.get('database');
    var output = {};
    var multiparty = require('multiparty');
    var form = new multiparty.Form({
    autoFiles: true,
    uploadDir: 'uploads_p/',
    maxFilesSize: 1024 * 1024 * 20
    });
    
    form.parse(req, function (error, fields, files) {
        if(database){
            database.UserPModel.where({_id:param_id}).update({img:files.file[0].path},function(err){
                if(err){
                    console.log('이미지를 update 하려 했으나 실패');
                    output.status = 401;
                    res.send(output);
                }
                output.status = 100;
                res.send(output);
            });
        }else{
            output.status = 410;
            res.send(output);
            console.log('database가 없습니다.');
        }
    });    
}
module.exports.ppupload = ppupload;