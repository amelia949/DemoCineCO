$(document).ready(function () {
    $("#listaPelicula").height($(window).height() * .72);
    $(".menu").height($(window).height() * .65);
    $(".menu").hide();
    // Class to represent a row in the seat reservations grid
    function PeliculaCartel(idPelicula, imagePath) {
        var self = this;
        self.idPelicula = idPelicula;
        self.imagePath = imagePath;
    }
    
    //var surl = "http://172.16.0.76:8081/cineco/rest/allPeliculas/1?callback?";
    var surl = "http://192.168.1.72:8081/CinecoWS/rest/allPeliculas/1?callback?";
    $.ajax({
    type: 'GET',
    url: surl,
    dataType: "json",
    contentType: "text/plain;charset=UTF-8",
    success: function (val) {
    ko.applyBindings(new CarteleraViewModel(val));
    },
    error: function (xhr, status, error) { alert('Error text !!' + error+"- " + status); }
    });

    // Overall viewmodel for this screen, along with initial state
    function CarteleraViewModel(valJson) {
    var self = this;
    self.detallePelicula = function (seat) { alert("Mostrar Detalle de " + seat.idPelicula); }
    var data= valJson.data;
    self.listPeliculas = ko.observableArray([]);
    for( x=0 ; x<data.length;x++){
        alert(valJson.data[x].idPelicula +"-"+valJson.data[x].imgCartelera )
        self.listPeliculas.push(new PeliculaCartel(valJson.data[x].idPelicula, valJson.data[x].imgCartelera));
    }


    }
    /*
    function CarteleraViewModel() {
        var self = this;
        self.detallePelicula = function (seat) { 
            alert("Mostrar Detalle de " + seat.idPelicula);
            localStorage.idPelicula =  seat.idPelicula;
            window.location = ("detalle.html"); 
             
         }
        // Editable data
        self.listPeliculas = ko.observableArray([
        new PeliculaCartel("1", "assets/image/Cartelera1.png"),
        new PeliculaCartel("2", "assets/image/Cartelera2.png"),
        new PeliculaCartel("3", "assets/image/Cartelera3.png"),
        new PeliculaCartel("4", "http://www.cinepolis.com.mx/Imagenes/Peliculas/chicas-armadas-y-peligrosas-cartel.jpg")
    ]);

    }
    */
    ko.applyBindings(new CarteleraViewModel());

    new DragDivScroll('listaPelicula', "NOHORIZONTAL NOMOUSEWHEEL");

    $("#footer").click(
          function () {
              $(".menu").show();
          }
        );
    $("#listaPelicula").hover(function () {

        $(".menu").hide();
    });

    $("#ocultaMenu").click(function (){$(".menu").hide();});


});

$(window).resize(function () {
       
    $("#listaPelicula").height($(window).height() *.72);
    $(".menu").height($(window).height() *.65);
});
