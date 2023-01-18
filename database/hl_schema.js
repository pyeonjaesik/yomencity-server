var Schema = {};
Schema.createSchema = function(mongoose){
  var HlSchema = mongoose.Schema({
    id:{type:String,index:'hashed','default':'-1'},
    hl:[]  
  });
  return HlSchema;    
};
module.exports = Schema;