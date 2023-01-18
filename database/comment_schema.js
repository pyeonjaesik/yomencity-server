var Schema ={};

Schema.createSchema = function(mongoose){
    var CommentSchema = mongoose.Schema({
        user_id:{type: String, required:true,'default':'',index:'hashed'},
        id:{type: String,index:'hashed'},
        username:{type: String, required:true,'default':''},
        created_time:{type:Number, 'default': 1519021633963},
        text:{type: String, 'default':''},
        cn:{type: Number,'default':0},
        tk:[],
        cm:[],
    });
    return CommentSchema;
};
module.exports = Schema;