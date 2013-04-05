function TopicModel(_args){
	var self = Ti.Network.createHTTPClient({
		timeout:5000
	});	
	self.open('GET',setting.apiTopicUrl.replace('{t}',_args.t));
	return self;
}

module.exports = TopicModel;
