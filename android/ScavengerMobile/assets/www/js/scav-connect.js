

$(document).ready(function() {

	
	var startup = new startupView();
	
	
//$( "#login" ).popup( "open" );
});


var SC = new Object();

SC.access_token = "1274brad1274brad1274brad1274brad";
SC.BASE_URL = "http://dev.scavenger.org.uk/api";


SC.init = function()
{




};

SC.login = function(params,callback)
{
	$.ajax({
		  data : params,
		  url: this.BASE_URL+"/auth"
		//  always:
		})
		//.always( callback ( jqXHR, textStatus, errorThrown ) );
		.always(function(jqXHR, textStatus, errorThrown) {
			callback ( jqXHR, textStatus, errorThrown )
		});	
	
  // $.post(this.BASE_URL+"/auth", params)
 //  	.complete( callback(data) );
};


SC.api = function(uri,request_params,settings,callback,file)
{
	request_params = typeof request_params !== 'undefined' ? request_params : {};
	try {	
		var debug  = true;
		request_params['access_token'] = this.access_token;
	
		if (debug) console.log( "API params:"+ JSON.stringify(request_params) ); 
	
	
		if (file) {
			var options = new FileUploadOptions();
			options.fileKey="file";
			options.fileName=file.substr(file.lastIndexOf('/')+1)+".jpg";
			options.mimeType="image/jpeg";
			options.params = request_params;
	
			var ft = new FileTransfer();
			ft.upload(file, encodeURI(this.BASE_URL+uri),
					function (data) { var response = jQuery.parseJSON(data.response);
									  console.log("API response: "+  JSON.stringify(response) );
									  callback(response)}, 
					function (data) { callback(jQuery.parseJSON(data))}, 
					options);
		} else {
			console.log(settings.type+" / "+this.BASE_URL+uri+" / "+JSON.stringify(request_params));
			
			$.ajax({
				  type: settings.type,
				  url: this.BASE_URL+uri,
				  data: request_params
				  
				}).done( function (rsp) {
						  console.log("API response: ");//+  JSON.stringify(rsp) );
						  callback(jQuery.parseJSON(rsp));
					});
		}
		
		
		
		

	} catch (e) {
		console.log("Scavenger API error:" +e); 
	}   
	
	/*	ft.onprogress = function(progressEvent) {
		if (progressEvent.lengthComputable) {
			$("#progress-bar").width ( Math.floor(progressEvent.loaded / progressEvent.total) + "%"); 
			console.log("WIDTH:" + (progressEvent.loaded / progressEvent.total) + "%");
		}
	};*/
};





  /*  


$('#results-list').append($('<li/>', { //build a li element
    html: jQuery('<a/>', { //with a A element inside it
            href: items[index].datafile, //set the href for the link
            text: '<img class"ui-li-icon" src="'
            	   +items[index].datafile.substring(0, items[index].datafile.length - 4)
            	   +'_thumb.jpg" />'
            	   +'<h3 class="ui-li-heading">'
            	   +items[index].keywords+ '</h3>'
          })
})); 
   
   
  $('#results-list').append($('<li>')
                        .append($('<a>')
                          .attr({ 'href' : items[index].datafile , 'data-rel' : 'dialog'    }   )
                          ).append('<img class"ui-li-icon" src="'+items[index].datafile.substring(0, items[index].datafile.length - 4)+'_thumb.jpg" />')
                           .append('<h3 class="ui-li-heading">'+items[index].keywords+ '</h3>')                 
      );
     // $('#results-list').append('<br />');
     */





