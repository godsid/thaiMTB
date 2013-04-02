function DetailWindow(_args){
	alert(_args);
	var HeadView = require('ui/common/HeadView');
	
	var self = Ti.UI.createWindow({
		backgroundColor:'#ffffff'
	});
	/*
	 * Head Table
	 */
	var headView = new HeadView();
	self.add(headView);
	
	var tbView = Ti.UI.createTableView({
					top:65,
					width:Ti.Platform.displayCaps.platformWidth-20,
					borderRadius:10,
					borderColor:'#b0b0b0',
					borderWidth:1,
	});
	var tbHeadView = Ti.UI.createView({
					width:Ti.Platform.displayCaps.platformWidth-20,
					height:35,
					borderRadius:"10 10 0 0",
					backgroundImage:'images/common/tbheading.png',
					backgroundRepeat:true
	}); 
	
	 var lbHeadBack = Ti.UI.createLabel({
					text:'Back',
					textAlign:'left',
	});
	lbHeadBack.addEventListener('click',function(e){
		self.close();
	});
	tbHeadView.add(lbHeadBack); 
	tbHeadView.add(Ti.UI.createLabel({
		text:'_args.create',
		left:30
	}));
	
	tbView.setHeaderView(tbHeadView);
	
	/*
	 * User Row
	 */
	var tbRowView = Ti.UI.createTableViewRow({
		backgroundImage:'images/common/article_title.png',
		height:41
	});
	tbRowView.add(Ti.UI.createLabel({
		text:'By '+'_args.reply',
		left:10
	}));
	tbRowView.add(Ti.UI.createLabel({
		text:'Read '+'_args.read',
		left:30,
		borderRadius:5,
		borderWidth:1,
		backgroundColor:'#FFFFFF'
	}));
	
	tbView.appendRow(tbRowView);
	
	
	var tvRowTitle = Ti.UI.createTableViewRow({
		height:100,
		backgroundColor:'#eff3f9',
		title:'_args.title'
	});
	tbView.appendRow(tvRowTitle);
	
	/*
	sticky: true,
	title: "ผมอยากทราบว่าสมาขิก มีความคิดเป็นยังไงกับพ่อค้าออนไลน์ ทำพฤติกรรมอย่างนี้",
	id: 613411,
	create: "เมื่อ: 25 ธ.ค. 2012, 03:11",
	page: 10,
	reply: "เกษม ลิ้มวิไล",
	read: 140
	*/
	
	
	self.add(tbView);
	

	
	return self;
}

module.exports = DetailWindow;
