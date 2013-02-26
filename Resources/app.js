var Cloud = require('ti.cloud');
Cloud.debug = true;

var tabGroup = Ti.UI.createTabGroup({
	title : 'Itexico'
});

//create app tabs
var pictures_win = Ti.UI.createWindow({
	title : 'Pictures',
	url : 'pictures.js'
})

var profile_win = Ti.UI.createWindow({
	title : 'Profile',
	url : 'profile.js'
})

var pictures_tab = Ti.UI.createTab({
	title : 'Pictures',
	window : pictures_win
});

pictures_win.containingTab = pictures_tab;

var profile_tab = Ti.UI.createTab({
	title : 'Profile',
	backgroundColor : 'white',
	window : profile_win
});

profile_win.containingTab = profile_tab;

// añadir tabs
pictures_tab.touchEnabled = false;

tabGroup.addTab(pictures_tab);
tabGroup.addTab(profile_tab);

Cloud.Users.showMe(function(e) {
	if (e.success) {
		var user = e.users[0];
		pictures_tab.touchEnabled = true;
		tabGroup.setActiveTab(0);
	} else {
		tabGroup.setActiveTab(1);
	}
});

tabGroup.open();
