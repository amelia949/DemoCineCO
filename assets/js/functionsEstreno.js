function updateTextInput(val) {
	alpha = val/10;
	$(imgNoBlur).css('opacity', alpha);
}
	var detalle ="";
$(document).ready(function () {
	var listdetail = new Array();

	alert("ready detalle =" +localStorage.idPelicula );
	var surl = "http://192.168.1.72:8081/CinecoWS/rest/pelicula/"+localStorage.idPelicula+"?callback?";
    $.ajax({
    type: 'GET',
    url: surl,
    dataType: "json",
    contentType: "text/plain;charset=UTF-8",
    success: function (val) {
    	alert("pelicula");
    	detalle = val;
    	ko.applyBindings(new AppViewModel());
    	
    },
    error: function (xhr, status, error) { alert('Error pelicula !!' + error+"- " + status); }
    });

    
    
	function AppViewModel() {
		alert("AppViewModel");
		var self = this;
		
		self.dias = ['Hoy', 'Jueves 12'];
		self.chosenFolderId = ko.observable();
		
		self.goToFolder = function(folder) { 
			self.chosenFolderId(folder);
		}
		self.goToFolder('Hoy');
		self.titulo = detalle.data.titulo;
		self.tituloOriginal = detalle.data.titulo;
		this.genero = detalle.data.genero;
		this.clasificacion = detalle.data.clasificacion;
		this.duracion = detalle.data.duracion;
		this.pais = detalle.data.pais;
		this.sinopsis= detalle.data.sinopsis;
		this.director= detalle.data.director;
		this.artistas= detalle.data.artistas;
		self.original = function() {
			return self.tituloOriginal + " (" + self.pais + ")";    
		}
		
	}
	// Activates knockout.js
	//ko.applyBindings(new AppViewModel());
	$(".regreso").click(function(){
		alert("regreso");
		 window.location = ("estrenos.html"); 
	});

	
});																	