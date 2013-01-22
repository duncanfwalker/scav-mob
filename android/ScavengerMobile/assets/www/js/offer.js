$(function() {

	function Offer() {
		this.item_id = "";
		// update_params = {};
		this.title = "";
		this.image_local_uri = "";
		this.image_remote_uri = "";
	}
	Offer.prototype.online = function(fields) {
		return (this.item_id != "");
	}

	// for the fields passed, update the online draft offer with the apps local
	// offer
	Offer.prototype.sync = function(fields) {
		var offer = this;
		var update_params = {};
		
		if (fields != null) {
			fields.each(function(i, element) {
				update_params[element.id] = element.value;
				if (element.id == 'image-src') {
					offer.image_local_uri = element.value;
				}
			});
		} else {
			update_params = $('#give-offer').serializeArray();
		}

		if (this.item_id != "") {
			update_params['item_id'] = this.item_id;
		}

		if (update_params['title']) {
			this.title = update_params['title'];
		}

		var settings = new SettingsList();
		update_params['username'] = SettingsList.get('username');
		settings = null;

		SC.api("/offer/offer_put", update_params, {
			'type' : 'post'
		}, function(data) {

			console.log("Data response string: " + JSON.stringify(data));

			offer.item_id = data.result.item_id;

			if (offer.image_local_uri) {
					offer.image_remote_uri = data.result.image.uri;
			}
			console.log("THIS offer after response: " + JSON.stringify(offer));
		}, offer.image_local_uri);
	};

	Offer.prototype.publish = function() {
		var update_params = {};
		if (!this.online()) {
			this.sync();
		}
		update_params['item_id'] = this.item_id;

		SC.api("/offer/offer_publish", update_params, {
			'type' : 'post'
		}, function(data) {
			console.log("DONE");
		});

		var params = {
			method : 'feed',
			// method: 'stream.publish',
			name : this.title,
			message : "FREE: " + this.title,
			link : this.image_remote_uri,
			picture : this.image_remote_uri,
			caption : "Offered for free on scavenger.org.uk",
			description : "I'm giving this away. Want it? Let me know. Or if you think you might know someone who wants this please share."
		};

		FB.api(
						'me/feed',
						'post',
						params,
						function(response) {
							if (!response || response.error) {
								alert('Sorry, there was a problem posting to Facebook. Check you are logged in.');
							} else {
								alert('Post ID: ' + response.id);
							}
							console.log("offer feed: ");
							console.log("PARAMS: " + JSON.stringify(params));
							console
									.log("RESPONSE: "
											+ JSON.stringify(response));
						});
		/*	       */

	}

	
/************ Offer Form View ****************
 * 
 */	
	
	
	function OfferFormView() {
		this.initialise();
		var self = this;

		$("#make-offer").click(function(event) {
			event.preventDefault();
			self.offer.publish();

			alert("Thanks for offering!");
			self.initialise();
		}); // click

		$('#give-offer input, #give-offer textarea').change(function(event) {
			self.sync(event);
		});
		$('#photo-clear').click(this.clearThumb()); // click

		$("#photo-get-new").click(function(event) {
			navigator.camera.getPicture(function(imageURI) {
				self.changeThumb(imageURI);
			}, function() {
			}, {
				quality : 50,
				targetWidth : 400,
				targetHeight : 400,
				destinationType : Camera.DestinationType.FILE_URI
			}); // getpicture
		}); // click

		$("#photo-get-existing").click(function(event) {
			navigator.camera.getPicture(function(imageURI) {
				self.changeThumb(imageURI);
			}, function() {
			}, {
				quality : 50,
				destinationType : Camera.DestinationType.FILE_URI,
				sourceType : Camera.PictureSourceType.PHOTOLIBRARY  
			}); // get picture
		}); // click
	}

	OfferFormView.prototype.changeThumb = function(imageURI) {
		$('#image-src').val(imageURI);
		$('#image-src').trigger('change');
		this.showThumb(imageURI);
	}

	OfferFormView.prototype.sync = function(event) {
		this.offer.sync($(event.target));
	}

	OfferFormView.prototype.initialise = function() {
		$('#give-offer')[0].reset();
		this.offer = new Offer();
		this.clearThumb();
	}

	OfferFormView.prototype.clearThumb = function() {

		$('#smallImage').css("display", "none");
		$('.image-placeholder').show();
		$('#image-chooser').show();
		$('#image-editor').hide();
		$('#new-offer-image-preview').width('29%');
		$('#smallImage').attr("src", "");
	}

	OfferFormView.prototype.showThumb = function(imageURI) {
		$('#smallImage').css("display", "block");
		$('.image-placeholder').hide();
		$('#image-chooser').hide();
		$('#image-editor').show();
		$('#new-offer-image-preview').width('100%');
		$('#smallImage').attr("src", imageURI);
	}
	
/************ Offer List View ****************
 * 
 */		
	function OfferListView() {
		var self =this;
		$('#me').on('pageshow', function (event, ui) {
			  $.mobile.loading('show',{
			  	text: 'Loading...',
			  	textVisible: true,
			  	theme: 'b',
			  });
			  $.ajaxSetup({ cache: false });
			  
			  SC.api("/offer/offers_list",{username: SettingsList.get('username')},{'type':'GET'},
					  function(offers) {
				  		self.offer_list = offers;
				  		self.renderItems();
  			});
		}); // show
		
		
	}
	
	OfferListView.prototype.renderItems = function() {
        $('#me .offer-list').html('');
		console.log(JSON.stringify(this.offer_list));
		
	   var template = Hogan.compile($("#template-offer-list").html());
	   $('#me .offer-list').append(template.render(this.offer_list));	
		
        $('#me .offer-list').listview('refresh');
	//	$('div[id^="offer-"]').empty();
		
 /*       $(document).on( "pagebeforechange", function( e, data ) {  	
        	if ( typeof data.toPage === "string" ) {
        		if ($(u.hash).length >0 ) {       			
        		} else if ( u.hash.search(re) !== -1 ) {
        		//	e.preventDefault();
        			var offer_view = new OfferView(u);		
        		} 
        	}
        });*/  
        
        $('#me .offer-list a').click(function (e) {
           $.mobile.loading('show',{
           	text: 'Loading item...',
           	textVisible: true,
           	theme: 'b',
           });
           
           
	   		var u = e.currentTarget,
			re = /^#offer-/;       
           
	   		if ($(u.hash).length >0 ) {
	   		 $.mobile.changePage($(u.hash),{'dataUrl':u.href});
			} else if ( u.hash.search(re) !== -1 ) {
				e.preventDefault();
				var offer_view = new OfferView(u);
				
			} 
         });    
         

         console.log($('#me .offer-list').html());
         $.mobile.loading('hide');
		
	}
	
/************ Offer View ****************
 * 
 */		
	function OfferView(u) {
			this.model = new Offer();
			this.id = u.hash.replace( /.*#offer-/, "" )
			
			this.render = function () {
	
					this.template = Hogan.compile($("#template-offer").html());
			     	$.fn.jqmRemoveData('#offers div');
		        	$('#offers').html('');
					// $('#offers').children.slice(0,-3).remove();
		        			        	
				   $('#offers').append(this.template.render(this.model));	
				   $('#offers '+u.hash).page();
				   $.mobile.changePage($(u.hash),{'dataUrl':u.href});

			}
			
			var self = this;
			SC.api("/offer/offer_get",{item_id: this.id },{'type':'GET'},
					  function(response) {
				  		self.model = response.item;

				  		self.render();
			});
	}
	
	
	
	
	

	var OfferForm = new OfferFormView();
	var OfferList = new OfferListView();

});
