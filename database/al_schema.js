var Schema = {};
Schema.createSchema = function(mongoose){
  var AlSchema = mongoose.Schema({
    al:[],
    d:{type:Number, 'default': 0},  
  });
  return AlSchema;    
};
module.exports = Schema;