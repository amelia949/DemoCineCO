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
		
		var data= funciones.data;
		var nameComp ="";
		alert("tam"+data.length);
    	self.complejos = ko.observableArray([]);
    	for( x=0 ; x<data.length;x++){
    		if(antComp != data[x].nombreComplejo){
    			listdetail = new Array();
				if(x!=0) {
					self.complejos.push(new Complejo(antComp,listdetail));
				}
				antComp = data[x].nombreComplejo;
        	}
        	alert(antComp +"-"+data[x].idSala+"-"+ data[x].hora);
        	listdetail[x]= new detailFuncion(data[x].hora,data[x].idSala,data[x].asientos) ;
    	}	
    	/*
    	var self = this;
		
		self.dias = ['Hoy', 'Jueves 12'];
		self.chosenFolderId = ko.observable();
		
		self.goToFolder = function(folder) { 
			self.chosenFolderId(folder);
		}
		self.goToFolder('Hoy');
		self.titulo = "El Conjuro";
		self.tituloOriginal = "The Conjuring";
		this.genero = "Terror";
		this.clasificacion = "RECOMENDADA PARA MAYORES DE 12 AÑOS";
		this.duracion = "120";
		this.pais = "Estados Unidos";
		this.director = "Harald Zwart";
		this.artistas = "Lily Collins, Jamie Campbell Bower, Lena Headey, Jonathan Rhys Meyers, Robert Sheehan, Jared Harris";
		this.sinopsis = "Clary Fray es una adolescente ordinaria de Brooklyn hasta la noche en que conoce a Jace, un misterioso chico con tatuajes, quién resulta ser un guerrero mitad ángel conocido como cazador de sombras.Cuando Clary descubre que su madre Jocelyn ha sido raptada, desesperadamente busca la ayuda de Jace. Después de entrar en un portal dorado que la transporta a través del tiempo y espacio, en un latido de corazón, Clary se da cuenta que ella también tiene poderes para los cazadores de sombras.¿Pero puede aprovecharlos a tiempo para salvar a su madre? Adaptación cinematográfica de la saga THE MORTAL INSTRUMENTS.";
		self.original = function() {
			return self.tituloOriginal + " (" + self.pais + ")";    
		}

        self.complejos = ko.observableArray([
         	new Complejo("CINE COLOMBIA PORTAL DEL QUINDÍO.",
         				[new detailFuncion("2013-09-10 13:10:00.0","3","f2,g3,g6,y6"),
         				new detailFuncion("2013-09-10 15:10:00.0","4","g6,h8,n9,v0,d4,c9"),
         				new detailFuncion("2013-09-10 17:10:00.0","6","g7,j7,j8,b9")]),
         	new Complejo("Cine Mil de Colombia.",
         				[new detailFuncion("2013-09-10 13:10:00.0","8","h7,b7,b8"),
         				new detailFuncion("2013-09-10 15:10:00.0","9","v5,x7,f8,f5"),
         				new detailFuncion("2013-09-10 17:10:00.0","11","g9,v9,c3,v5")])
         	]);

         /*
		self.complejos = [
			{ nombreComplejo: "CINE COLOMBIA PORTAL DEL QUINDÍO.", 
				horarios:["2013-09-10 13:10:00.0","2013-09-10 15:10:00.0","2013-09-10 17:10:00.0"]},
			{ nombreComplejo:"Cine Mil de Colombia", horarios:["2013-09-10 13:10:00.0","2013-09-10 15:10:00.0","2013-09-10 17:10:00.0"]}
		];*/
			
		self.showHora = function(value){
			return value.substring(10,16);
		}

		this.compra=function (detalleFuncion) { 
            alert("Mostrar Detalle de " + detalleFuncion.hora+" - "+detalleFuncion.idSala+" - " +detalleFuncion.asientos);
             
         }	
	}
	// Activates knockout.js
	//ko.applyBindings(new AppViewModel());

	
});																	