//HeadView Component Constructor
function HeadView() {
	//create object instance, a parasitic subclass of Observable
	var self = Ti.UI.createView({
						top:5,
						width:Ti.Platform.displayCaps.platformWidth-20,
						height:39,
						borderRadius:10,
						borderColor:'#b0b0b0',
						borderWidth:1,
						backgroundImage:'images/common/topnav.png',
						backgroundRepeat:true
				});
	
	var navHome = Ti.UI.createView({
						left:10,
						width:17,
						height:16,
						backgroundImage:'images/common/topnav_home.png',	
	});
	var navSep = Ti.UI.createView({
						left:30,
						width:2,
						height:31,
						backgroundImage:'images/common/topnav_sep.png',	
	});
	
	self.add(navHome);
	self.add(navSep);
	
	return self;
}

module.exports = HeadView;