//FirstView Component Constructor
function HomeView() {
	//create object instance, a parasitic subclass of Observable
	var self = Ti.UI.createView({top:65,width:Ti.Platform.displayCaps.platformWidth-20});
	
	var tbView = Ti.UI.createTableView({
					top:0,
					borderRadius:10,
					borderColor:'#b0b0b0',
					borderWidth:1,
					headerView:Ti.UI.createLabel({
						height:35,
						width:Ti.Platform.displayCaps.platformWidth-20,
						text:'Home',
						textAlign:'left',
						borderRadius:"10 10 0 0",
						backgroundImage:'images/common/tbheading.png',
						backgroundRepeat:true
					})
		});
		var tbFooter = Ti.UI.createView({
						height:35,
						backgroundImage:'images/common/tbheading.png',
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
			backgroundColor:(i%2)?null:'#cddbee',
			borderWidth:1,
			borderColor:'#eff3f9',
			height:60,
			data:{
				sticky: true,
				title: "ผมอยากทราบว่าสมาขิก มีความคิดเป็นยังไงกับพ่อค้าออนไลน์ ทำพฤติกรรมอย่างนี้",
				id: 613411,
				create: "เมื่อ: 25 ธ.ค. 2012, 03:11",
				page: 10,
				reply: "เกษม ลิ้มวิไล",
				read: 140
			}
		});
		var lbGroup = Ti.UI.createLabel({
			text:((i%2)?'ประชาสัมพันธ์งานแข่งขันจักรยาน':'จัดทริป / ชวนปั่น'),
			font:{fontSize:10},
			width:80,
			left:5,
			top:6,
		});
		var lbUser = Ti.UI.createLabel({
			text:'dancing on the pedal',
			font:{fontSize:10},
			width:140,
			right:105,
			bottom:2,
			textAlige:'right'
			
		});
		var lbCreate = Ti.UI.createLabel({
			text:'28 มี.ค. 2013, 15:53',
			font:{fontSize:10},
			width:100,
			right:5,
			bottom:2,
			textAlige:'right'
		});
		
		var lbTitle = Ti.UI.createLabel({
			text:'ชวนปั่นสานสัมพันธ์ งานเปิดตัวชมรมกีฬาจักรยาน สโมสรท่าอากาศยานไทย - ดอนเมือง วันที่ 8 เมษายน 2556',
			top:2,
			left:85,
			width:345,
			font:defaultFont,
			color:defaultColor,
			wordWrap:true
		});
		
		
		tbRow.add(lbGroup);
		tbRow.add(lbTitle);
		tbRow.add(lbUser);
		tbRow.add(lbCreate);
		tbView.appendRow(tbRow);		
	}
	
	tbView.addEventListener('click',function(e){
		alert(e.rowData);
		var DetailWindow = require('ui/common/DetailWindow');
		var detailWindow = new DetailWindow();
		detailWindow.open(e.rowData.data);
		
	});
	
	self.add(tbView);
	return self;
}

module.exports = HomeView;
