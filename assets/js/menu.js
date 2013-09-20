	$(function() {
			 $('#MCartelera').click(function () {
			 	$("#contLoading").css("z-index",1);
             	$("#menu").css("z-index",-1);
			 	window.location = ("index.html"); 
			 });
			 $('#MEstrenos').click(function () {
			 	$("#contLoading").css("z-index",1);
             	$("#menu").css("z-index",-1);
			 window.location = ("estrenos.html"); });
			 $('#MComplejos').click(function () {
			 	$("#contLoading").css("z-index",1);
             	$("#menu").css("z-index",-1);
			 window.location = ("complejos.html"); });
			 $('#MFestivales').click(function () {
			  });
			});
