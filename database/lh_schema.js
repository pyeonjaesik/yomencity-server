var Schema ={};

Schema.createSchema = function(mongoose){
    var LhSchema = mongoose.Schema({
        m:[],
        c:[]
    });
    return LhSchema;
};
module.exports = Schema;