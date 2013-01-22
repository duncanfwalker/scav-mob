function startupView() {
	this.settings = new SettingsList();
	this.isFirstLoad = (SettingsList.get('username') == null && !(navigator.userAgent.toLowerCase().indexOf('chrome') > -1));
	
	if(this.isFirstLoad ) {
		this.render();
	} else {
		//alert("Hi "+SettingsList.get('username'));
		$.mobile.changePage($('#give'));	
	}
	
}

startupView.prototype.render = function () {	

	var startup = this;

    template = Hogan.compile($("#template-startup").html());
    $('#login-form').append(template.render(this.settings.items));
    $('#login-form').append( 
	    $('<a/>').attr({
				  'href': '#',
				  'id': 'login-submit',
				  'data-role' : 'button'
				})
				.text('Login')
				.click( function () { startup.save() })
	);
    $("#post-to-facebook").click(function() {
	   	 FB.login(function () {
	    	 FB.api('/me', function(response) {
			     console.log('me ' + JSON.stringify(response) + '.');
			 });
		 }, {scope: 'email,read_friendlists,publish_stream'}); 
	}); // click	
    $.mobile.changePage($('#login'));   
}



	
startupView.prototype.save = function( ) {   
	   SC.login ( { user: "dummy@email.com", password: "password" }, function (jqXHR, textStatus, errorThrown ) {
		   SettingsList.sync (
					 { 'username': $('#username').val(),
					    'access_token' : jqXHR.access_token	 
					 });
			 
			 $.mobile.changePage($('#give'));
			// alert("Setup complete: " + JSON.stringify(jqXHR));
		} );
	   
}
	
