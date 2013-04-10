function DetailView() {
	var self = Ti.UI.createView({
		backgroundColor:'#f7d5cf',
		layout:'vertical',
	});
	var NavBar = require('/ui/handheld/android/NavBar');
	var navBar = new NavBar();
	self.add(navBar);
	
	var loading = Ti.UI.createActivityIndicator({
			message: ' Loading...',
			top:'50%',
			color:'black',
			//height:Ti.UI.SIZE,
			//width:Ti.UI.SIZE
	})
	self.add(loading);
	var table = Ti.UI.createTableView({
		
	});
	loading.show();
	
	var client = Ti.Network.createHTTPClient({
			timeout:5000,
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
						borderWidth:2,
						//borderColor:'#323D4F'
					});
					var userProfile = Ti.UI.createView({
						top:0,
						left:0,
						backgroundColor:'#F9CC79',
						borderWidth:2,
						borderColor:'red',
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
					tbRow.add(Ti.UI.createLabel({
						top:0,
						left:5,
						color:'#323D4F',
						font:{fontSize:20},	
						//html:"<img src='http://banpot.srihawong.info/wp-content/uploads/2013/03/MotorSHow2013-150x150.jpg'/>",
						//html:"<html><head><meta http-equiv=\"content-type\" content=\"text/html; charset=UTF-8\" /></head><body style=\"margin:0;padding:0;\">"+data.reads[i].detail+"</body></html>",
						html:data.reads[i].detail,
						borderWidth:2,
					}));
					if(data.reads[i].gallery.length){
						//alert(data.reads[i].gallery[0]);
						var imageGallery = Ti.UI.createImageView({
							height:300,
							width:300,
							borderColor:'red',
							borderWidth:2,
							image:"http://www.nationalgeographic.com/adventure/images/0611/adventure-travel/thailand.jpg?id=3206112",
							
							//image:"http://srihawong.info/app/thaimtb_image.php?id=3206112",
							
							//defaultImage:'/images/defaultAvatar.png',
							//images:data.read[i].gallery,
						});
						//for(var k=0,l=data.read[i].gallery.length; k<l; k++){
						//  data.read[i].gallery[k];
						//};
						tbRow.add(imageGallery);
					}
					/*
					tbRow.add(Ti.UI.createLabel({
						top:0,
						left:10,
						//width:100,
						height:'auto',
						color:'#323D4F',
						font:{fontSize:20},
						html:data.reads[i].detail,
						borderWidth:2
					}));
					*/
					table.appendRow(tbRow);
				}
				
				
				self.add(table);
				loading.hide();
				self.remove(loading);
				
			}
	});
	
	//self.add(lbl);
	
	self.addEventListener('itemSelected', function(e) {
		//lbl.text = e.name+': $'+e.id;
		client.open('GET','srihawong.info/app/thaimtb_read.php?t='+e.id);
		client.send();
	});
	
	return self;
};

module.exports = DetailView;
