function Offer() {
	//this.item_id    ="406";
	this.item_id    ="";
	//update_params = {};
	this.title      ="";
	this.image_local_uri ="";
	//this.response ="";
	this.image_remote_uri ="";
}
Offer.prototype.online = function(fields )
{
	return (this.item_id!=""); 
}


// for the fields passed, update the online draft offer with the apps local offer
Offer.prototype.sync = function(fields )
{
	var offer = this;  
	var update_params = {};
	if (fields != null) {
		fields.each(function(i,element) {
			update_params[element.id] = element.value;
		});
	} else {
		update_params = $('#give-offer').serializeArray();
	}

	if (this.item_id!="") {  
		update_params['item_id'] = this.item_id;
	} 
	
	if(update_params['title']) {  
		this.title = update_params['title'];
	} 
	
	
	var settings = new SettingsList();
	update_params['username'] = settings.get('username');
	settings = null;

	SC.api("/offer/offer_put",update_params,{'type' : 'post'}, function(data) {

		console.log("Data response string: "+  JSON.stringify(data) ); 
	
		offer.item_id = data.result.item_id;
	
		if (offer.image_local_uri) {	
			showThumb(offer.image_local_uri);
			offer.image_remote_uri = data.result.image.uri;
		}
		console.log("THIS offer after response: "+  JSON.stringify(offer) ); 
	},  offer.image_local_uri  );  
};


Offer.prototype.publish = function( )
{
	var update_params = {};
	if (!this.online()) {  
		this.sync();
	} 
	update_params['item_id'] = this.item_id;
	
	SC.api("/offer/offer_publish",update_params,{'type' : 'post'}, function (data) {
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
        
	    FB.api(
			'me/feed','post',params, function(response) {
				if (!response || response.error) {
					alert('Sorry, there was a problem posting to Facebook. Check you are logged in.');
				} else {
					alert('Post ID: ' + response.id);
				}
				console.log("offer feed: ");
				console.log("PARAMS: " + JSON.stringify(params));
				console.log("RESPONSE: " + JSON.stringify(response));
			}); 
 /*	       */

}




