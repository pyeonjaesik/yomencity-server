var Schema = {};
Schema.createSchema = function(mongoose){
  var FSchema = mongoose.Schema({
    id:{type:String,index:'hashed'},
    fg:[],
    fd:[],
    fgn:{type:Number,'default':'0'},
    fdn:{type:Number,'default':'0'}  
  });
  return FSchema;    
};
module.exports = Schema;