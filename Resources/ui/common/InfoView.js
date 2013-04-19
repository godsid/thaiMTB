/**
 * @author banpot srihawong
 */

//Info View Component Constructor
function InfoView() {
	//create object instance, parasitic subclass of Observable
	var self = Ti.UI.createView({
		//backgroundColor:'white'
		backgroundColor:'#f7d5cf',
		layout:'vertical',
	});
	
	self.add(Ti.UI.createLabel({
		top:15,
		color:'black',
		font:{fontSize:20},
		text:"แจ้งปัญหาการใช้งานหรือเสนอแนะปรับปรุงแอพพลิเคชั่น"
	}));
	self.add(txtArea = Ti.UI.createTextArea({
		width:'90%',
		height:'80%',
		returnKeyType: Ti.UI.RETURNKEY_SEND,
	}));
	self.add(btSend = Ti.UI.createButton({
		title:"ส่งข้อมูล"
	}));
	var client = Ti.Network.createHTTPClient({
		timeout:15000,
		onerror:function(e){
				Ti.API.debug(e.error);
				alert('เกิดความผิดพลาดกรุณาลองใหม่อีกครั้ง');
		},
		onload:function(e){
			alert('ขอบคุณสำหรับการแจ้งปัญหาและคำแนะนำ');
			self.fireEvent('closeInfo',{});
		}
	});
	txtArea.addEventListener('return',function(e){
		tracker.trackEvent({
			category: "category",
			action: "sendInfomation",
			label: "app",
			value: 1
		});
		client.open('POST','http://srihawong.info/app/thaimtb_submitInfo.php');
		client.send({message:txtArea.getValue()});
	});
	btSend.addEventListener('click',function(e){
		tracker.trackEvent({
			category: "category",
			action: "sendInfomation",
			label: "app",
			value: 1
		});
		client.open('POST','http://srihawong.info/app/thaimtb_submitInfo.php');
		client.send({message:txtArea.getValue()});
	});
	self.addEventListener('focus',function(e){
		tracker.trackScreen(Ti.Platform.osname+"/infomation");
	});
	return self;
}
module.exports = InfoView;
