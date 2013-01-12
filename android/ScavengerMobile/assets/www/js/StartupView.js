function startupView() {
	this.settings = new SettingsList();
	this.isFirstLoad = (this.settings.get('username') == null);
	
	if(this.isFirstLoad ) {
		this.render();
	} else {
		$( "#log" ).text("Welcome "+this.settings.get('username'));
		//$( "#log" ).popup( "open" );

		//$('#login').hide();
		$.mobile.changePage($('#give'));
		
	}
	
}

startupView.prototype.render = function () {	

	var startup = this;

    template = Hogan.compile($("#template-setting").html());
    $('#login-form').append(template.render(this.settings.fields));
    $('#login-form').append( 
	    $('<a/>').attr({
				  'href': '#',
				  'id': 'login-submit',
				  'data-role' : 'button'
				})
				.text('Login')
				.click( function () { startup.save() })
	);
    $.mobile.changePage($('#login'),{  role: 'dialog'});
    
}



	
startupView.prototype.save = function( ) {
	   var startupSettings = this.settings;
	   
	   SC.login ( { user: "dummy@email.com", password: "password" }, function (data) {
			 startupSettings.sync(
					 { 'username': $('#username').val(),
					    'access_token' : data.access_token	 
					 });
			 
			 $.mobile.changePage($('#give'));
			 alert("Setup complete: " + data);
		} );
	   
}
	
