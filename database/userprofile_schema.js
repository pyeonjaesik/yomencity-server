var Schema = {};

Schema.createSchema = function(mongoose){
    var UserPSchema = mongoose.Schema({
        id: {type: String, required: true, index: 'hashed'},
        name: {type: String, required: true, index: 'hashed'},
        nn: {type: String, required: true, index: 'hashed'},
        img: {type: String, default:'0'},
        ph:{type: String,required:true, index: 'hashed'}
    });
    return UserPSchema;
};

module.exports = Schema;