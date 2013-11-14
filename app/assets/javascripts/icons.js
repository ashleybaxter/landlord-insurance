$(document).ready(function(){
$('.option-icons span').on('mouseenter', function(){
	var myImg = $(this).children('img');
	$(myImg).attr('src', '/assets/on-'+$(myImg).data('origin'));
}).on('mouseleave', function(){
	var myImg = $(this).children('img:not(.active)');
	$(myImg).attr('src', '/assets/'+$(myImg).data('origin'));
}).on('click', function() {
	var myBoss = $(this).parent().data('for');
	$(myBoss).val($(this).text());
		$('.option-icons span img').each(function(){
		$(this).attr('src', '/assets/'+$(this).data('origin')).removeClass('active');
	});
	var myImg = $(this).children('img');
	$(myImg).attr('src', '/assets/on-'+$(myImg).data('origin')).addClass('active');
});
 });