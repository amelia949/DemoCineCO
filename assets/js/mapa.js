var map;
var marker;
function initialize() {
	var map_canvas = document.getElementById('mapa');
	var map_options = {
	  center: new google.maps.LatLng(44.5403, -78.5463),
	  zoom: 8,
	  mapTypeId: google.maps.MapTypeId.ROADMAP
	}
	map = new google.maps.Map(map_canvas, map_options)
}
google.maps.event.addDomListener(window, 'load', initialize);
	
$(document).ready(function () {
  $("#contLoading").css("z-index",1);
     $(".general").css("z-index",-1);
	function Complejo(telefono, latitud,longitud,direccion,ciudad,nombre,idComplejo) {
        var self = this;
        self.telefono = telefono;
        self.latitud= latitud;
        self.longitud=longitud;
        self.direccion = direccion;
        self.ciudad = ciudad;
        self.nombre = nombre;
        self.idComplejo = idComplejo;
    }

    var surl = "http://"+localStorage.servidor+"/CinecoWS/rest/allComplejos/?callback?";
    $.ajax({
    type: 'GET',
    url: surl,
    dataType: "json",
    contentType: "text/plain;charset=UTF-8",
    success: function (val) {
   
    ko.applyBindings(new AppViewModel(val));
    $("#contLoading").hide();
        $("#contLoading").css("z-index",-1);
     $(".general").css("z-index",1);
   },
    error: function (xhr, status, error) { 
    //alert('Error text !!' + error+"- " + status);
    $("#contLoading").hide(); }
    });

	function AppViewModel(valJson) {
		var self = this;
		var data= valJson.data;
        self.complejos = ko.observableArray([]);
        for( x=0 ; x<data.length;x++){
            //alert(valJson.data[x].ciudad +"-"+valJson.data[x].nombre);
            self.complejos.push(new Complejo(valJson.data[x].telefono, valJson.data[x].latitud, valJson.data[x].longitud,
            	valJson.data[x].direccion,valJson.data[x].ciudad,valJson.data[x].nombre,valJson.data[x].idComplejo));
        }
        
          self.selectedComplejo= ko.observable(); 
        
		self.showMarker = function(item){
			
			var myLatlng;
			if(marker != null)
				marker.setMap(null);
			if(item.latitud ==null || item.longitud ==null ){
				myLatlng = new google.maps.LatLng(44.5403,11.020394);
			}
			else{
			myLatlng = new google.maps.LatLng(parseInt(item.latitud),parseInt(item.longitud));
			}
						 
			
			marker = new google.maps.Marker({
				position: myLatlng,
				map: map,
				animation: google.maps.Animation.DROP,
				icon: "assets/imgs/iconolocalizador.png",
				title : item.nombre

			});
			
			map.setCenter(myLatlng)
			map.panTo(myLatlng)
			var contentString =  '<div id="infoMapa" align="center"><h2>Cine Colombia</h2> <h3>'+item.nombre+'</h3>'
				+'<br/><b>Telefono:</b><br/>' +item.telefono+'<br/><br/>'
				+'<b>Direccion:</b><br/>' +item.direccion+"<br />"+'</div>';
				
			var infowindow = new google.maps.InfoWindow({
				content:contentString
			});

			google.maps.event.addListener(marker, 'click', function() {
				infowindow.open(map,marker);
			});
		}
				
	}
	
	// Activates knockout.js
	//ko.applyBindings(new AppViewModel());
	$('#flechamenu').click(
        function (e) {
              $(".general").css("z-index",-1);
              $("#menu").css("z-index",1);
              sleep(500);
            $('#menu').animate({scrollTop: $('#menu').height()*1.9}, 800);
        }
    );

    $('#down').click(
        function (e) {
            
            $('#menu').animate({scrollTop: $("#menu").offset().top}, 800,
                 function() {  $(".general").css("z-index",1);
            $("#menu").css("z-index",-1);
        
            });    
        });

});
function sleep(milliseconds) {
  //  alert("sleep");
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}