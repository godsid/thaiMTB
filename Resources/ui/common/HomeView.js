//FirstView Component Constructor
function HomeView() {
	//create object instance, a parasitic subclass of Observable
	var self = Ti.UI.createView({top:65,width:Ti.Platform.displayCaps.platformWidth-20});
	
	var tbView = Ti.UI.createTableView({
					top:0,
					borderRadius:10,
					borderColor:'#b0b0b0',
					borderWidth:1,
					/*headerView:Ti.UI.createLabel({
						height:35,
						width:Ti.Platform.displayCaps.platformWidth-20,
						text:'Home',
						textAlign:'left',
						borderRadius:"10 10 0 0",
						backgroundImage:'images/common/tbheading.png',
						backgroundRepeat:true
					})*/
		});
		var tbFooter = Ti.UI.createView({
						height:35,
						backgroundImage:'/images/common/tbheading.png',
						backgroundRepeat:true,
				});
		tbFooter.add(Ti.UI.createLabel({
						text:'top ^',
						color:'#FFFFFF',
						right:5,
						font:defaultFont
					}));
		tbFooter.add(Ti.UI.createLabel({
						text:'< more',
						color:'#FFFFFF',
						left:5,
						font : defaultFont,
					}));
		
		tbView.setFooterView(tbFooter);
		
	for(var i=0;i<30;i++){
		var tbRow = Ti.UI.createTableViewRow({
			height:120,
			backgroundColor:(i%2)?'#A9B8C2':'#ECECEC',
			borderWidth:1,
			borderColor:'#eff3f9',
			data:{
				sticky: true,
				title: "ผมอยากทราบว่าสมาขิก มีความคิดเป็นยังไงกับพ่อค้าออนไลน์ ทำพฤติกรรมอย่างนี้",
				id: 613411,
				create: "25 ธ.ค. 2012, 03:11",
				page: 10,
				reply: 30,
				read: 140
			}
		});
		
		var row1 = Ti.UI.createView({
			height:35,
			top:0,
		});
		
		var row2 = Ti.UI.createView({
			height:75,
			top:35,
		});
		
		var lbGroup = Ti.UI.createLabel({
			text:((i%2)?'ประชาสัมพันธ์งานแข่งขันจักรยาน':'จัดทริป / ชวนปั่น'),
			font:setting.fontSmall,
			color:setting.colorSmall,
			left:5,
			top:0,
		});
		var lbUser = Ti.UI.createLabel({
			text:'โดย: dancing on the pedal',
			font:setting.fontSmall,
			color:setting.colorSmall,
			bottom:0,
			width:300,
			left:5,
			textAlige:'left'
			
		});
		var lbCreate = Ti.UI.createLabel({
			text:'เมื่อ: 28 มี.ค. 2013, 15:53',
			font:setting.fontSmall,
			color:setting.colorSmall,
			width:160,
			right:5,
			top:16,
			textAlige:'right'
		});
		
		row1.add(lbGroup);
		row1.add(lbUser);
		row1.add(lbCreate);
		
		
		var lbTitle = Ti.UI.createLabel({
			text:'ประชาสัมพันธ์ ชวนปั่น รณรงค์ “ปกป้องอาร์กติก”กรีนพีซ เอเชียตะวันออกเฉียงใต้ ขอชวนคนไทยมาร่วม “แปรอักษรภาพมนุษย์ (Human Banner)”',
			top:2,
			left:5,
			font:setting.fontNormalWeight,
			color:setting.colorNormal,
			wordWrap:true
		});
		
		row2.add(lbTitle);
		
		tbRow.add(row1);
		tbRow.add(row2);
		tbView.appendRow(tbRow);		
	}
	
	tbView.addEventListener('click',function(e){
		var DetailWindow = require('/ui/common/DetailWindow');
		var detailWindow = new DetailWindow();
		detailWindow.open(e.rowData.data);
	});

	self.add(tbView);
	return self;
}

module.exports = HomeView;
