var Schema ={};

Schema.createSchema = function(mongoose){
    var LaSchema = mongoose.Schema({
        a:[]
    });
    return LaSchema;
};
module.exports = Schema;