function ApplicationWindow() {
	//declare module dependencies
	var MasterView = require('ui/common/MasterView'),
	//var HomeView = require('ui/common/HomeView');
		DetailView = require('ui/common/DetailView');
		LoginView = require('ui/common/LoginView');
		InfoView = require('/ui/common/InfoView');
	//create object instance
	var self = Ti.UI.createWindow({
		title:'ประกาศขายมือสอง',
		exitOnClose:true,
		navBarHidden:true,
		backgroundColor:'#f7d5cf'
	});
		
	//construct UI
	var masterView = new MasterView();
	self.add(masterView);
	//var homeView = new HomeView();
	//self.add(homeView);
	var infoView = new InfoView();
	var infoContainerWindow = Ti.UI.createWindow({
		title:'แจ้งปัญหาหรือแนะนำ',
		navBarHidden:true,
		backgroundColor:'#ffffff'
	});
	
	//add behavior for master view
	masterView.addEventListener('itemSelected', function(e) {
	//homeView.addEventListener('itemSelected', function(e) {
		//create detail view container
		var detailView = new DetailView();
		var detailContainerWindow = Ti.UI.createWindow({
			title:'ประกาศขายมือสอง',
			navBarHidden:true,
			backgroundColor:'#ffffff'
		});
		detailContainerWindow.add(detailView);
		detailView.fireEvent('itemSelected',e);
		detailContainerWindow.open();
		detailView.addEventListener('showInfo',function(e){
			infoContainerWindow.add(infoView);
			infoContainerWindow.open();
		});
	});
	
	//homeView.addEventListener('login',function(e){
	masterView.addEventListener('login',function(e){
		var loginView = new LoginView();
		var loginContainerWindow = Ti.UI.createWindow({
			navBarHidden:true,
			//modal:true,
			//fullscreen:true,
			title:'Login',
			backgroundColor:'#000000',
		});
		loginContainerWindow.add(loginView);
		//detailView.fireEvent('itemSelected',e);
		loginContainerWindow.open();
	});
	
	//homeView.addEventListener('closeLogin',function(e){
	masterView.addEventListener('closeLogin',function(e){
		loginContainerWindow.close();
	});
	masterView.addEventListener('changeBoard',function(e){
		self.remove(masterView);
	});
	masterView.addEventListener('showInfo',function(e){
		infoContainerWindow.add(infoView);
		infoContainerWindow.open();
	});
	infoView.addEventListener('closeInfo',function(e){
		infoContainerWindow.close();
	});
	
	return self;
};

module.exports = ApplicationWindow;
