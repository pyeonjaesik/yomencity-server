var Schema = {};

Schema.createSchema = function(mongoose){
    
    var PostSchema = mongoose.Schema({
        userid:{type: String, required:true,'default':''},
        user_id:{type: String, required:true,'default':'',index: 'hashed'},
        username:{type: String, required:true,'default':''},
        text:{type: String,trim:false,default:''},
        img1:{type: String, default:'0'},
        img2:{type: String, default:'0'},
        img3:{type: String, default:'0'},
        img4:{type: String, default:'0'},
        created_hour:{type:Number, 'default': 17581},
        created_time:{type:Number, 'default': 1519021633963},
        ln:{type:Number, 'default':0},
        cn:{type:Number, 'default':0},
        tk:[],
        cm:[]
    });
    
    return PostSchema;
};

module.exports = Schema;