function SettingsList() {
	this.settings = {};
	this.storage =  window.localStorage;
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














