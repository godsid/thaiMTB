function DetailView() {
	var self = Ti.UI.createView({
		backgroundColor:'#f7d5cf',
		layout:'vertical',
	});
	var tableData = [];


	/*
	 * Topic
	 */
	//var NavBar = require('/ui/common/NavBar');
	//var navBar = new NavBar();
	if(Ti.Platform.osname!='iphone'&&Ti.Platform.osname!='ipad'){
		//self.add(navBar);
	}

	var topicView = Ti.UI.createView({
		top:0,
		left:0,
		width:'100%',
		height:45,
		backgroundColor:'#006699',
	});
	var topicLabel = Ti.UI.createLabel({
					top:0,
					left:5,
					width:'100%',

					textAlign:'left',
					font:{fontSize:15},
					color:'#FFA34F',
				});
	topicView.add(topicLabel);
	self.add(topicView);
	/*
	 * TableView
	 */
	var tableView = Ti.UI.createTableView({
		separatorColor:'#eff3f9',
		backgroundColor:self.backgroundColor,
		//minRowHeight:220,
		rowHeight:220,
		allowsSelection:false,
	});
	var loading = Ti.UI.createActivityIndicator({
						top:0,
						//borderWidth:2,
						//borderColor:'red',
						message: ' Loading...',
						top:'50%',
						//height:APP.height-100,
						color:'black',
			});

	/*
	 * Fetch Data
	 */
	var client = Ti.Network.createHTTPClient({
			timeout:15000,
			onreadystatechange:function(e){

			},
			onerror:function(e){
				Ti.API.debug(e.error);
				alert('เกิดความผิดพลาดกรุณาลองใหม่อีกครั้ง');
			},
			onload:function(e){

				data = JSON.parse(this.responseText);

				if(data.reads.length==0){
					loading.hide();
					self.remove(loading);
					alert("Missing Data");
				}
				for(var i=0,j=data.reads.length; i<j; i++){
					var tbRow = Ti.UI.createTableViewRow({
						//height:'auto',
						layout:'vertical',
						//borderWidth:2,
						//borderColor:'#323D4F'
					});
					if(i>0){
						tbRow.setTop(10);
					}
					var userProfile = Ti.UI.createView({
						top:0,
						left:0,
						backgroundColor:'#F9CC79',
						//borderWidth:2,
						//borderColor:'green',
						height:100,

					});

					userProfile.add(Ti.UI.createImageView({
						top:5,
						left:5,
						width:100,
						//height:80,
						image:data.reads[i].user.avatar,
						//borderColor:'#000000',
						//borderWidth:2,
						borderRadius:5,
						defaultImage:'/images/defaultAvatar.png',

					}));

					userProfile.add(Ti.UI.createLabel({
						left:110,
						top:5,
						text:'โดย: '+data.reads[i].user.name,
						color:'black',
						font:{fontSize:12},
					}));

					userProfile.add(Ti.UI.createLabel({
						right:5,
						top:5,
						html:'เมื่อ: '+data.reads[i].create,
						color:'black',
						font:{fontSize:12},
					}));
					userProfile.add(Ti.UI.createLabel({
						left:110,
						top:0,
						text:data.reads[i].user.online,
						color:'black',
						font:{fontSize:12},
					}));

					tbRow.add(userProfile);
					/*
					 * External image
					 */
					//alert(data.reads[i].extImage.length);return false;

					var detailView = Ti.UI.createView({
						top:0,

					});
					detailView.add(Ti.UI.createLabel({
						top:0,
						left:5,
						color:'#323D4F',
						font:{fontSize:15},	
						text:data.reads[i].detail,
						//borderWidth:2,
					}));

					tbRow.add(detailView);

					//tableData.push(tbRow);

					var imageGallery = [];
					if(data.reads[i].extImage){
						imageGallery = data.reads[i].extImage;
					}
					if(data.reads[i].gallery.length>0){
						imageGallery = data.reads[i].gallery;
					}
					if(imageGallery.length>0){
						var imageScrollView = Ti.UI.createScrollView({
							left:5,
							top:0,
							width:APP.width-10,
							height:250,
							borderWidth:1,
							borderColor:'red',
							contentWidth: 'auto',
							contentHeight: 250,
							//showVerticalScrollIndicator: true,
							//showHorizontalScrollIndicator: true,
							layout:'horizontal',
						});

						for(var k=0;k<imageGallery.length;k++){
							var imageView = Ti.UI.createImageView({
								top:0,
								left:0,
								width:APP.width,
								height:'auto',
								borderColor:'white',
								borderWidth:2,
								borderRadius:5,
								image:imageGallery[k],
								defaultImage:'/images/defaultImage.png',
							});
							imageScrollView.add(imageView);
						}
						tbRow.add(imageScrollView);
					}

					tableData.push(tbRow);
					//tableView.appendRow(tbRow);
				}
				//alert(tableData.length);
				tableView.setData(tableData);
				self.add(tableView);
				//table.setVisible(true);
				//loading.hide();
				//self.remove(loading);
				tracker.trackScreen(Ti.Platform.osname+"/"+forumid+"/"+data.id);
			}
	});

	self.addEventListener('itemSelected', function(e) {
		topicLabel.setText(e.topic);
		tableData = [];
		tableView.setData(tableData);
		//self.add(loading);
		//loading.show();
		self.add(tableView);
		self.remove(tableView);
		client.open('GET','http://srihawong.info/app/thaimtb_read.php?t='+e.id);
		client.send();
	});
	/*
	navBar.addEventListener('showInfo', function(e) {
		self.fireEvent('showInfo',{});
	});
	*/

	return self;
};

module.exports = DetailView;