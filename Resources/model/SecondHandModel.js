//SecondHandModel Component Constructor
function SecondHandModel(){
	
	var self = Ti.Network.createHTTPClient({
		timeout:5000
	});
	self.open('GET',setting.apiSecondHandUrl);

	return self;
}

module.exports = SecondHandModel;