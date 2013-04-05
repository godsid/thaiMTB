//FirstView Component Constructor
function HomeView() {
	//create object instance, a parasitic subclass of Observable
	var self = Ti.UI.createView({
			top:0,
			width:Ti.Platform.displayCaps.platformWidth
		});
	var SecondHandModel = require('/model/SecondHandModel');
	var secondHandModel = new SecondHandModel(); 
	var Loading = require('/ui/common/Loading');
	var loading = new Loading();
	self.add(loading);
	loading.show();
	
	var tbView = Ti.UI.createTableView({
					top:0,
					//borderRadius:10,
					borderColor:'#b0b0b0',
					borderWidth:1,
		});
	
	/*
	 * Fetch Data
	 */
	secondHandModel.send();
	secondHandModel.onload = function(e){
		data = JSON.parse(this.responseText).seccondhand;
		for(var i=0,j=data.length; i<j; i++){
		  	var tbRow = Ti.UI.createTableViewRow({
				layout:'vertical',
				height:'auto',
				backgroundColor:(i%2)?'#A9B8C2':'#ECECEC',
				leftImage:'/images/common/shoppingIcon.png',
				borderWidth:1,
				borderColor:'#eff3f9',
				data:data[i]
			});
			
			var row1 = Ti.UI.createView({
				left:10,
				height:'auto',
				layout:'horizontal',
			});
			
			var row2 = Ti.UI.createView({
				left:10,
				height:'auto',
			
				layout:'vertical',
			});
			
			/*
			var lbGroup = Ti.UI.createLabel({
				text:data[i].group,
				font:setting.fontSmall,
				color:setting.colorSmall,
				left:5,
				top:0,
			});
			row1.add(lbGroup);
			tbRow.add(row1);
			*/
			
			var lbUser = Ti.UI.createLabel({
				text:'โดย: '+data[i].user,
				font:setting.fontSmall,
				color:setting.colorSmall,
				bottom:0,
				width:'auto',
				left:5,
				textAlige:'left'
			});
			var lbCreate = Ti.UI.createLabel({
				text:data[i].create,
				font:setting.fontSmall,
				color:setting.colorSmall,
				width:'auto',
				left:5,
				//top:16,
				textAlige:'right'
			});
			
			//row1.add(lbGroup);
			row1.add(lbCreate);
			row1.add(lbUser);
			
			var lbTitle = Ti.UI.createLabel({
				text:data[i].title,
				bottom:5,
				left:5,
				font:setting.fontNormalWeight,
				color:setting.colorNormal,
				wordWrap:true
			});
			
			row2.add(lbTitle);
			
			tbRow.add(row1);
			tbRow.add(row2);
			tbView.appendRow(tbRow);
		};
		
		
		
		loading.hide();
		self.remove(loading);
		self.add(tbView);
	};
	
	tbView.addEventListener('scroll',function(e){
		if(e.firstVisibleItem+e.visibleItemCount == e.totalItemCount ){
			secondHandModel.open('GET',setting.apiSecondHandUrl+'?page='+2);
			secondHandModel.send();
		}
	});
	tbView.addEventListener('click',function(e){
		var DetailWindow = require('/ui/common/DetailWindow');
		e.rowData.data.title='ประกาศขายมือสอง';
		var detailWindow = new DetailWindow(e.rowData.data);
		detailWindow.open();
	});
	
	return self;
}

module.exports = HomeView;
