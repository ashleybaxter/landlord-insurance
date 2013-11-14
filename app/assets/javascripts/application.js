// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// the compiled file.
//
// WARNING: THE FIRST BLANK LINE MARKS THE END OF WHAT'S TO BE PROCESSED, ANY BLANK LINE SHOULD
// GO AFTER THE REQUIRES BELOW.
//
//= require jquery
//= require jquery_ujs
//= require jquery.ui.core
//= require jquery.ui.widget
//= require jquery.ui.mouse
//= require jquery.ui.slider
//= require_tree .

$(function(){
	var size = window.getComputedStyle(document.body, ':after').getPropertyValue('content');
	if (size.indexOf('bigscreen') !=-1) {
		$('input[type="number"].slider').each(function(){
			var thisInput = {
				value:	$(this).attr('value') || 0,
				min:	$(this).attr('min'),
				max:	$(this).attr('max'),
				step:	$(this).attr('step') || 1000,
				me:		$(this).attr('id'),
				addr:	'#' + $(this).attr('id')
			}
			
			var newSlider = document.createElement("div");
			$('label[for="' + thisInput.me + '"]').after(newSlider);
			$(newSlider).slider({
				range:	'min',
				value:	parseInt(thisInput.value),
				min:	parseInt(thisInput.min),
				max:	parseInt(thisInput.max),
				step:	parseInt(thisInput.step),
				slide:	function(e,ui){
					$('#' + thisInput.me).val(ui.value);
				}
			});
			$(thisInput.addr).val($(newSlider).slider('value'));
			$(thisInput.addr).bind('change',function(){
				$(newSlider).slider('value', parseInt($(thisInput.addr).val()));
			});
		});
		iconBuilder();
	}
});

function iconBuilder() {
	$('select').has('option[data-icon]').each(function(){
		var selectVal = $(this).val();
		var newDiv = $(document.createElement('div')).addClass('option-icons');
		var iconCount = $(this).children('option[data-icon]').each(function(){
			var span = document.createElement('span');
			var img = new Image();
			if ($(this).text() == selectVal) {
				$(img).load(function(){$(span).prepend(this)}).attr({src: '/assets/on-'+$(this).data('icon'), 'data-origin': $(this).data('icon') }).addClass('active');
			} else {
				$(img).load(function(){$(span).prepend(this)}).attr({src: '/assets/'+$(this).data('icon'), 'data-origin': $(this).data('icon') });
			}
			$(span).text($(this).text()).appendTo(newDiv);
		}).length;
		$(newDiv).attr('data-for', '#'+$(this).attr('id')).insertBefore($(this));
		$(this).on('change', function(){
		var myBuddy = $('div[data-for="#'+$(this).attr('id')+'"]');
		myBuddy.find('span img').each(function(){
			$(this).attr('src', '/assets/'+$(this).data('origin')).removeClass('active');
		});
		var myImg = myBuddy.find('span:contains("'+$(this).val()+'") img');
		$(myImg).attr('src', '/assets/on-'+$(myImg).data('origin')).addClass('active');
	});
	});
}