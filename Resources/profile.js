var profile_win = Ti.UI.currentWindow;
var Cloud = require('ti.cloud');
Cloud.debug = true;

// Create a Label.
var userLabel = Ti.UI.createLabel({
	text: 'User',
	color: '#fff',
	font: {fontSize:20},
	height: 'auto',
	width: 'auto',
	top: 45,
	left: 10,
	textAlign: 'center'
});

// Add to the parent view.
profile_win.add(userLabel);


// Create a Label.
var passLabel = Ti.UI.createLabel({
	text: 'Pass',
	color: '#fff',
	font: {fontSize:20},
	height: 'auto',
	width: 'auto',
	top: 125,
	left: 10,
	textAlign: 'center'
});

// Add to the parent view.
profile_win.add(passLabel);
// ----------------
// profile form
// ----------------
  
// Create a TextField.
var userNameField = Ti.UI.createTextField({
    height : 35,
    top : 40,
    left : 80,
    width : 200,
    hintText : '',
    keyboardType : Ti.UI.KEYBOARD_DEFAULT,
    returnKeyType : Ti.UI.RETURNKEY_DEFAULT,
    borderStyle : Ti.UI.INPUT_BORDERSTYLE_ROUNDED
});

// Listen for return events.
userNameField.addEventListener('return', function(e) {
    userNameField.blur();
    //alert('Input was: ' + userNameField.value);
});

// Add to the parent view.
profile_win.add(userNameField);


// Create a TextField.
var passwordField = Ti.UI.createTextField({
    height: 35,
    top: 120,
    left: 80,
    width: 200,
    hintText: '',
    passwordMask: true,
    keyboardType: Ti.UI.KEYBOARD_DEFAULT,
    returnKeyType: Ti.UI.RETURNKEY_DEFAULT,
    borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED
});

// Listen for return events.
passwordField.addEventListener('return', function(e) {
    passwordField.blur();
    //alert('Input was: ' + passwordField.value);
});

// Add to the parent view.
profile_win.add(passwordField);

 // Create a Button.
var loginButton = Ti.UI.createButton({
    title: 'Login',
    top: 190,
    left: 110,
    width: 150
});

// Listen for click events.
loginButton.addEventListener('click', function() {
    //alert('\'loginButton\' was clicked!');
});

// Add to the parent view.
profile_win.add(loginButton);

var registerButton = Ti.UI.createButton({
	top: 250,
  left: 110,
  width: 150,	
  title:'Register'
});

profile_win.add(registerButton);

registerButton.addEventListener('click', function() {
	//containingTab attribute must be set by parent tab group on
	//the window for this work
	profile_win.containingTab.open(Ti.UI.createWindow({
		title: 'Register',
		backgroundColor: 'white',
		url: 'register.js'
	}));
});


 // Listen for click events.
loginButton.addEventListener('click', function() {
	//burr
	Cloud.Users.login ({
		login: userNameField.value,
		password: passwordField.value
	}, function (e) {
		if (e.success) {
			var user = e.users[0];
      alert('Welcome back:\n' +
            	user.username);
		} else {
			alert('Error:\n' +
            ((e.error && e.message) || JSON.stringify(e)));
		}
	});
});

  
  
  