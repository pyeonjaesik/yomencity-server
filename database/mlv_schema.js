var Schema = {};
Schema.createSchema=function(mongoose){
  var MlvSchema=mongoose.Schema({
    post_id:[]  
  });
  return MlvSchema;    
};
module.exports=Schema;