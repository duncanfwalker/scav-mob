function SettingsList() {
	//var hogan = require("hogan.js");
	settingslist = this;
	this.settings = {};
	this.storage =  window.localStorage;
	
	this.items = { 'fields' : [
	                  		{ 'tag' : 'input', 'type' : 'text', 'placeholder' : 'Email address', 'id' : 'email','value' : 'duncfw@gmail.com'  },
	                  		{ 'tag' : 'input', 'type' : 'password', 'placeholder' : 'Password', 'id' : 'password','value' : 'Badger84'  },
	                  	/*	{ 'tag' : 'select', 'type' : 'checkbox', 'label' : 'Post to my Facebook wall', 'id' : 'post-to-facebook', 'role': 'slider', 'options' :
	                  			[{'option': 'No', 'value':'0'} ,{ 'option': 'Yes', 'value':'1' }] 
	                  		},*/
	                  		
	                  		{ 'tag' : 'input', 'type' : 'checkbox', 'label' : 'Post my offers to Facebook', 'id' : 'post-to-facebook' },	                  		
	                  		{ 'tag' : 'input', 'type' : 'checkbox', 'label' : 'Remember me', 'id' : 'remember-me','checked':'checked'}
	                  	]};
	
	

}
SettingsList.menuitems = { 'items' :[
    	                             { 'title':'Switch accounts',
    	                            	 'link':'#login',
    	                            	 'id':'username',
    	                            	 'summary': function() {
    	                            		 return function(value,render) {
    	                            			 return SettingsList.get(this.id) + "."
    	                            		 }
    	                            	 }
    	                             },
    	                             {'title':'Post to Facebook',
    	                            	 'description':'Increase chances of finding someone to take items by sharing. ',
    	                            	 'id':'fb-connect',
    	                            	  'value':'false'}

    	                             ]};


SettingsList.storage = window.localStorage;


// for the fields passed, update the online draft item with the apps local item
SettingsList.sync = function(fields )
{
	var storage = this.storage; // to deal with the .each() scope taking the this keywork for the current item in loop
	$.each(fields, function(key, value) { 
		storage.setItem(key, value); 
	});
};

SettingsList.set = function(settings ) 
{	
	this.settings = settings;
}

SettingsList.get = function(fieldname ) 
{	
	return  SettingsList.storage.getItem(fieldname);
}


SettingsList.prototype.renderControls = function () {
   template = Hogan.compile($("#template-setting").html());
   $('#settings-list').append(template.render(this.items));
}

SettingsList.renderLabelList = function () {

	$('#me-settings').remove();
	
   template = Hogan.compile($("#template-settings-list").html());
   var settings = this;
	
/*   try {
		var labels ="";
		$.each(this.menuitems, function(i, e) { 
			e.Description = settings.get(e.id);
		});
	   } catch () {}
	console.log(JSON.stringify(this.menuitems));/**/
   $('#settings-menu').html('');
   $('#settings-menu').append(template.render(SettingsList.menuitems)).trigger( "create" );
   
//  $.mobile.activePage.find('#settings-menu').append(template.render(SettingsList.menuitems));
   $('#settings-menu').popup('open');
	/*alert(labels); 
	 *   $('#settings-list').listview('refresh');
  $('#settings-list').trigger('create');
  $.mobile.initializePage();
	 *  */
   $.mobile.activePage.page();
	   $('#settings-list').listview();

}














