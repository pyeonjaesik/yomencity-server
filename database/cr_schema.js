var Schema = {};
Schema.createSchema = function(mongoose){
  var CrSchema = mongoose.Schema({
    id:[],
    txt:[],
    a:[]
  });
  return CrSchema;    
};
module.exports = Schema;