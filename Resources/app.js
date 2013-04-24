/*
* A master detail view, utilizing a native table view component and platform-specific UI and navigation. 
* A starting point for a navigation-based application with hierarchical data, or a stack of windows. 
* Requires Titanium Mobile SDK 1.8.0+.
* 
* In app.js, we generally take care of a few things:
* - Bootstrap the application with any data we need
* - Check for dependencies like device type, platform version or network connection
* - Require and open our top-level UI component
*  
*/

//bootstrap and check dependencies
if (Ti.version < 1.8 ) {
	alert('Sorry - this application template requires Titanium Mobile SDK 1.8 or later');	  	
}
//var win = null;
var forumid = 'news';
var forumName = 'กระดานข่าว';

//determine platform and form factor and render approproate components
var APP = {	osname : Ti.Platform.osname,
			version : Ti.Platform.version,
			name : Ti.Platform.name,
			height : Ti.Platform.displayCaps.platformHeight,
			width : Ti.Platform.displayCaps.platformWidth,
			smallFontSize:13,
			mediumFontSize:18,
			bigFontSize:25,
			//fontFamily:'Circular',
			fontFamily:'AppleGothic',
	};
Ti.API.debug(Ti.Platform.ostype);
var GA = require('analytics.google');
//GA.optOut = true;
GA.debug = false;
var tracker = GA.getTracker("UA-40209680-1");

// This is a single context application with mutliple windows in a stack
(function() {
	//considering tablet to have one dimension over 900px - this is imperfect, so you should feel free to decide
	//yourself what you consider a tablet form factor for android
	var isTablet = APP.osname === 'ipad' || (APP.osname === 'android' && (APP.width > 899 || APP.height > 899));

	var Window;
	if (isTablet) {
		Window = require('ui/tablet/ApplicationWindow');
	}
	else {
		// iPhone and Mobile Web make use of the platform-specific navigation controller,
		// all other platforms follow a similar UI pattern
		if (APP.osname === 'iphone') {
			Window = require('ui/handheld/ios/ApplicationWindow');
		}
		else if (APP.osname == 'mobileweb') {
			Window = require('ui/handheld/mobileweb/ApplicationWindow');
		}
		else {
			Window = require('ui/handheld/android/ApplicationWindow');
		}
	}
	new Window().open();


})();
tracker.trackTiming({
	category: "",
	time: 10,
	name: "",
	label: ""
});
tracker.trackEvent({
	category: "category",
	action: "open",
	label: "app",
	value: 1
});