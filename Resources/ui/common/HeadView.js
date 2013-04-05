//HeadView Component Constructor
function HeadView(_args) {
	
	//create object instance, a parasitic subclass of Observable
	var self = Ti.UI.createView({
						top:0,
						width:Ti.Platform.displayCaps.platformWidth,
						height:50,
						layout:'horizontal',
						//borderRadius:10,
						borderColor:'#b0b0b0',
						borderWidth:1,
						backgroundImage:'/images/common/topnav.png',
						backgroundRepeat:true
				});
	var navHome = Ti.UI.createView({
						left:5,
						width:30,
						height:28,
						backgroundImage:'/images/common/topnav_home.png',	
	});
	self.add(navHome);
	navHome.addEventListener('click',function(e){
		navHome.fireEvent('closeDetail');	
	});
	self.add(Ti.UI.createView({
						left:5,
						width:2,
						height:50,
						backgroundImage:'/images/common/topnav_sep.png',	
	}));
	var headLabel = Ti.UI.createLabel({
		left:5,
		width:'auto',
		font:setting.fontHeader,
		color:'#005784',
		text:(_args!=undefined&&_args.title!=undefined)?_args.title:''
	})
	self.add(headLabel);
	return self;
}

module.exports = HeadView;