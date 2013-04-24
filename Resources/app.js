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
var forumid = 'news';
var customFont = 'Circular';

var GA = require('analytics.google');
var Cloud = require('ti.cloud');
var CloudPush = require('ti.cloudpush'); 
//GA.optOut = true;
GA.debug = false;

var tracker = GA.getTracker("UA-40209680-1");


// This is a single context application with mutliple windows in a stack
(function() {
	//determine platform and form factor and render approproate components
	var osname = Ti.Platform.osname,
		version = Ti.Platform.version,
		height = Ti.Platform.displayCaps.platformHeight,
		width = Ti.Platform.displayCaps.platformWidth;
	
	//considering tablet to have one dimension over 900px - this is imperfect, so you should feel free to decide
	//yourself what you consider a tablet form factor for android
	var isTablet = osname === 'ipad' || (osname === 'android' && (width > 899 || height > 899));
	
	var Window;
	if (isTablet) {
		Window = require('ui/tablet/ApplicationWindow');
	}
	else {
		// iPhone and Mobile Web make use of the platform-specific navigation controller,
		// all other platforms follow a similar UI pattern
		if (osname === 'iphone') {
			Window = require('ui/handheld/ios/ApplicationWindow');
		}
		else if (osname == 'mobileweb') {
			Window = require('ui/handheld/mobileweb/ApplicationWindow');
		}
		else {
			Window = require('ui/handheld/android/ApplicationWindow');
		}
	}
	new Window().open();
})();

CloudPush.retrieveDeviceToken({
        success: function deviceTokenSuccess(e) {
			alert('Device Token: ' + e.deviceToken);
			deviceToken = e.deviceToken
			Cloud.Users.login({
			     login: 'godsid',
			     password: '1234qwer'
			 }, function (e) {
			     if (e.success) {
			     	  var user = e.users[0];
			          alert('Success:\n' + 'id: ' + user.id + '\n' +
			            'first name: ' + user.first_name + '\n' +
			            'last name: ' + user.last_name);
			            
					Cloud.PushNotifications.subscribe({
			            channel : 'alert',
			            device_token : deviceToken,
			            type: 'android',
			        }, function(a) {
			            if(a.success) {
			                alert('Success');
			            } else {
			                alert('Error:\n' + ((a.error && e.message) || JSON.stringify(a)));
			            }
			        });
			     } else {
			         alert('Error: ' +((e.error && e.message) || JSON.stringify(e)));
			     }
			});
        },
        error: function deviceTokenError(e) {
            alert('Failed to register for push! ' + e.error);
     }
});
CloudPush.addEventListener('callback', function(evt){
	alert(evt);
});
CloudPush.addEventListener('trayClickLaunchedApp', function(evt){
    Ti.API.info('Tray Click Launched App (app was not running)');
    //alert('Tray Click Launched App (app was not running');
});

CloudPush.addEventListener('trayClickFocusedApp', function(evt){
    Ti.API.info('Tray Click Focused App (app was already running)');
    //alert('Tray Click Focused App (app was already running)');
});
Cloud.PushNotifications.notify({
    channel: 'alert',
    payload: 'Welcome to push notifications'
}, function (e) {
    if (e.success) {
        alert('Success');
    } else {
        alert('Error:\n' +
            ((e.error && e.message) || JSON.stringify(e)));
    }
});
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
