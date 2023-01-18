var Schema = {};
Schema.createSchema = function(mongoose){
  var PSchema = mongoose.Schema({
    r:[],
    p:[],
    n:[],
    c:[]  
  });
  return PSchema;    
};
module.exports = Schema;