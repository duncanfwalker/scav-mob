function startupView() {
	this.settings = new SettingsList();
	this.isFirstLoad = (this.settings.get('identity') == null);
	
	if(this.isFirstLoad ) {
		this.render();
	} else {
		$( "#log" ).text("Welcome "+this.settings.get('identity'));
		//$( "#log" ).popup( "open" );

		//$('#login').hide();
		$.mobile.changePage($('#give'));
		
	}
	
}

startupView.prototype.render = function () {	
	var  data = { 'fields' : [
		{ 'tag' : 'input', 'type' : 'text', 'label' : 'Username/email', 'id' : 'identity' },
		{ 'tag' : 'input', 'type' : 'password', 'label' : 'Password', 'id' : 'password' },
		{ 'tag' : 'select', 'type' : 'checkbox', 'label' : 'Post to Facebook', 'id' : 'post-to-facebook', 'role': 'slider', 'options' :
			[{'option': 'No', 'value':'0'} ,{ 'option': 'Yes', 'value':'1' }] 
		}
	]};
	var startup = this;

    template = Hogan.compile($("#template-setting").html());
    $('#login-form').append(template.render(data));
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
	   $.post(BASE_URL+"/auth", { identity: "dummy@email.com", password: "password" },
	   function(data) {
		
		 $.mobile.changePage($('#give'));
		 startupSettings.sync({ 'identity': $('#identity').val() });
		 
		 alert("Setup complete: " + data);

	        
	    // $('#login').dialog('close');
	   });
}
	
