//Application Window Component Constructor
function ApplicationWindow() {
	//load component dependencies

	var HomeView = require('ui/common/HomeView');
	var HeadView = require('ui/common/HeadView');
		
	//create component instance
	var self = Ti.UI.createWindow({
		backgroundColor:setting.appBackgroundColor
	});
		
	//construct UI
	
	var headView = new HeadView();
	self.add(headView);
	
	var homeView = new HomeView();
	self.add(homeView);
	
	
	
	return self;
}

//make constructor function the public component interface
module.exports = ApplicationWindow;
