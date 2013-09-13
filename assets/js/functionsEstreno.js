function updateTextInput(val) {
	alpha = val/10;
	$(imgNoBlur).css('opacity', alpha);
}
	var detalle ="";
$(document).ready(function () {
	var listdetail = new Array();

	//alert("ready detalle =" +localStorage.idPelicula );
	var surl = "http://172.16.0.76:8081/CinecoWS/rest/pelicula/"+localStorage.idPelicula+"?callback?";
    $.ajax({
    type: 'GET',
    url: surl,
    dataType: "json",
    contentType: "text/plain;charset=UTF-8",
    success: function (val) {
    	detalle = val;
    	ko.applyBindings(new AppViewModel());
    	$("#contLoading").hide();
    },
    error: function (xhr, status, error) { alert('Error pelicula !!' + error+"- " + status); }
    });
    
	function AppViewModel() {
		//alert("AppViewModel");
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
		 window.location = ("estrenos.html"); 
	});

	
});																	