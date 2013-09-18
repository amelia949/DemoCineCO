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

    var surl = "http://172.16.0.76:8081/CinecoWS/rest/allComplejos/2?callback?";
    $.ajax({
    type: 'GET',
    url: surl,
    dataType: "json",
    contentType: "text/plain;charset=UTF-8",
    success: function (val) {
    ko.applyBindings(new AppViewModel(val));
    $("#contLoading").hide(); 
   },
    error: function (xhr, status, error) { alert('Error text !!' + error+"- " + status);$("#contLoading").hide(); }
    });

	function AppViewModel(valJson) {
		var self = this;
		var data= valJson.data;
        self.complejos = ko.observableArray([]);
        for( x=0 ; x<data.length;x++){
            alert(valJson.data[x].idPelicula +"-"+valJson.data[x].imgCartelera+"-"+valJson.data[x].fechaEstreno);
            self.complejos.push(new Complejo(valJson.data[x].telefono, valJson.data[x].latitud, valJson.data[x].longitud,
            	valJson.data[x].direccion,valJson.data[x].ciudad,valJson.data[x].nombre,valJson.data[x].idComplejo));
        }
        /*
		self.complejos = [
		new Complejo("737 2463","44.5403","-78.5463","Avenida Bolívar Carrera 14 N° 19N - 46","Armenia","CINE COLOMBIA PORTAL DEL QUINDÍO.",1),
		new Complejo("350 7777","11.020394","-74.828011","Calle 98 N° 52 - 115","Barranquilla","CINE COLOMBIA BUENAVISTA.",2),
		new Complejo("404 2463",null,null,"Carrera 12 N° 82-02","Bogotá","CINE COLOMBIA ANDINO.",3),
		new Complejo("404 2463",null,null,"Calle 72 No 10-34","Bogotá","CINE COLOMBIA AVENIDA CHILE.",4),
		new Complejo("404 2463",null,null,"Transversal 55 N° 98A - 66","Bogotá","CINE COLOMBIA CALLE 100.",5),
		new Complejo("404 2463",null,null,"Diagonal 150 N° 31- 56","Bogotá","CINE COLOMBIA CEDRITOS.",6),
		new Complejo("632 2463",null,null,"Carrera 35 N° 48-131","Bucaramanga","CINE COLOMBIA CABECERA.",7),
		new Complejo("632 2463",null,null,"Transversal Oriental No 90 - 182","Bucaramanga","CINE COLOMBIA CACIQUE.",8),
		new Complejo("644 2463",null,null,"Avenida 6A Norte N° 37N-25","Cali","CINE COLOMBIA CHIPICHAPE.",9),
		new Complejo("644 2463",null,null,"Calle 5 N° 50-103","Cali","CINE COLOMBIA COSMOCENTRO.",10),
		new Complejo("644 2463",null,null,"Carrera 49 N° 9-50","Cali","CINE COLOMBIA PALMETTO.",11),
		new Complejo("672 08 38",null,null,"Cll 29 N° 22 - 108","Cartagena","CINE COLOMBIA CARIBE PLAZA.",12),
		new Complejo("672 08 38",null,null,"Calle 30 N° 30 - 31","Cartagena","CINE COLOMBIA PASEO LA CASTELLANA.",13),
		new Complejo("885 24 63",null,null,"Cll 33 B No. 20-03","Manizalez","CINE COLOMBIA FUNDADORES.",14),
		new Complejo("360 24 63",null,null,"Calle 30A N° 82A -26","Medellín","CINE COLOMBIA MOLINOS.",15),
		new Complejo("360 24 63",null,null,"Calle 6 Sur N° 43A -227","Medellín","CINE COLOMBIA OVIEDO.",16),
		new Complejo("360 24 63",null,null,"Carrera 43 A N° 7 sur 170","Medellín","CINE COLOMBIA SANTAFÉ MEDELLÍN.",17),
		new Complejo("791 28 28",null,null,"Calle 44 Nº 10 - 91","Montería","CINE COLOMBIA ALAMEDAS DEL SINÚ.",18),
		new Complejo("334 24 63",null,null,"Carrera 11 Bis N° 17 - 20","Pereira","CINE COLOMBIA VICTORIA.",19)
			];
			*/
			
		self.showMarker = function(item){
			if(marker != null)
				marker.setMap(null);
			var myLatlng = new google.maps.LatLng(parseInt(item.latitud),parseInt(item.longitud));
			
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
});