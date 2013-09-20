
var imgCartelera=new Array();
imgCartelera[0]="assets/image/estreno1.png";
imgCartelera[1]="assets/image/estreno2.png";
imgCartelera[2]="assets/image/estreno3.png";
imgCartelera[3]="assets/image/estreno4.png";

function abrir(pagina)
        {
            window.location = (pagina); 
        }  

$(document).ready(function () {    
    // Class to represent a row in the seat reservations grid
	 $("#contLoading").css("z-index",1);
	 $("#listaPelicula").hide();
   	 $(".general").css("z-index",-1);
    function PeliculaCartel(idPelicula, imagePath,fecha) {
        var self = this;
        self.idPelicula = idPelicula;
        self.imagePath = imagePath;
        self.fecha=fecha;
    }
    
   var surl = "http://"+localStorage.servidor+"/CinecoWS/rest/allPeliculas/2?callback?";
  
    $.ajax({
        type: 'GET',
        url: surl,
        dataType: "json",
        contentType: "text/plain;charset=UTF-8",
        success: function (val) {
        ko.applyBindings(new CarteleraViewModel(val));
        $("#contLoading").hide();
        $("#contLoading").css("z-index",-1);
   	 $(".general").css("z-index",1);
   	 $("#listaPelicula").show();
    },
        error: function (xhr, status, error) { 
        //alert('Error text !!' + error+"- " + status); 
        $("#contLoading").hide();}
    });
    // Overall viewmodel for this screen, along with initial state
    function CarteleraViewModel(valJson) {
        //alert("CarteleraViewModel(valJson) ");
        var self = this;
        self.detallePelicula = function (seat) { 
            $("#contLoading").show();
        	$("#contLoading").css("z-index",1);
   	 		$(".general").css("z-index",-1);
            localStorage.idPelicula =  seat.idPelicula; 
             window.location = ("detalleEstreno.html"); 
            }
        var data= valJson.data;
        self.listPeliculas = ko.observableArray([]);
        for( x=0 ; x<data.length;x++){
            //alert(valJson.data[x].idPelicula +"-"+valJson.data[x].imgCartelera+"-"+valJson.data[x].fechaEstreno);
            var fecha= valJson.data[x].fechaEstreno;
        fecha = fecha.substr(0,fecha.length-2);
        fecha=Date.parse(fecha).toString('MMM d, yyyy');
            self.listPeliculas.push(new PeliculaCartel(valJson.data[x].idPelicula, imgCartelera[x], fecha));
        }
    }
        
    $('#footer').click(
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
                 function() {  
                 	$(".general").css("z-index",1);
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
