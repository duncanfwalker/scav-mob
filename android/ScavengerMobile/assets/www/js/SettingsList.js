function SettingsList() {
	this.settings = {};
	this.storage =  window.localStorage;
	
	this.fields = { 'fields' : [
	                  		{ 'tag' : 'input', 'type' : 'text', 'label' : 'Username/email', 'id' : 'username' },
	                  		{ 'tag' : 'input', 'type' : 'password', 'label' : 'Password', 'id' : 'password' },
	                  		{ 'tag' : 'select', 'type' : 'checkbox', 'label' : 'Post to Facebook', 'id' : 'post-to-facebook', 'role': 'slider', 'options' :
	                  			[{'option': 'No', 'value':'0'} ,{ 'option': 'Yes', 'value':'1' }] 
	                  		}
	                  	]};
}

// for the fields passed, update the online draft item with the apps local item
SettingsList.prototype.sync = function(fields )
{
	var storage = this.storage; // to deal with the .each() scope taking the this keywork for the current item in loop
	$.each(fields, function(key, value) { 
		storage.setItem(key, value); 
	});
};

SettingsList.prototype.set = function(settings ) 
{	
	this.settings = settings;
}

SettingsList.prototype.get = function(fieldname ) 
{	
	return this.storage.getItem(fieldname);
}


SettingsList.prototype.renderControls = function () {
   template = Hogan.compile($("#template-setting").html());
   $('#settings-list').append(template.render(this.fields));
}

SettingsList.prototype.renderLabelList = function () {
   template = Hogan.compile($("#template-settings-list").html());
   var settings = this;
	
	var labels ="";
	$.each(this.fields.fields, function(i, e) { 
		e.value = settings.get(e.id);
	});
	console.log(JSON.stringify(this.fields.fields));
	
   $('#settings-menu').html(template.render(this.fields));
	/*alert(labels);*/
   
   $('#settings-menu').listview('refresh');
}














