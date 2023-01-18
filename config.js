//52.79.242.96
module.exports = {
	server_port: 3000,
	db_url: 'mongodb://10.0.1.204:27017/yo',
	db_schemas: [
	    {file:'./user_schema', collection:'useration', schemaName:'UserSchema', modelName:'UserModel'},
        {file:'./post_schema', collection:'mypost', schemaName:'PostSchema', modelName:'PostModel'},
        {file:'./comment_schema', collection:'comment', schemaName:'CommentSchema', modelName:'CommentModel'},
        {file:'./scomment_schema', collection:'scomment', schemaName:'ScommentSchema', modelName:'ScommentModel'},
        {file:'./userinfo_schema', collection:'userinfo', schemaName:'UserinfoSchema', modelName:'UserinfoModel'},
        {file:'./postinfo_schema', collection:'postinfo', schemaName:'PostinfoSchema', modelName:'PostinfoModel'},
        {file:'./userprofile_schema',collection:'userprofile', schemaName:'UserPSchema', modelName:'UserPModel'},
        {file:'./pbox_schema',collection:'pbox',schemaName:'PboxSchema',modelName:'PboxModel'},
        {file:'./love_schema',collection:'love',schemaName:'LoveSchema',modelName:'LoveModel'},
        {file:'./mlv_schema',collection:'mlv',schemaName:'MlvSchema',modelName:'MlvModel'},
        {file:'./tk_schema',collection:'tk',schemaName:'TkSchema',modelName:'TkModel'},
        {file:'./al_schema',collection:'al',schemaName:'AlSchema',modelName:'AlModel'},
        {file:'./hl_schema',collection:'hl',schemaName:'HlSchema',modelName:'HlModel'},
        {file:'./ch_schema',collection:'ch',schemaName:'ChSchema',modelName:'ChModel'},
        {file:'./cr_schema',collection:'cr',schemaName:'CrSchema',modelName:'CrModel'},
        {file:'./f_schema',collection:'f',schemaName:'FSchema',modelName:'FModel'},
        {file:'./v_schema',collection:'v',schemaName:'VSchema',modelName:'VModel'},
        {file:'./p_schema',collection:'p',schemaName:'PSchema',modelName:'PModel'},
        {file:'./lp_schema',collection:'lp',schemaName:'LpSchema',modelName:'LpModel'},
        {file:'./lc_schema',collection:'lc',schemaName:'LcSchema',modelName:'LcModel'},
        {file:'./mlvl_schema',collection:'mlvl',schemaName:'MlvlSchema',modelName:'MlvlModel'},
        {file:'./lh_schema',collection:'lh',schemaName:'LhSchema',modelName:'LhModel'},
        {file:'./la_schema',collection:'la',schemaName:'LaSchema',modelName:'LaModel'},
        {file:'./loc_schema',collection:'loc',schemaName:'LocSchema',modelName:'LocModel'}
	],
	route_info: [
        {file:'./test', path:'/test', method:'test', type:'get'}
        ,{file:'./user',path:'/login', method:'login', type:'post'}
        ,{file:'./cert',path:'/cert',method:'cert',type:'post'}
        ,{file:'./mypost',path:'/mypost',method:'mypost',type:'post'}
        ,{file:'./postnumber',path:'/postnumber',method:'postnumber',type:'post'}
        ,{file:'./getpostid', path:'/getpostid',method:'getpostid', type:'post'}
        ,{file:'./getpost',path:'/getpost',method:'getpost',type:'post'}
        ,{file:'./follow',path:'/follow',method:'follow',type:'post'}
        ,{file:'./unfollow',path:'/unfollow',method:'unfollow',type:'post'}
        ,{file:'./getmypostid',path:'/getmypostid',method:'getmypostid',type:'post'}
        ,{file:'./mgetpost',path:'/mgetpost',method:'mgetpost',type:'post'}
        ,{file:'./reply',path:'/reply',method:'reply',type:'post'}
        ,{file:'./sreply',path:'/sreply',method:'sreply',type:'post'}
        ,{file:'./getreply',path:'/getreply',method:'getreply',type:'post'}
        ,{file:'./getsreply',path:'/getsreply',method:'getsreply',type:'post'}
        ,{file:'./getreplyid',path:'/getreplyid',method:'getreplyid',type:'post'}
        ,{file:'./getsreplyid',path:'/getsreplyid',method:'getsreplyid',type:'post'}
        ,{file:'./sendlocal',path:'/sendlocal',method:'sendlocal',type:'post'}
        ,{file:'./getlpostid',path:'/getlpostid',method:'getlpostid',type:'post'}
        ,{file:'./getsearchid',path:'/getsearchid',method:'getsearchid',type:'post'}
        ,{file:'./getsearchlid',path:'/getsearchlid',method:'getsearchlid',type:'post'}
        ,{file:'./getpimg',path:'/getpimg',method:'getpimg',type:'post'}
        ,{file:'./getpn',path:'/getpn',method:'getpn',type:'post'}
        ,{file:'./pbox',path:'/pbox',method:'pbox',type:'post'}
        ,{file:'./getinfoid',path:'/getinfoid',method:'getinfoid',type:'post'}
        ,{file:'./getinfoimg',path:'/getinfoimg',method:'getinfoimg',type:'post'}
        ,{file:'./getfgid',path:'/getfgid',method:'getfgid',type:'post'}
        ,{file:'./getfdid',path:'/getfdid',method:'getfdid',type:'post'}      
        ,{file:'./getf',path:'/getf',method:'getf',type:'post'}
        ,{file:'./userinfo',path:'/userinfo',method:'userinfo',type:'post'}
        ,{file:'./onepost','path':'/onepost',method:'onepost',type:'onepost'}
        ,{file:'./lmgetpost',path:'/lmgetpost',method:'lmgetpost',type:'post'}
        ,{file:'./lgetpost',path:'/lgetpost',method:'lgetpost',type:'post'}
        ,{file:'./fi',path:'/fi',method:'fi',type:'post'}
        ,{file:'./lvarr',path:'/lvarr',method:'lvarr',type:'post'}
        ,{file:'./love1',path:'/love1',method:'love1',type:'post'}
        ,{file:'./love2',path:'/love2',method:'love2',type:'post'}
        ,{file:'./lgid',path:'/lgid',method:'lgid',type:'post'}
        ,{file:'./stk',path:'/stk',method:'stk',type:'post'}
        ,{file:'./push1',path:'/push1',method:'push1',type:'post'}
        ,{file:'./pushl',path:'/pushl',method:'pushl',type:'post'}
        ,{file:'./pushrp',path:'/pushrp',method:'pushrp',type:'post'}
        ,{file:'./pushrs',path:'/pushrs',method:'pushrs',type:'post'}
        ,{file:'./getal',path:'/getal',method:'getal',type:'post'}
        ,{file:'./getparr',path:'/getparr',method:'getparr',type:'post'}
        ,{file:'./hl1',path:'/hl1',method:'hl1',type:'post'}
        ,{file:'./hl2',path:'/hl2',method:'hl2',type:'post'}
        ,{file:'./hl3',path:'/hl3',method:'hl3',type:'post'}
        ,{file:'./hl4',path:'/hl4',method:'hl4',type:'post'}
        ,{file:'./gethl',path:'/gethl',method:'gethl',type:'post'}
        ,{file:'./getpnarr',path:'/getpnarr',method:'getpnarr',type:'post'}
        ,{file:'./cget',path:'/cget',method:'cget',type:'post'}
        ,{file:'./sendm',path:'/sendm',method:'sendm',type:'post'}
        ,{file:'./getcr',path:'/getcr',method:'getcr',type:'post'}
        ,{file:'./fgs',path:'/fgs',method:'fgs',type:'post'}
        ,{file:'./fds',path:'/fds',method:'fds',type:'post'}
        ,{file:'./atk',path:'/atk',method:'atk',type:'post'}
        ,{file:'./rmp',path:'/rmp',method:'rmp',type:'post'}
        ,{file:'./getcm',path:'/getcm',method:'getcm',type:'post'}
        ,{file:'./pci1',path:'/pci1',method:'pci1',type:'post'}
        ,{file:'./pci2',path:'/pci2',method:'pci2',type:'post'}
        ,{file:'./pci3',path:'/pci3',method:'pci3',type:'post'}
        ,{file:'./pci4',path:'/pci4',method:'pci4',type:'post'}
        ,{file:'./pci11',path:'/pci11',method:'pci11',type:'post'}
        ,{file:'./pci12',path:'/pci12',method:'pci12',type:'post'}
        ,{file:'./achd1',path:'/achd1',method:'achd1',type:'post'}
        ,{file:'./achd2',path:'/achd2',method:'achd2',type:'post'}
        ,{file:'./achd3',path:'/achd3',method:'achd3',type:'post'}
        ,{file:'./achd4',path:'/achd4',method:'achd4',type:'post'}
        ,{file:'./rmrp',path:'/rmrp',method:'rmrp',type:'post'}
        ,{file:'./rmrs',path:'/rmrs',method:'rmrs',type:'post'}
        ,{file:'./vu',path:'/vu',method:'vu',type:'post'}
        ,{file:'./vf',path:'/vf',method:'vf',type:'post'}
        ,{file:'./vup',path:'/vup',method:'vup',type:'post'}
        ,{file:'./vupf',path:'/vupf',method:'vupf',type:'post'}
        ,{file:'./pinit',path:'/pinit',method:'pinit',type:'post'}
        ,{file:'./phu',path:'/phu',method:'phu',type:'post'}
        ,{file:'./phl',path:'/phl',method:'phl',type:'post'}
        ,{file:'./phc1',path:'/phc1',method:'phc1',type:'post'}
        ,{file:'./phc2',path:'/phc2',method:'phc2',type:'post'}
        ,{file:'./getpb',path:'/getpb',method:'getpb',type:'post'}
        ,{file:'./lpost',path:'/lpost',method:'lpost',type:'post'}
        ,{file:'./replypl',path:'/replypl',method:'replypl',type:'post'}
        ,{file:'./replysl',path:'/replysl',method:'replysl',type:'post'}
        ,{file:'./gplrp',path:'/gplrp',method:'gplrp',type:'post'}
        ,{file:'./gplrs',path:'/gplrs',method:'gplrs',type:'post'}
        ,{file:'./getla',path:'/getla',method:'getla',type:'post'}
        ,{file:'./lovel1',path:'/lovel1',method:'lovel1',type:'post'}
        ,{file:'./lovel2',path:'/lovel2',method:'lovel2',type:'post'}
        ,{file:'./chnn',path:'/chnn',method:'chnn',type:'post'}
        ,{file:'./mylh',path:'/mylh',method:'mylh',type:'post'}
        ,{file:'./colh',path:'/colh',method:'colh',type:'post'}
        ,{file:'./getmylh',path:'/getmylh',method:'getmylh',type:'post'}
        ,{file:'./getcolh',path:'/getcolh',method:'getcolh',type:'post'}
        ,{file:'./p2al1',path:'/p2al1',method:'p2al1',type:'post'}
        ,{file:'./p2al2',path:'/p2al2',method:'p2al2',type:'post'}
        ,{file:'./getpg2a',path:'/getpg2a',method:'getpg2a',type:'post'}
        ,{file:'./oneplag',path:'/oneplag',method:'oneplag',type:'post'}
        ,{file:'./remp2a1',path:'/remp2a1',method:'remp2a1',type:'post'}
        ,{file:'./remp2a2',path:'/remp2a2',method:'remp2a2',type:'post'}
        ,{file:'./getlp',path:'/getlp',method:'getlp',type:'post'}
        ,{file:'./getlpp',path:'/getlpp',method:'getlpp',type:'post'}
        ,{file:'./npup',path:'/npup',method:'npup',type:'post'}
        ,{file:'./getls',path:'/getls',method:'getls',type:'post'}
        ,{file:'./getlss',path:'/getlss',method:'getlss',type:'post'}
        ,{file:'./getlaa',path:'/getlaa',method:'getlaa',type:'post'}
        ,{file:'./dcplag',path:'/dcplag',method:'dcplag',type:'post'}
        ,{file:'./dccon',path:'/dccon',method:'dccon',type:'post'}
	]
}