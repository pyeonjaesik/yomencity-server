var Schema = {};

Schema.createSchema = function(mongoose){
    var LpSchema = mongoose.Schema({
        user_id:{type: String, required:true,'default':'',index: 'hashed'},
        nn:{type: String, required:true,'default':'',index: 'hashed'},
        text:{type: String,trim:false,default:''},
        ct:{type:Number, 'default': 1519021633963},
        pt:{type:Number, 'default': 1519021633963},
        ff:[],
        p:[],
        ln:{type:Number, 'default':0},
        cn:{type:Number, 'default':0},
        dcn:{type:Number, 'default':0},
        dc:[]
    });
    LpSchema.index({geometry:'2dsphere'});
	LpSchema.static('findNear', function(longitude, latitude, maxDistance,limit,mn,mx,callback) {
		this.find({pt:{ $gt: mn, $lt: mx }}).where('geometry').near({center:{type:'Point', coordinates:[parseFloat(longitude), parseFloat(latitude)]}, maxDistance:maxDistance}).limit(limit).exec(callback);
	});    
    return LpSchema;
};

module.exports = Schema;