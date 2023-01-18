var Schema = {};

Schema.createSchema = function(mongoose){
    var UserinfoSchema = mongoose.Schema({
        id:{type: String, required:true, index:'hashed','default':''},
        name:{type: String, required:true, index:'hashed','default':''},
        p_index:{type: Number, 'default':0,index:'hashed'},
        post_id:{type: String, 'default':'0'},
        t_i:{type: Number, 'default':0,index: 'hashed'},
        u_t:{type: Number, 'default':0},
        li:{type:Number,'default':0},
        geometry:{
            'type':{type: String, 'default':'Point'},
            coordinates :[{type: "Number"}]
        }
    });
    UserinfoSchema.index({geometry:'2dsphere'});
	UserinfoSchema.static('findNear', function(longitude, latitude, maxDistance,limit,t_i,p_index,callback) {
		this.find({t_i:t_i,p_index:p_index}).where('geometry').near({center:{type:'Point', coordinates:[parseFloat(longitude), parseFloat(latitude)]}, maxDistance:maxDistance}).limit(limit).exec(callback);
	});
	UserinfoSchema.static('findSiNear', function(longitude, latitude, maxDistance,limit,k_word,callback) {
		this.find({id:{'$regex': k_word, '$options': 'i' }}).where('geometry').near({center:{type:'Point', coordinates:[parseFloat(longitude), parseFloat(latitude)]}, maxDistance:maxDistance}).limit(limit).exec(callback);
	});
	UserinfoSchema.static('findSnNear', function(longitude, latitude, maxDistance,limit,k_word,callback) {
		this.find({name:{'$regex': k_word, '$options': 'i' }}).where('geometry').near({center:{type:'Point', coordinates:[parseFloat(longitude), parseFloat(latitude)]}, maxDistance:maxDistance}).limit(limit).exec(callback);
	});    
    return UserinfoSchema;
};
module.exports = Schema;