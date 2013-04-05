/**
 * @author Banpot.S
 */

function Setting(){
	self = {
		
		osname:Ti.Platform.osname,
		
		appBackgroundColor:'#f7d5cf',
		fontHead:{fontSize:20,font:'Arial, Helvetica, sans-serif'},
		fontNormal:{fontSize:16,font:'Arial, Helvetica, sans-serif'},
		fontNormalWeight:{fontSize:18,fontWeight:'bold',font:'Arial, Helvetica, sans-serif'},
		fontSmall:{fontSize:14,font:'Arial, Helvetica, sans-serif'},
		fontHeader:{fontSize:30,font:'Arial, Helvetica, sans-serif'},
		colorSmall:'#000000',
		colorNormal: '#006699',
		colorDetail:'#323D4F',
		
		apiSecondHandUrl:'http://srihawong.info/app/thaimtb_secondhand.php',
		apiTopicUrl:'http://srihawong.info/app/thaimtb_read.php?t={t}'
	};
	
	return self;
}
module.exports = Setting;

