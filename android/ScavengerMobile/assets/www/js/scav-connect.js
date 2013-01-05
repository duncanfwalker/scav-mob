

$(document).ready(function() {

	
	var startup = new startupView();
	
	
//$( "#login" ).popup( "open" );
	});


var SC = new Object();
window.onload= function()
{
	SC.access_token = "1274brad1274brad1274brad1274brad";
	SC.BASE_URL = "http://dev.scavenger.org.uk/api";
};

SC.init = function()
{




};

SC.login = function()
{




};


SC.api = function(method,params,callback,file)
{
	try {	
		var debug  = true;
		params['access_token'] = this.access_token;
	
		if (debug) console.log( "API params:"+ JSON.stringify(params) ); 
	
	
		if (file) {
			var options = new FileUploadOptions();
			options.fileKey="file";
			options.fileName=file.substr(file.lastIndexOf('/')+1)+".jpg";
			options.mimeType="image/jpeg";
			options.params = params;
	
			var ft = new FileTransfer();
			ft.upload(file, encodeURI(this.BASE_URL+method),
					function (data) { var response = jQuery.parseJSON(data.response);
									  console.log("API response: "+  JSON.stringify(response) );
									  callback(response)}, 
					function (data) { callback(jQuery.parseJSON(data))}, 
					options);
		} else {
			$.post(  BASE_URL+method, 
					params,
					callback,
					"json"
			);
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





