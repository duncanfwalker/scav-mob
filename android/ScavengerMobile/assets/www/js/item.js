function Item() {
	//this.item_id    ="406";
	this.item_id    ="";
	//update_params = {};
	this.title      ="";
	this.image_local_uri ="";
	//this.response ="";
	this.image_remote_uri ="";
}
Item.prototype.online = function(fields )
{
	return (this.item_id!=""); 
}


// for the fields passed, update the online draft item with the apps local item
Item.prototype.sync = function(fields )
{
	var item = this;  
	var update_params = {};
	if (fields != null) {
		fields.each(function(i,element) {
			update_params[element.id] = element.value;
		});
	} else {
		update_params = $('#give-item').serializeArray();
	}

	if (this.item_id!="") {  
		update_params['item_id'] = this.item_id;
	} 
	
	if(update_params['title']) {  
		this.title = update_params['title'];
	} 
	

	SC.api("/item/item_put",update_params, function(data) {

		console.log("Data response string: "+  JSON.stringify(data) ); 
	
		item.item_id = data.result.item_id;
	
		if (item.image_local_uri) {	
			showThumb(item.image_local_uri);
			item.image_remote_uri = data.result.image.uri;
		}
		console.log("THIS item after response: "+  JSON.stringify(item) ); 
	},  item.image_local_uri  );  
};


Item.prototype.publish = function( )
{
	var update_params = {};
	if (!this.online()) {  
		this.sync();
	} 
	update_params['item_id'] = this.item_id;
	
	SC.api("/item/item_publish",update_params, function (data) {
		console.log("DONE");
	} );
	
	
	
	
    var params = {
    	   	method: 'feed',
    	   		  //   method: 'stream.publish',
    	  name: this.title,
    	  message :  "FREE: "+ this.title,
    	  link: this.image_remote_uri,
    	  picture: this.image_remote_uri,
    	  caption:  "Offered for free on scavenger.org.uk",
    	  description: "I'm giving this away. Want it? Let me know. Or if you think you might know someone who wants this please share."		  
    	};   
        
         FB.api('me/feed', 'post', params, function(response) {
          if (!response || response.error) {W
            	alert('Sorry, there was a problem posting to Facebook. Check you are logged in.');
            } else {
            	alert('Post ID: ' + response.id);
        	}
            console.log("item feed: ");
            console.log("PARAMS: "+JSON.stringify(params));
            console.log("RESPONSE: "+JSON.stringify(response));
        }); 
 /*	       */

}




