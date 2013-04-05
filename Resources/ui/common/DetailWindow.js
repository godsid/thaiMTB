function DetailWindow(_args){
	var self = Ti.UI.createWindow({
		layout:'vertical',
		backgroundColor:setting.appBackgroundColor
	});
	/*
	if(setting.osname !== 'android'){
		_args = {
					sticky: true,
					title: "ผมอยากทราบว่าสมาขิก มีความคิดเป็นยังไงกับพ่อค้าออนไลน์ ทำพฤติกรรมอย่างนี้",
					id: 613411,
					create: "25 ธ.ค. 2012, 03:11",
					user:'tui',
					page: 10,
					reply: 30,
					read: 140
			};
	}*/
	var HeadView = require('/ui/common/HeadView');
	var headView = new HeadView({title:_args.title});
	//headView.navHome.setBackgroundImage('/images/common/shoppingIcon.png');
	/*self.addEventListener('click',function(e){
		self.close();
	});
	*/
	self.add(headView);
	var TopicMode = require('/model/TopicModel');
	
	var topicModel = new TopicMode({t:_args.id});
	var Loading = require('/ui/common/Loading');
	var loading = new Loading();
	self.add(loading);
	loading.show();

	
	var tbView = Ti.UI.createTableView({
		top:0,
		width:Ti.Platform.displayCaps.platformWidth,
		//borderRadius:10,
		borderColor:'#b0b0b0',
		borderWidth:1,
	});
	
	var tbHeadView = Ti.UI.createView({
		width:Ti.Platform.displayCaps.platformWidth,
		top:0,
		height:50,
		backgroundImage:'/images/common/tbheading.png',
		backgroundRepeat:true
	}); 
	tbHeadView.add(Ti.UI.createLabel({
		text:_args.create,
		top: 3,
		left:8,
		color:'#FFA34F',
		font:setting.fontHead
	}));
	
	tbView.setHeaderView(tbHeadView);
	var tbRowView = Ti.UI.createTableViewRow({
		backgroundImage:'/images/common/article_title.png',
		height:41,
		backgroundColor:'#ECECEC'
	});
	tbRowView.add(Ti.UI.createLabel({
		text:'By '+_args.user,
		left:10,
		color:'#000000',
		fint:setting.fontNormal
	}));
	tbRowView.add(Ti.UI.createLabel({
		text:'อ่าน '+_args.read,
		right:5,
		borderRadius:5,
		borderWidth:1,
		color:'#000000',
		backgroundColor:'#FFFFFF',
		font:setting.fontSmall
	}));
	
	tbView.appendRow(tbRowView);
	var tvRowTitle = Ti.UI.createTableViewRow({
		height:100,
		backgroundColor:'#ECECEC',
		color:setting.colorDetail,
		title:_args.title,
		font:setting.fontNormal
	});
	tbView.appendRow(tvRowTitle);
	
	topicModel.onload = function(e){
		data = JSON.parse(this.responseText).reads;
		for(var i=0,j=data.length; i<j; i++){
			var tvRowReply = Ti.UI.createTableViewRow({
				left:5,
				color:setting.colorDetail,
				backgroundColor:(i%2)?'#ECECEC':'#A9B8C2',
				title:data[i].detail,
				font:setting.fontNormalWeight
			});
			tbView.appendRow(tvRowReply);
		}
		
		loading.hide();
		self.remove(loading);
		self.add(tbView);
	};
	topicModel.send();
	
	
	/*
	sticky: true,
	title: "ผมอยากทราบว่าสมาขิก มีความคิดเป็นยังไงกับพ่อค้าออนไลน์ ทำพฤติกรรมอย่างนี้",
	id: 613411,
	create: "เมื่อ: 25 ธ.ค. 2012, 03:11",
	page: 10,
	reply: "เกษม ลิ้มวิไล",
	read: 140
	*/
	
	
	self.addEventListener('closeDetail',function(){
		self.close();
	});
	self.addEventListener('android:back',function(){
		self.close(Ti.UI.createAnimation({
				right:-320,
				duration:5000
			}));
		//return false;
	});

	self.fireEvent('android:back');	
	return self;
}

module.exports = DetailWindow;
