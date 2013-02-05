function startupView() {
	this.settings = new SettingsList();
	this.isFirstLoad = (SettingsList.get('username') ==null || (navigator.userAgent.toLowerCase().indexOf('chrome') > -1)); // == null
	
	if(this.isFirstLoad) {
		this.render();
	} else {
		//alert("Hi "+SettingsList.get('username'));
		$.mobile.changePage($('#give'));	
	}
	
}

startupView.prototype.render = function () {	

	var startup = this;

    template = Hogan.compile($("#template-startup").html());
    $('#login-form').submit( function (e) { 
    							e.preventDefault();
    							startup.save(); 
    							return false;});
    $('#login-form').append(template.render(this.settings.items));
    $('#login-form').append( 
	    $('<input/>').attr({
				 // 'href': '#',
				  'id': 'login-submit',
				  'value': 'Login',
				  'type': 'submit',
				  'data-role' : 'button'
				})				
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
	   SC.login ( { email: $('#email').val(), password: $('#password').val() }, function (jqXHR, textStatus, errorThrown ) {
		  
		   
		   if (jqXHR.status == 'success') {
			   
			   SettingsList.sync (
						 { 'username': $('#email').val(),
						    'access_token': jqXHR.access_token	 
							 
						 });
			   alert("Thanks, you're logged in");
				 $.mobile.changePage($('#give'));   
		   } else {
			   alert('Failed to login. Check your username and password.');
		   }
			// alert("Setup complete: " + JSON.stringify(jqXHR));
		} );
	   
}
	
