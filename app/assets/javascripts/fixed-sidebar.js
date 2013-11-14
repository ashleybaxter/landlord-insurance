$(window).on("load resize",function(e){
  var sidebarWidth = $('.one-of-three').width();
  $('.premium-placeholder').css("width",sidebarWidth);
});

$(window).on("ajaxSuccess",function(e){
  var sidebarWidth = $('.one-of-three').width();
  $('.sidebar').css("width",sidebarWidth);
});