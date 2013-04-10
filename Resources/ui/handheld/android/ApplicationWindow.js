function ApplicationWindow() {
	//declare module dependencies
	var MasterView = require('ui/common/MasterView'),
		DetailView = require('ui/common/DetailView');
		LoginView = require('ui/common/LoginView');
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
	
	
	
	//add behavior for master view
	masterView.addEventListener('itemSelected', function(e) {
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
	});
	
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
	
	masterView.addEventListener('closeLogin',function(e){
		loginContainerWindow.close();
	});
	return self;
};

module.exports = ApplicationWindow;
