var Schema = {};

Schema.createSchema = function(mongoose){
  var PboxSchema = mongoose.Schema({
    id:{type:String,index:'hashed'},  
    lev: {type: Number, default:0},
    p0: [],  
    p1: [],
    p2: [],
    p3: [],
    p4: [],
    p5: [],
    p6: [],
    p7: [],
    p8: [],
    p9: [], 
  });
  return PboxSchema;
};
module.exports =Schema;