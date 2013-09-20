localStorage.pelicula="";
localStorage.hora="";
localStorage.genero="";
localStorage.clasificacion="";
localStorage.caracteristicas="";
localStorage.fondoImg= "";
localStorage.video ="";

function updateTextInput(val) {
	alpha = val/10;
	$(imgNoBlur).css('opacity', alpha);
}
function dateArray(){ 
 var days = new Array();
 var hoy = Date.today().toString('ddd d MMMM');
 days[0] = "Hoy"+hoy.substr(3,hoy.length);
 for (var i = 1; i < 4; i++) {
  days[i] = Date.today().addDays(i).toString('dddd d MMMM');      
 }; 
   return days;
}

var date = Date.today().toString('yyyy-MM-dd');

	var detalle ="";
$(document).ready(function () {
$("#contLoading").show();
	var listdetail = new Array();
	
	var surl = "http://"+localStorage.servidor+"/CinecoWS/rest/pelicula/"+localStorage.idPelicula+"?callback?";
    $.ajax({
    type: 'GET',
    url: surl,
    dataType: "json",
    contentType: "text/plain;charset=UTF-8",
    success: function (val) {
    	
    	detalle = val;
    getFunciones(date);
    },
    error: function (xhr, status, error) { 
    	//alert('Error pelicula !!' + error+"- " + status); 
    	$("#contLoading").hide();}
    });

    function getFunciones(fecha){
    	
    	var surl = "http://"+localStorage.servidor+"/CinecoWS/rest/funcionesPelicula/"+fecha+"/"+localStorage.idPelicula+"?callback?";
    	
	    $.ajax({
	    type: 'GET',
	    url: surl,
	    dataType: "json",
	    contentType: "text/plain;charset=UTF-8",
	    success: function (val) {
	    	funciones = val;
	    	ko.applyBindings(new AppViewModel());
			$("#contLoading").hide();
	    	
	    },
	    error: function (xhr, status, error) { 
		    //alert('Error funcionesPelicula !!' + error+"- " + status); 
		    $("#contLoading").hide(); }
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
		var self = this;
		var hoy = Date.today().toString('ddd d MMMM');
  		self.dias = dateArray();
		self.chosenFolderId = ko.observable();
		
		self.goToFolder = function(folder) { 
			self.chosenFolderId(folder);
			//alert(folder);
			if(folder !=("Hoy"+ hoy.substr(3,hoy.length)) && folder!=null  ){    
			    date = Date.parse(folder).toString('yyyy-MM-dd');
			   
			    
			   }else{
			    date = Date.today().toString('yyyy-MM-dd');
			      
			   }
		}
		self.goToFolder("Hoy"+ hoy.substr(3,hoy.length));
		self.titulo = detalle.data.titulo;
		self.tituloOriginal = detalle.data.titulo;
		this.genero = detalle.data.genero;
		this.clasificacion = detalle.data.clasificacion;
		this.duracion = detalle.data.duracion;
		this.pais = detalle.data.pais;
		this.sinopsis= detalle.data.sinopsis;
		this.director= detalle.data.director;
		this.artistas= detalle.data.artistas;
		localStorage.caracteristicas=detalle.data.carateristicas;
		self.original = function() {
			return self.tituloOriginal + " (" + self.pais + ")";    
		}
		localStorage.pelicula=detalle.data.titulo;
		localStorage.genero=detalle.data.genero;
		localStorage.clasificacion=detalle.data.clasificacion;
		localStorage.video=detalle.data.trailer;
		
		var data= funciones.data;
		var nameComp ="";
		
    	self.complejos = ko.observableArray([]);
    	listdetail = new Array();
    	var i=0;
    	for( x=0 ; x<data.length;x++){
	   			
    		if(nameComp != data[x].nombreComplejo){
				if(x!=0  ) {
					
					self.complejos.push(new Complejo(nameComp,listdetail));
					listdetail = new Array();
					i=0;
				}
				nameComp = data[x].nombreComplejo;
        	}        	
        	listdetail[i]= new detailFuncion(data[x].hora,data[x].idSala,data[x].asientos) ;
        	i++;
    	}	
    	self.complejos.push(new Complejo(nameComp,listdetail));
		self.showHora = function(value){
			
        	value = value.substr(0,value.length-2);
			return Date.parse(value).toString('h:mm tt');
			 
		}
		var url = detalle.data.poster;
		self.imagePath=url;
		self.imagePathBlur=url.substr(0,url.length-4)+"_blur.png";
		localStorage.fondoImg= url;
		

		this.compra=function (detalleFuncion) { 
			$("#contLoading").show();
			
			localStorage.hora=detalleFuncion.hora;
			localStorage.asientos=detalleFuncion.asientos;
			
            window.location = ("compra.html");
             
         }	
	}
	// Activates knockout.js
	$("#regresoEstreno").click(function(){
		 window.location = ("estrenos.html"); 
	});
	
	$(".regreso").click(function(){
		 window.location = ("index.html"); 
	});

	
});																	