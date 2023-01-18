var Schema = {};
Schema.createSchema = function(mongoose){
  var ChSchema = mongoose.Schema({
    id:{type:String,index:'hashed','default':'-1'},
    n:{type:String,'default':''},  
    ch:[]  
  });
  return ChSchema;    
};
module.exports = Schema;