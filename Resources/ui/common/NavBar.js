function NavBar(){
	var self = Ti.UI.createView({
		top:0,
		width:Ti.Platform.displayCaps.platformWidth,
		height:50,
		layout:'horizontal',
		//borderRadius:10,	
		borderColor:'#b0b0b0',
		borderWidth:1,
		backgroundImage:'/images/topnav.png',
		backgroundRepeat:true,
		
	});
	var btHomeView = Ti.UI.createView({
		width: 142,
		height:50,
		left:5,
		backgroundImage:'/images/topnavLogo.png',
	});
	var sepView = Ti.UI.createView({
		width:2,
		height:'auto',
		left:5,
		backgroundImage:'/images/topnav_sep.png'
	});
	var lbTitle = Ti.UI.createLabel({
		left:5,
		width:'auto',
		
		font:{fontSize:30},
		color:'#005784',
		text:'กระดานข่าว'
	});
	
	var btInfoView = Ti.UI.createView({
		width:50,
		height:50,
		backgroundImage:'/images/infoIcon.png'
	});
	var btLoginView = Ti.UI.createView({
		width: 50,
		height:50,
		backgroundImage:'/images/loginIcon.png',
	});
	self.add(btHomeView);
	self.add(sepView);
	self.add(lbTitle);
	self.add(Ti.UI.createView({
		width:2,
		height:'auto',
		left:5,
		backgroundImage:'/images/topnav_sep.png'
	}));
	self.add(btInfoView);
	self.add(Ti.UI.createView({
		width:2,
		height:'auto',
		left:5,
		backgroundImage:'/images/topnav_sep.png'
	}));
	lbTitle.addEventListener('click',function(e){
		if(forumid=='news'){
			forumid='secondhand';
			this.setText("ประกาศขายมือสอง");
		}else{
			forumid='news';
			this.setText("กระดานข่าว");
		}
		self.fireEvent('changeBoard',{
			
		});
	});
	
	
	//self.add(btLoginView);
	/*
	btHomeView.addEventListener('click',function(e){
		self.fireEvent('login', {
			
		});
	});
	*/
	btLoginView.addEventListener('click',function(e){
		self.fireEvent('login', {
			
		});
	});
	btInfoView.addEventListener('click',function(e){
		self.fireEvent('showInfo', {
		});
	});
	return self;
}

module.exports = NavBar;