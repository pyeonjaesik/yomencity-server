var Schema = {};

Schema.createSchema = function(mongoose){
    var PostinfoSchema = mongoose.Schema({
        id: {type: String, required: true, index: 'hashed'},
        post_id:[],
    });
    return PostinfoSchema;
};

module.exports = Schema;
