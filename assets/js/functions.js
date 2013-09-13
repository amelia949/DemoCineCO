function updateTextInput(val) {
	alpha = val/10;
	$(imgNoBlur).css('opacity', alpha);
}
	var detalle ="";
$(document).ready(function () {
	var asientos = new Array();
	var sala = new Array();
	var horasFuncion = new Array();

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
    function Complejo(nombreComplejo, horarios,asientos,sala) {
	    var self = this;
	    self.nombreComplejo = nombreComplejo;
	    self.horarios = horarios;
	    self.asientos = asientos;
	    self.sala = sala;

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
		self.original = function() {
			return self.tituloOriginal + " (" + self.pais + ")";    
		}
		
		var data= funciones.data;
		var nameComp ="";
		alert("tam"+data.length);
    	self.complejos = ko.observableArray([]);
    	for( x=0 ; x<data.length;x++){
    		if(antComp != data[x].nombreComplejo){
    			
    			asientos = new Array();
				sala = new Array();
				horasFuncion = new Array();
				if(x!=0) {
					self.complejos.push(new Complejo(antComp,horasFuncion,asientos,sala));
				}
				antComp = data[x].nombreComplejo;
        	}
        	alert(antComp +"-"+data[x].idSala+"-"+ data[x].hora);
        	asientos[x]=data[x].asientos;
        	sala[x]=data[x].idSala;
        	horasFuncion[x]=data[x].hora;
    	}		

        /* self.complejos = ko.observableArray([
         	new Complejo("CINE COLOMBIA PORTAL DEL QUINDÍO.",["2013-09-10 13:10:00.0","2013-09-10 15:10:00.0","2013-09-10 17:10:00.0"]),
         	new Complejo("Cine Mil de Colombia.",["2013-09-10 13:10:00.0","2013-09-10 15:10:00.0","2013-09-10 17:10:00.0"])
         	]);

		self.complejos = [
			{ nombreComplejo: "CINE COLOMBIA PORTAL DEL QUINDÍO.", 
				horarios:["2013-09-10 13:10:00.0","2013-09-10 15:10:00.0","2013-09-10 17:10:00.0"]},
			{ nombreComplejo:"Cine Mil de Colombia", horarios:["2013-09-10 13:10:00.0","2013-09-10 15:10:00.0","2013-09-10 17:10:00.0"]}
		];*/
			

		this.muestraFunc = function() {
			//self.seats.push(new SeatReservation("", self.availableMeals[0]));
		}	
		
		self.showHora = function(value){
			return value.substring(10,16);
		}

		this.compra=function (hora) { 
            alert("Mostrar Detalle de " + hora);
             
         }	
	}
	// Activates knockout.js
	//ko.applyBindings(new AppViewModel());

	
});																	