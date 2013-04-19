//Master View Component Constructor
function MasterView() {
	//create object instance, parasitic subclass of Observable
	var self = Ti.UI.createView({
		//backgroundColor:'white'
		backgroundColor:'#f7d5cf',
		layout:'vertical',
	});
	var tableData = [];
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
		separatorColor:'#eff3f9',
	});
	
	var footerTable = Ti.UI.createView({
		height:50
	});
	var nextButton = Ti.UI.createButton({
		top:0,
		right:5,
		title:'More...',
		enabled:false,
	});
	footerTable.add(nextButton);
	//some dummy data for our table view
	
	loading.show();
	var secondHandClient = Ti.Network.createHTTPClient({
		timeout:15000,
		onerror:function(e){
			Ti.API.debug(e.error);
			alert('เกิดความผิดพลาดกรุณาลองใหม่อีกครั้ง');
		},
		onload:function(e){
			//var tableData = [];
			var secondHandData = JSON.parse(this.responseText);
			var secondHandDataHeader = secondHandData.header;
			secondHandData = secondHandData.secondhand;
			secondHandClient.open('GET','http://srihawong.info/app/thaimtb_'+forumid+'.php?page='+(parseInt(secondHandDataHeader.page)+1));
			
			if(secondHandDataHeader.maxpage<=1||secondHandDataHeader.page>=secondHandDataHeader.maxpage){
				nextButton.removeEventListener('click');
				nextButton.setTitle('More...');
				nextButton.setEnabled(false);
			}else{
				nextButton.setTitle('More...');
				nextButton.setEnabled(true);	
			}
			
			for(var i=0,j=tableData.title = secondHandData.length; i<j; i++){
				var tbRow = Ti.UI.createTableViewRow({
					height:'auto',
					leftImage:'/images/shoppingIcon.png',
					//color:'#006699',
					font:{fontSize:20,fontWeight:'bold'},
					//borderWidth:1,
					//borderColor:'#eff3f9',
					backgroundColor:secondHandData[i].sticky==true?'#F2B179':((i%2)?'#A9B8C2':'#ECECEC'),
					id:secondHandData[i].id,
					//hasChild:true,
					title:secondHandData[i].title,
					layout:'vertical',
					hasChild:(secondHandData[i].reply>0?true:false),
				});
				
				
				var lbTitle = Ti.UI.createLabel({
					//text:secondHandData[i].title,
					bottom:5,
					left:5,
					font:{fontSize:20,fontWeight:'bold'},
					color:'#006699',
					wordWrap:true,
					//html:secondHandData[i].title+" ("+secondHandData[i].reply+"/"+secondHandData[i].read+")",
					text:secondHandData[i].title+" ("+secondHandData[i].reply+"/"+secondHandData[i].read+")",
					
				});
				tbRow.add(lbTitle);
				tableData.push(tbRow);
				//table.appendRow(tbRow);
				
			  /*
			  tableData.push({
			  		height:'auto',
			  		title:secondHandData[i].title,
			  		leftImage:'/android/images/shoppingIcon.png',
			  		color:'#006699',
			  		font:{fontSize:20,fontWeight:'bold'},
			  		borderWidth:1,
					borderColor:'#eff3f9',
					backgroundColor:(i%2)?'#A9B8C2':'#ECECEC',
					
			  		id:secondHandData[i].id,
			  		hasChild:true
			  }); */
			};
			table.setData(tableData);
			/*var loadMore = Ti.UI.createTableViewRow({
				title:'Loading...',
				height:30,
			});
			table.appendRow(loadMore);
			*/
			//nextButton.title='More...';
			//nextButton.enabled = true;
			
			
			loading.hide();
			self.remove(loading);
			self.add(table);
			tracker.trackScreen(Ti.Platform.osname+"_"+forumid);
		}
	});
	table.setFooterView(footerTable);
	/*
	var footer = Ti.UI.createView({
		left:0,top:0,
		height:200,
		width:'100%'
		
	});*/
	/*footer.add(Ti.UI.createButton({
		left:0,
		width:100,
		height:50,
		title:'Back',
	}));
	footer.add(Ti.UI.createButton({
		right:0,
		width:100,
		height:50,
		title:'Next',
	}));
	*/
	//table.footerView = footer; 
	
	secondHandClient.open('GET','http://srihawong.info/app/thaimtb_'+forumid+'.php');
	secondHandClient.send();
	table.addEventListener('click', function(e) {
		self.fireEvent('itemSelected', {
			id:e.rowData.id,
			name:e.rowData.title,
			//price:e.rowData.price
		});
	});
	nextButton.addEventListener('click',function(e){
		this.title = 'Loading...';
		this.enabled = false;
		secondHandClient.send();
	});
	//add behavior
	navBar.addEventListener('login',function(e){
		self.fireEvent('login',{
		});
	});
	navBar.addEventListener('changeBoard',function(e){
		tableData = [];
		table.scrollToIndex(0);
		secondHandClient.open('GET','http://srihawong.info/app/thaimtb_'+forumid+'.php');
		secondHandClient.send();
	});
	//table.addEventListener('scroll',function(e){
		//if(e.firstVisibleItem+e.visibleItemCount == e.totalItemCount ){
		//	secondHandClient.open('GET','http://srihawong.info/app/thaimtb_secondhand.php?page='+2);
		//	secondHandClient.send();
		//}
		
		//secondHandClient.open('GET','http://srihawong.info/app/thaimtb_secondhand.php?page='+2);
		//secondHandClient.send();
	//});
	return self;
};

module.exports = MasterView;