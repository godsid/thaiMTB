<<<<<<< HEAD
function LoginView(){
	var self = Ti.UI.createView({
		layout:'vertical',
		backgroundImage:'/images/loginbg.gif',
	});
	
	var userLabel = Ti.UI.createLabel({
		top:230,
		width:300,
		height:50,
		textAlign:'left',
		text:"Username",
		font:{fontSize:40},
		color:'black',
	});
	var userInput = Ti.UI.createTextField({
		top:5,
		width:300,
		/*height:50,*/
		textAlign:'left',
		backgroundColor: 'white',
		/*font:{fontSize:30},*/
		borderStyle: Ti.UI.INPUT_BORDERSTYLE_LINE,
		color: '#336699',
		hintText : 'Username',
		value:'godsid',
	});
	var passwordLabel = Ti.UI.createLabel({
		top:10,
		width:300,
		height:50,
		textAlign:'left',
		text:"Password",
		font:{fontSize:40},
		color:'black',
		
	});
	var passwordInput = Ti.UI.createTextField({
		top:5,
		width:300,
		/*height:50,*/
		textAlign:'left',
		backgroundColor: 'white',
		/*font:{fontSize:30},*/
		borderStyle: Ti.UI.INPUT_BORDERSTYLE_LINE,
		color: '#336699',
		hintText : 'Password',
		passwordMask:true,
		value:'1234qwer'
		
	});
	var sendButton = Ti.UI.createButton({
		top:10,
		width:150,
		height:70,
		textAlign:'center',
   		title : 'Login',
    	style : Ti.UI.iPhone.SystemButtonStyle.DONE,
    	font:{fontSize:20},
	});
	
	
	self.add(userLabel);
	self.add(userInput);
	self.add(passwordLabel);
	self.add(passwordInput);
	self.add(sendButton);
	
	var client = Ti.Network.createHTTPClient({
		timeout:5000,
		onload:function(e){
			resp = JSON.parse(this.responseText);
			if(resp.header.status==200){
				for(var i=0,j=resp.cookie.length; i<j; i++){
				   
				};
			}else{
				alert("Username Or Password Invalid.\nPress try again.");
			}
			
		}
	});
	sendButton.addEventListener('click',function(e){
		client.open('POST','http://srihawong.info/app/thaimtb_login.php');
		client.send({
			username:userInput.getValue(),
			password:passwordInput.getValue(),
		});
	});
	
	 
	/*
	 * Url: http://thaimtb.com/forum/ucp.php?mode=login
	 * From Data:
	 * - username
	 * - password
	 * - redirect
	 * - sid
	 * - redirect
	 * login: เข้าสู่ระบบ
	 * 
	 */
	
	
	return self;
}

=======
function LoginView(){
	var self = Ti.UI.createView({
		layout:'vertical',
		backgroundImage:'/images/loginbg.gif',
	});
	
	var userLabel = Ti.UI.createLabel({
		top:230,
		width:300,
		height:50,
		textAlign:'left',
		text:"Username",
		font:{fontSize:40},
		color:'black',
	});
	var userInput = Ti.UI.createTextField({
		top:5,
		width:300,
		/*height:50,*/
		textAlign:'left',
		backgroundColor: 'white',
		/*font:{fontSize:30},*/
		borderStyle: Ti.UI.INPUT_BORDERSTYLE_LINE,
		color: '#336699',
		hintText : 'Username',
		value:'godsid',
	});
	var passwordLabel = Ti.UI.createLabel({
		top:10,
		width:300,
		height:50,
		textAlign:'left',
		text:"Password",
		font:{fontSize:40},
		color:'black',
		
	});
	var passwordInput = Ti.UI.createTextField({
		top:5,
		width:300,
		/*height:50,*/
		textAlign:'left',
		backgroundColor: 'white',
		/*font:{fontSize:30},*/
		borderStyle: Ti.UI.INPUT_BORDERSTYLE_LINE,
		color: '#336699',
		hintText : 'Password',
		passwordMask:true,
		value:'1234qwer'
		
	});
	var sendButton = Ti.UI.createButton({
		top:10,
		width:150,
		height:70,
		textAlign:'center',
   		title : 'Login',
    	style : Ti.UI.iPhone.SystemButtonStyle.DONE,
    	font:{fontSize:20},
	});
	
	
	self.add(userLabel);
	self.add(userInput);
	self.add(passwordLabel);
	self.add(passwordInput);
	self.add(sendButton);
	
	var client = Ti.Network.createHTTPClient({
		timeout:5000,
		onload:function(e){
			resp = JSON.parse(this.responseText);
			if(resp.header.status==200){
				for(var i=0,j=resp.cookie.length; i<j; i++){
				   
				};
			}else{
				alert("Username Or Password Invalid.\nPress try again.");
			}
			
		}
	});
	sendButton.addEventListener('click',function(e){
		client.open('POST','http://srihawong.info/app/thaimtb_login.php');
		client.send({
			username:userInput.getValue(),
			password:passwordInput.getValue(),
		});
	});
	
	 
	/*
	 * Url: http://thaimtb.com/forum/ucp.php?mode=login
	 * From Data:
	 * - username
	 * - password
	 * - redirect
	 * - sid
	 * - redirect
	 * login: เข้าสู่ระบบ
	 * 
	 */
	
	
	return self;
}

>>>>>>> 46aab4378e7fc2e7e9e8fc29ac03ae549b61fa61
module.exports = LoginView;