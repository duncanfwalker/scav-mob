_.templateSettings = {
	interpolate : /\{\{(.+?)\}\}/g
};

var MyOffers, MyOffersPage, NewOffersPage, CurrentOffer;

$(function() {
	/***************************************************************************
	 * Offer model
	 **************************************************************************/
	var Offer = Backbone.Model
			.extend({
				defaults : function() {
					return {
						title : "Item title",
						item_id : "1",
						datafile : "img/white/list.png",
						created : new Date(),
						end_date : ((new Date()).getTime() + (10 * 24 * 60 * 60 * 1000))
					};
				},

				initialize : function() {
					if (!this.get("title")) {
						this.set({
							"title" : this.defaults().title,
							"item_id" : this.defaults().item_id,
							"datafile" : this.defaults().datafile,
							"end_date" : new Date(),
							"created" : new Date()
						// "end_date":10//(new Date())+1*24*60*60*1000

						});

					}

				}
			});
	/***************************************************************************
	 * OfferCollection model
	 **************************************************************************/
	var OfferCollection = Backbone.Collection.extend({
		model : Offer,
		localStorage : new Backbone.LocalStorage("scav-offers")
	});
	/***************************************************************************
	 * OfferBrowseItem view
	 **************************************************************************/
	var OfferBrowseItem = Backbone.View.extend({
		// collection: OfferCollection,
		tagName : "li",
		template : _.template($('#template-offer-item').html()),
		render : function() {
			this.$el.html(this.template(this.model.toJSON()));
			this.$el.click(this, function(e) {
				CurrentOffer = new OfferPage(e.data);
				CurrentOffer.render();
			});
			return this;
		}
	});

	/***************************************************************************
	 * OfferPage view
	 **************************************************************************/
	var OfferPage = Backbone.View.extend({
		// collection: OfferCollection
		el : $("#offers"),
		template : _.template($('#template-offer').html()),
		viewHelper : {
			"daysleft" : function() {

				var s, m, h, d;
				var diff = new Date((this.end_date - (new Date()))) / 1000; // diff
																			// in
																			// seconds
																			// now
				s = Math.floor(diff % 60);
				diff = diff / 60;
				m = Math.floor(diff % 60);
				diff = diff / 60;
				h = Math.floor(diff % 24);
				d = Math.floor(diff / 24);

				if (d > 0) {
					return d + " day(s)";
				} else if (h > 0) {
					return h + " hour(s)";
				} else {
					return h + " min(s), " + s + " secs";
				}
			}
		},
		render : function() {
			var data = this.model.toJSON();
			_.extend(data, this.viewHelper);

			$("#offers").html(this.template(data)); // this.model.toJSON()
			$.mobile.changePage($('#offer-' + this.model.attributes.item_id));
			return this;
		}
	});

	/***************************************************************************
	 * Offer Browse view
	 **************************************************************************/
	var OfferBrowseView = Backbone.View.extend({
		el : $("#my-offers-browser"),
		collection : MyOffers,
		initialize : function() {
			this.collection = MyOffers;
			// this.render();
		},

		render : function() {
			this.$el.html('');
			var that = this;
			_.each(this.collection.models, function(item) {
				console.log(JSON.stringify(item));
				that.renderOffer(item);
			}, this);
			$(this.el).listview('refresh');
		},

		renderOffer : function(item) {
			var offerView = new OfferBrowseItem({
				model : item
			});
			this.$el.append(offerView.render().el);
		}

	});
	/***************************************************************************
	 * Offer Create View
	 **************************************************************************/
	var OfferCreateView = Backbone.View.extend({
		model : Offer,
		initialize : function() {
			model = new Offer();
			$('#make-offer').on('click', function() {
				MyOffers.add(model);
				model = new Offer();
			});

			$('#give-offer input, #give-offer textarea')
					.on(
							'change',
							function(event) {
								var target = event.target;
								console.log('changing ' + target.id + ' from: '
										+ target.defaultValue + ' to: '
										+ target.value);

								model.set({
									title : $('#title').val(),
									description : $('#description').val()
								});

							});
		}

	});

	// MyOfferList.create({title: 'test'});
	/*
	 * $('#me').on('pageshow', function (event, ui) { MyOffersPage.render(); });
	 * $('#give').on('pageshow', function (event, ui) { NewOffersPage.render();
	 * });
	 */

	/*
	 * $('#me').on('click', function (event, ui) {
	 * MyOffersPage.collection.add(); });
	 */

	MyOffers = new OfferCollection();
	MyOffersPage = new OfferBrowseView();
	NewOffersPage = new OfferCreateView();

});
