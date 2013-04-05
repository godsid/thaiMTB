//Application Window Component Constructor
function ApplicationWindow() {
	//create component instance
	var self = Ti.UI.createWindow({
		layout:'vertical',
		backgroundColor:setting.appBackgroundColor
	});
	//load component dependencies
	var HomeView = require('ui/common/HomeView');
	var HeadView = require('ui/common/HeadView');
		
	//construct UI
	
	var headView = new HeadView({title:'ประกาศขายมือสอง'});
	self.add(headView);
	
	var homeView = new HomeView();
	self.add(homeView);
	
	return self;
}

//make constructor function the public component interface
module.exports = ApplicationWindow;
