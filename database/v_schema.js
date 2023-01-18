var Schema = {};
Schema.createSchema = function(mongoose){
  var VSchema = mongoose.Schema({
    id: {type: String, required: true, index: 'hashed'},
    d:{type:Number,'default':0},
    n:{type:Number,'default':0},  
    v:[],
    va:[]
  });
  return VSchema;    
};
module.exports = Schema;