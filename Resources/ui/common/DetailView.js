function DetailView() {
	var self = Ti.UI.createView({
		backgroundColor:'#f7d5cf',
		layout:'vertical',
	});
	var tableData = [];
	var NavBar = require('/ui/handheld/android/NavBar');
	var navBar = new NavBar();
	self.add(navBar);
	/*
	 * Topic
	 */
	var topicLabel = Ti.UI.createLabel({
		top:0,
		width:'100%',
		textAlign:'left',
		text:'',
		backgroundColor:'#006699',
		font:{fontSize:25},
		color:'#FFA34F',
	});
	self.add(topicLabel);
	
	var loading = Ti.UI.createActivityIndicator({
			message: ' Loading...',
			top:'50%',
			color:'black',
			//height:Ti.UI.SIZE,
			//width:Ti.UI.SIZE
	})
	
	var table = Ti.UI.createTableView({
		separatorColor:'#eff3f9',
	});
	
	
	var client = Ti.Network.createHTTPClient({
			timeout:15000,
			onerror:function(e){
				Ti.API.debug(e.error);
				alert('เกิดความผิดพลาดกรุณาลองใหม่อีกครั้ง');
			},
			onload:function(e){
				data = JSON.parse(this.responseText);
				
				//header = data.header;
				//detail = data.reads;
				
				if(data.reads.length==0){
					loading.hide();
					self.remove(loading);
					alert("Missing Data");
				}
				
				
				
				for(var i=0,j=data.reads.length; i<j; i++){
					var tbRow = Ti.UI.createTableViewRow({
						height:'auto',
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
						//borderColor:'red',
					});
					
					userProfile.add(Ti.UI.createImageView({
						top:5,
						left:5,
						width:100,
						height:'auto',
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
						
					}));
					
					userProfile.add(Ti.UI.createLabel({
						right:5,
						top:5,
						html:'เมื่อ: '+data.reads[i].create,
						color:'black',
					}));
					userProfile.add(Ti.UI.createLabel({
						left:110,
						top:0,
						text:data.reads[i].user.online,
						color:'black',
					}));
					
					tbRow.add(userProfile);
					if(data.reads[i].extImage){
						data.reads[i].detail = data.reads[i].detail.split("[images]");
						for(var k=0,l=data.reads[i].detail.length;k<l;k++){
							tbRow.add(Ti.UI.createLabel({
								top:0,
								left:5,
								color:'#323D4F',
								font:{fontSize:20},	
								html:data.reads[i].detail[k],
								borderWidth:2,
							}));
							var imageGallery = Ti.UI.createImageView({
								top:5,
								width:Ti.Platform.displayCaps.platformWidth-4,
								height:'auto',
								borderColor:'white',
								borderWidth:2,
								borderRadius:5,
								//defaultImage:'/images/imageLoading1.gif',
								image:"http://srihawong.info/app/thaimtb_image.php?file="+data.reads[i].extImage[k],
							});

							tbRow.add(imageGallery);
						}
					}else{
						tbRow.add(Ti.UI.createLabel({
							top:10,
							left:5,
							color:'#323D4F',
							font:{fontSize:20},	
							html:data.reads[i].detail,
							borderWidth:2,
							backgroundPaddingLeft:5,
							//autoLink:true,
						}));
					}
					if(data.reads[i].gallery.length>0){
						for(var k=0,l=data.reads[i].gallery.length; k<l; k++){
							var imageGallery = Ti.UI.createImageView({
								top:10,
								width:Ti.Platform.displayCaps.platformWidth-4,
								height:300,
								borderColor:'white',
								borderWidth:2,
								borderRadius:5,
								//backgroundImage:'/images/imageLoading.gif',
								//defaultImage:'/images/imageLoading.gif',
								image:data.reads[i].gallery[k],
								
							});
							imageGallery.addEventListener('load',function(e){
								//alert(e);
								this.setHeight('auto');
							});
							tbRow.add(imageGallery);
						};
					}
					tableData.push(tbRow);
					//table.appendRow(tbRow);
				}
				table.setData(tableData);
				
				self.add(table);
				loading.hide();
				self.remove(loading);
				tracker.trackScreen(Ti.Platform.osname+"/"+forumid+"/"+data.id);
			}
	});
	
	self.addEventListener('itemSelected', function(e) {
		
		topicLabel.setText(e.topic);
		self.add(loading);
		loading.show();
		tableData = [];
		table.setData(tableData);
		client.open('GET','srihawong.info/app/thaimtb_read.php?t='+e.id);
		client.send();
	});
	navBar.addEventListener('showInfo', function(e) {
		self.fireEvent('showInfo',{});
	});
	
	return self;
};

module.exports = DetailView;
