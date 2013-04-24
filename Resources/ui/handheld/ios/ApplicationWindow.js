function ApplicationWindow() {
	//declare module dependencies
	var MasterView = require('ui/common/MasterView'),
		DetailView = require('ui/common/DetailView'),
		InfoView = require('ui/common/InfoView');
		//LoadingWindow = require('ui/common/LoadingWindow');
	//create object instance
	var self = Ti.UI.createWindow({
		backgroundColor:'#f7d5cf'
	});

	//construct UI
	var masterView = new MasterView(),
		detailView = new DetailView();
		infoView = new InfoView();
		//loadindWindow = new LoadingWindow();

	//create master view container
	var masterContainerWindow = Ti.UI.createWindow({
		title:forumName,
		navBarHidden:false,
		barImage:'/images/topnavBackground.png',
		tabBarHidden :true,
		leftNavButton:btListBoard = Ti.UI.createView({
			left:0,
			top:0,
			width:42,
			height:42,
			backgroundImage:'/images/topnavMenuList.png',
		}),
		titleControl:btHomeView = Ti.UI.createView({
			left:0,
			top:2,
			width:142,
			height:46,
			backgroundImage:'/images/topnavLogo.png',
		}),
		rightNavButton:btInfoView = Ti.UI.createView({
			right:0,
			top:2,
			width:48,
			height:46,
			backgroundImage:'/images/topnavInfo.png',
		}),
	});

	masterContainerWindow.add(masterView);

	//create detail view container
	var detailContainerWindow = Ti.UI.createWindow({
		title:forumName
	});
	detailContainerWindow.add(detailView);

	//create iOS specific NavGroup UI
	var navGroup = Ti.UI.iPhone.createNavigationGroup({
		window:masterContainerWindow
	});
	self.add(navGroup);

	//add behavior for master view
	masterView.addEventListener('itemSelected', function(e) {
		detailView.fireEvent('itemSelected',e);
		navGroup.open(detailContainerWindow);
	});
	// Info Windows

	btInfoView.addEventListener('click',function(e){
		var infoContainerWindow = Ti.UI.createWindow({
			navBarHidden:true,
		});
		infoContainerWindow.add(infoView);
		infoContainerWindow.add(btClose = Ti.UI.createView({
			right:0,
			top:0,
			width:30,
			height:30,
			backgroundImage:'/images/close.png',
		}));
		infoContainerWindow.open({
			modal:true,
			modalTransitionStyle: Ti.UI.iPhone.MODAL_TRANSITION_STYLE_FLIP_HORIZONTAL,
			modalStyle: Ti.UI.iPhone.MODAL_PRESENTATION_FORMSHEET
		});
		btClose.addEventListener('click',function(e){
			infoContainerWindow.close();
		});
		infoView.addEventListener('closeInfo',function(e){
			infoContainerWindow.close();
		});
	});
	
	btListBoard.addEventListener('click',function(e){
		
	});
	/*
	 loadindWindow.addEventListener('showLoading',function(e){
		loadingWindow.open({
			modal:true,
			modalTransitionStyle: Ti.UI.iPhone.MODAL_TRANSITION_STYLE_FLIP_HORIZONTAL,
			modalStyle: Ti.UI.iPhone.MODAL_PRESENTATION_FORMSHEET
		});
	});
	loadindWindow.addEventListener('hideLoading',function(e){
		loadingWindow.close();
	});
	*/
	return self;
};

module.exports = ApplicationWindow;