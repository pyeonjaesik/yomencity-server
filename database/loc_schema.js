var Schema = {};
Schema.createSchema = function(mongoose){
  var LocSchema = mongoose.Schema({
    id: {type: String, required: true, index: 'hashed'},
    name: {type: String, required: true, index: 'hashed'},
    img: {type: String, default:'0'},
    l:{type:Number,default:0},
    f:[],
    p:[],
    n:[]  
  });
  return LocSchema;    
};
module.exports = Schema;