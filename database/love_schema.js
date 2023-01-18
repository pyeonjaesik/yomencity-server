var Schema = {};

Schema.createSchema=function(mongoose){
  var LoveSchema = mongoose.Schema({
     id:[]  
  });
  return LoveSchema;    
};
module.exports=Schema;