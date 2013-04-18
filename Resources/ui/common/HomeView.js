//HomeView Component Constructor
function HomeView() {
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
	var dataClient = Ti.Network.createHTTPClient({
		timeout:5000,
		onload:function(e){
			
			var contentData = JSON.parse(this.responseText);
			var contentDataHeader = contentData.header;
			contentData = contentData.data;
			//alert(secondHandData);
			dataClient.open('GET','http://srihawong.info/app/thaimtb_secondhand.php?page='+(parseInt(secondHandDataHeader.page)+1));
			
			var footerTable = Ti.UI.createView({
				height:50
			});
			
			if(contentDataHeader.maxpage>1&&contentDataHeader.page<3){
				var nextButton = Ti.UI.createButton({
					top:5,
					right:5,
					title:'More...',
				});
				footerTable.add(nextButton);
				footerTable.addEventListener('click',function(e){
					dataClient.send();
				});
			}
			
			table.setFooterView(footerTable);
			for(var i=0,j=tableData.title = contentData.length; i<j; i++){
				var tbRow = Ti.UI.createTableViewRow({
					height:'auto',
					leftImage:'/images/shoppingIcon.png',
					//color:'#006699',
					font:{fontSize:20,fontWeight:'bold'},
					//borderWidth:1,
					//borderColor:'#eff3f9',
					backgroundColor:contentData[i].sticky==true?'#F2B179':((i%2)?'#A9B8C2':'#ECECEC'),
					id:contentData[i].id,
					//hasChild:true,
					title:contentData[i].title,
					layout:'vertical',
					hasChild:(contentData[i].reply>0?true:false),
				});
				
				
				var lbTitle = Ti.UI.createLabel({
					//text:secondHandData[i].title,
					bottom:5,
					left:5,
					font:{fontSize:20,fontWeight:'bold'},
					color:'#006699',
					wordWrap:true,
					//html:secondHandData[i].title+" ("+secondHandData[i].reply+"/"+secondHandData[i].read+")",
					text:contentData[i].title+" ("+contentData[i].reply+"/"+contentData[i].read+")",
					
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
	dataClient.open('GET','http://srihawong.info/app/thaimtb_news.php');
	dataClient.send();
	
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

module.exports = HomeView;