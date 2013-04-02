//NewsModel Component Constructor
function NewsModel(){
	
	var self = Ti.UI.createHttpClient();

	return self;
}
module.exports = NewsModel;