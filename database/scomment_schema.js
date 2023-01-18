var Schema ={};

Schema.createSchema = function(mongoose){
    var ScommentSchema = mongoose.Schema({
        user_id:{type: String, required:true,'default':''},
        username:{type: String, required:true,'default':''},
        created_time:{type:Number, 'default': 1519021633963},
        text:{type: String, 'default':''},
        tk:[]      
    });
    return ScommentSchema;
};
module.exports = Schema;
