var Schema = {};
Schema.createSchema = function(mongoose){
  var TkSchema = mongoose.Schema({
    id:{type:String,index:'hashed'},  
    tk:{type:String,'default':'0',index:'hashed'},
    d:{type:Number,'default':0},
    c:{type:Number,'default':0},  
    n:{type:Number,'default':0},
    p:{type:Number,'default':0},
    l:{type:Number,'default':0},
    r:{type:Number,'default':0},
    q:{type:Number,'default':0},
    j:{type:Number,'default':0},  
    i1:{type:Number,'default':0},
    i2:{type:Number,'default':0},
    i3:{type:Number,'default':0},
    i4:{type:Number,'default':0},
    i11:{type:Number,'default':0},
    i12:{type:Number,'default':0},
    dcf:{type:Number,'default':0},
    dcp:{type:Number,'default':0},  
  });
  return TkSchema;    
};
module.exports = Schema;