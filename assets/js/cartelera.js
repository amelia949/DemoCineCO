function abrir(pagina) 
        {
            window.location = (pagina); 
        }  

$(document).ready(function () {    
    // Class to represent a row in the seat reservations grid
   // $("#menu").hide();
    function PeliculaCartel(idPelicula, imagePath,fecha) {
        var self = this;
        self.idPelicula = idPelicula;
        self.imagePath = imagePath;
        self.fecha=fecha;
    }
    
    var surl = "http://172.16.0.76:8081/CinecoWS/rest/allPeliculas/1?callback?";
    $.ajax({
        type: 'GET',
        url: surl,
        dataType: "json",
        contentType: "text/plain;charset=UTF-8",
        success: function (val) {
        ko.applyBindings(new CarteleraViewModel(val));
        $("#contLoading").hide();
    },
        error: function (xhr, status, error) { alert('Error text !!' + error+"- " + status); $("#contLoading").hide();}
    });
    // Overall viewmodel for this screen, along with initial state
    function CarteleraViewModel(valJson) {
        alert("CarteleraViewModel(valJson) ");
        var self = this;
        self.detallePelicula = function (seat) { 
            alert("Mostrar Detalle de " + seat.idPelicula); 
                localStorage.idPelicula =  seat.idPelicula;
                window.location = ("detalle.html");
            }
        var data= valJson.data;
        self.listPeliculas = ko.observableArray([]);
        for( x=0 ; x<data.length;x++){
            alert(valJson.data[x].idPelicula +"-"+valJson.data[x].imgCartelera+"-"+valJson.data[x].fechaEstreno);
            self.listPeliculas.push(new PeliculaCartel(valJson.data[x].idPelicula, valJson.data[x].imgCartelera, valJson.data[x].fechaEstreno));
        }
    }
    new DragDivScroll('listaPelicula', "NOHORIZONTAL NOMOUSEWHEEL");

    
  $('#footer').click(
        function (e) {
            // alert("move scroll");
            $('#menu').animate({scrollTop: $('#menu').height()*1.9}, 800);
        }
    );

  $('#down').click(
        function (e) {
             //alert("move scroll");
            $('#menu').animate({scrollTop: $("#menu").offset().top}, 800);
        }
    );

});
