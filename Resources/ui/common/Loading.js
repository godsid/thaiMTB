function Loading(){
	var self = Ti.UI.createActivityIndicator({
		message: 'Loading...',
		top:'50%',
		height:Ti.UI.SIZE,
		width:Ti.UI.SIZE
	});
	
	return self;
}

module.exports = Loading;
