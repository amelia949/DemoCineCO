localStorage.pelicula="";
localStorage.hora="";
localStorage.genero="";
localStorage.clasificacion="";
localStorage.caracteristicas="";
localStorage.fondoImg= "";

function updateTextInput(val) {
	alpha = val/10;
	$(imgNoBlur).css('opacity', alpha);
}
	var detalle ="";
$(document).ready(function () {
	var listdetail = new Array();
	alert("ready detalle =" +localStorage.idPelicula );
	var surl = "http://172.16.0.76:8081/CinecoWS/rest/pelicula/"+localStorage.idPelicula+"?callback?";
    $.ajax({
    type: 'GET',
    url: surl,
    dataType: "json",
    contentType: "text/plain;charset=UTF-8",
    success: function (val) {
    	alert("pelicula");
    	detalle = val;
    	getFunciones();
    },
    error: function (xhr, status, error) { alert('Error pelicula !!' + error+"- " + status); }
    });

    function getFunciones(fecha){
    	var surl = "http://172.16.0.76:8081/CinecoWS/rest/funcionesPelicula/2013-09-10/"+localStorage.idPelicula+"?callback?";
	    $.ajax({
	    type: 'GET',
	    url: surl,
	    dataType: "json",
	    contentType: "text/plain;charset=UTF-8",
	    success: function (val) {
	    	alert("funcionesPelicula");
	    	funciones = val;
	    	ko.applyBindings(new AppViewModel());
	    	$("#contLoading").hide();
	    },
	    error: function (xhr, status, error) { alert('Error funcionesPelicula !!' + error+"- " + status); }
	    });
    }

    function detailFuncion(hora,idSala,asientos){
    	var self=this;
    	self.hora = hora;
    	self.idSala= idSala;
    	self.asientos=asientos;
    }
    function Complejo(nombreComplejo, AFunciones) {
	    var self = this;
	    self.nombreComplejo = nombreComplejo;
	   	self.detailFuncions = ko.observableArray(AFunciones);   

	}
    
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
		localStorage.pelicula=detalle.data.titulo;
		localStorage.genero=detalle.data.genero;
		localStorage.clasificacion=detalle.data.clasificacion;
		localStorage.caracteristicas=detalle.data.caracteristicas;

		
		var data= funciones.data;
		var nameComp ="";
		alert("tam"+data.length);
    	self.complejos = ko.observableArray([]);
    	listdetail = new Array();
    	for( x=0 ; x<data.length;x++){
    		if(antComp != data[x].nombreComplejo){
    			
				if(x!=0  ) {
					self.complejos.push(new Complejo(antComp,listdetail));
				}
				antComp = data[x].nombreComplejo;
        	}
        	alert(data[x].nombreComplejo +"-"+data[x].idSala+"-"+ data[x].hora);
        	listdetail[x]= new detailFuncion(data[x].hora,data[x].idSala,data[x].asientos) ;
    	}	
    	self.complejos.push(new Complejo(antComp,listdetail));
		self.showHora = function(value){
			return value.substring(10,16);
			 
		}
		var url = "assets/imgs/fondo1.png";
		self.imagePath=url;
		self.imagePathBlur=url.substr(0,url.length-4)+"_blur.png";
		localStorage.fondoImg= url;

		this.compra=function (detalleFuncion) { 
			localStorage.hora=detalleFuncion.hora;
			localStorage.asientos=detalleFuncion.asientos;
			  
            alert("Mostrar Detalle de " + detalleFuncion.hora+" - "+detalleFuncion.idSala+" - " +detalleFuncion.asientos);
            window.location = ("compra.html");
             
         }	
	}
	// Activates knockout.js
	//ko.applyBindings(new AppViewModel());
	$(".regreso").click(function(){
		 window.location = ("index.html"); 
	});

	
});																	