$(function() {

	$('#me').on("pageshow", function() {
		MyOffersPage.render();
	})
	$('#give').on("pageshow", function() {
		NewOffersPage.render();
	});

});