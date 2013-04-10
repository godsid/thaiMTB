//Master View Component Constructor
function MasterView() {
	//create object instance, parasitic subclass of Observable
	var self = Ti.UI.createView({
		//backgroundColor:'white'
		backgroundColor:'#f7d5cf',
		layout:'vertical',
	});
	var NavBar = require('/ui/handheld/android/NavBar');
	var navBar = new NavBar();
	self.add(navBar);
	navBar.addEventListener('login',function(e){
		self.fireEvent('login',{
		});
	});
	
	
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
	//some dummy data for our table view
	var tableData = [];
	loading.show();
	var secondHandClient = Ti.Network.createHTTPClient({
		timeout:5000,
		onload:function(e){
			var secondHandData = JSON.parse(this.responseText);
			var secondHandDataHeader = secondHandData.header;
			secondHandData = secondHandData.secondhand;
			//alert(secondHandData);
			secondHandClient.open('GET','http://srihawong.info/app/thaimtb_secondhand.php?page='+(parseInt(secondHandDataHeader.page)+1));
			
			var footerTable = Ti.UI.createView({
				height:50
			});
			
			if(secondHandDataHeader.maxpage>1&&secondHandDataHeader.page<3){
				var nextButton = Ti.UI.createButton({
					top:5,
					right:5,
					title:'More...',
				});
				footerTable.add(nextButton);
				footerTable.addEventListener('click',function(e){
					secondHandClient.send();
				});
			}
			
			table.setFooterView(footerTable);
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
				table.appendRow(tbRow);
				
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
			/*var loadMore = Ti.UI.createTableViewRow({
				title:'Loading...',
				height:30,
			});
			table.appendRow(loadMore);
			*/
			var footer = Ti.UI.createView({
				left:0,top:0,
				height:200,
				width:'100%'
				
			});
			footer.add(Ti.UI.createButton({
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
			table.footerView = footer; 
			
			loading.hide();
			self.remove(loading);
			self.add(table);
		}
	});
	secondHandClient.open('GET','http://srihawong.info/app/thaimtb_secondhand.php');
	secondHandClient.send();
	
	//add behavior
	table.addEventListener('click', function(e) {
		self.fireEvent('itemSelected', {
			id:e.rowData.id,
			name:e.rowData.title,
			//price:e.rowData.price
		});
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