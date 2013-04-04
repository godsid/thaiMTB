function DetailWindow(_args){
	var HeadView = require('/ui/common/HeadView');
	var headView = new HeadView();
	
	//headView.navHome.addEventListener('click',function(){
		//self.close();	
	//});
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
	var self = Ti.UI.createWindow({
		backgroundColor:setting.appBackgroundColor
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
					height:50,
					backgroundImage:'/images/common/tbheading.png',
					backgroundRepeat:true
	}); 
	/*
	 var lbHeadBack = Ti.UI.createLabel({
					text:'Back',
					textAlign:'left',
	});
	
	lbHeadBack.addEventListener('click',function(e){
		self.close();
	});
	tbHeadView.add(lbHeadBack); 
	*/
	tbHeadView.add(Ti.UI.createLabel({
		text:_args.create,
		top: 3,
		left:8,
		color:'#FFA34F',
		font:setting.fontHead
	}));
	
	tbView.setHeaderView(tbHeadView);
	
	/*
	 * User Row
	 */
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
	
	var tvRowReply = Ti.UI.createTableViewRow({
		left:5,
		color:setting.colorDetail,
		backgroundColor:'#A9B8C2',
		title:"ขายเสือภูเขา Specialized Rock Hopper 2011 ไซด์ 15.5 24,500  \nสภาพ : ใช้ได้ได้ปกติ ดี มาก อะไหล่บ้างชิ้นเบิกใหม่ๆ แถมไมค์ ขากะติก\nตำหนิ : มีลอยตามสภาพใช้งาน ลอยชัดๆโซ่ตก ใกล้ๆใบจาน \nประกัน : ไม่มีประกัน\nเหตุผลในการขาย : ระดมทุนไปลง ฟูลซัส \nเน้นโทรน่ะครับ ไม่ค่อยอยู่หน้าคอม ติดต่อ บอย 085 337 3300 \nขอขายทั้งคันก่อนน่ะครับ ไม่ส่งไปรษณีย์ลำบากถอด มาดูรถตัวเป็นๆ อยู่เทพารักษ์ สมุทรปราการ บางนา\n\nSpecialized Rock Hopper 2011 ไซด์ 15.5 + ขากระติก Specialized\nหลักอาน คาร์บอน Specialized + เบาะ Selle \nโช๊ค Rock Shok J3 100mm\nจาน Shimano XT 42/32/24 ขา 175mm , บันได Shimano DX \nสับจาน SLX , ตีนผี Sram X9 ,เฟืองSHIMANO CS-HG20-9 11-32 \nชิบเตอร์ Sram 9 spd double tap กดทางเดียว เร็วมาก\nเบรก Tektro Draco , แฮนด์ยก FSAอลู , สเต็ม Eastonอลู 70mm\nล้อ Mavic 317 ดุม Power Way เบา เลื่อน แน่น โม่ดังดี\nยางใหม่กิ๊บ Geax Saguaro 26X2.0 เปลี่ยนมาได้ 5 วัน หนวดยางเต็มๆ ยางในMaxxis\nแถมไมค์ Cateye ไร้สายไปด้วย,",
		font:setting.fontNormal
	});
	tbView.appendRow(tvRowReply);
	var tvRowReply = Ti.UI.createTableViewRow({
		left:5,
		color:setting.colorDetail,
		backgroundColor:'#ECECEC',
		title:"ขายเสือภูเขา Specialized Rock Hopper 2011 ไซด์ 15.5 24,500  \nสภาพ : ใช้ได้ได้ปกติ ดี มาก อะไหล่บ้างชิ้นเบิกใหม่ๆ แถมไมค์ ขากะติก\nตำหนิ : มีลอยตามสภาพใช้งาน ลอยชัดๆโซ่ตก ใกล้ๆใบจาน \nประกัน : ไม่มีประกัน\nเหตุผลในการขาย : ระดมทุนไปลง ฟูลซัส \nเน้นโทรน่ะครับ ไม่ค่อยอยู่หน้าคอม ติดต่อ บอย 085 337 3300 \nขอขายทั้งคันก่อนน่ะครับ ไม่ส่งไปรษณีย์ลำบากถอด มาดูรถตัวเป็นๆ อยู่เทพารักษ์ สมุทรปราการ บางนา\n\nSpecialized Rock Hopper 2011 ไซด์ 15.5 + ขากระติก Specialized\nหลักอาน คาร์บอน Specialized + เบาะ Selle \nโช๊ค Rock Shok J3 100mm\nจาน Shimano XT 42/32/24 ขา 175mm , บันได Shimano DX \nสับจาน SLX , ตีนผี Sram X9 ,เฟืองSHIMANO CS-HG20-9 11-32 \nชิบเตอร์ Sram 9 spd double tap กดทางเดียว เร็วมาก\nเบรก Tektro Draco , แฮนด์ยก FSAอลู , สเต็ม Eastonอลู 70mm\nล้อ Mavic 317 ดุม Power Way เบา เลื่อน แน่น โม่ดังดี\nยางใหม่กิ๊บ Geax Saguaro 26X2.0 เปลี่ยนมาได้ 5 วัน หนวดยางเต็มๆ ยางในMaxxis\nแถมไมค์ Cateye ไร้สายไปด้วย,",
		font:setting.fontNormal
	});
	tbView.appendRow(tvRowReply);
	
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
