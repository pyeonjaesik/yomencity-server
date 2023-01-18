var Schema ={};

Schema.createSchema = function(mongoose){
    var LcSchema = mongoose.Schema({
        cm:[],
    });
    return LcSchema;
};
module.exports = Schema;