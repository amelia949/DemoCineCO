$(function () { 
	function ConfirmacionViewModel() {
		var self = this;		

		(function(a){(jQuery.browser=jQuery.browser||{}).mobile=/android.+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|e\-|e\/|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(di|rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|xda(\-|2|g)|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))})(navigator.userAgent||navigator.vendor||window.opera);
		var isiPad = /ipad/i.test(navigator.userAgent.toLowerCase());
		var url = localStorage.fondoImg;

		if(!jQuery.browser.mobile || isiPad){
			self.imagePath=url.substr(0,url.length-4)+"_ipad.png";
			self.imagePathBlur=url.substr(0,url.length-4)+"ipad_blur.png";			
		}else{
			self.imagePath=url;
			self.imagePathBlur=url.substr(0,url.length-4)+"_blur.png";			
		}		
		var fecha = localStorage.hora;
        fecha = fecha.substr(0,fecha.length-2);
		self.titulo = localStorage.pelicula;
		self.fecha =Date.parse(fecha).toString('ddd d MMMM');
		self.hora = Date.parse(fecha).toString('h:mm tt');
		self.genero = localStorage.genero;		
		self.clasificacion = localStorage.clasificacion;
		self.caracteristicas = localStorage.caracteristicas;

		self.docCliente = "1234567";
		  self.nomCliente = "Cesar Martinez Acero";
		  self.codSeguridad = "***";
		  self.tipoTarjeta = "Débito";
		  self.localidad = ko.observable();  
		  self.costoBoleto = "$ 00000";
		  self.costoServicio = "$ 2,000";
		  self.totalBoletos  = "$ 00000";
		  self.totalServicio = "$ 00000";
		  self.total = "$ 00000";
	}

	// Activates knockout.js
	ko.applyBindings(new ConfirmacionViewModel());	
	sala(localStorage.asientos);
	//sala("I1,I2,I3,I4,I5,I6,I7,I8,I9,I10,I11,I12,I13,I14,H1,H2,H3,H4,H5,H6,H7,H8,H9,H10,H11,H12,H13,H14,G1,G2,G,G,G5,G6,G7,G8,G9,G10,G,G,G13,G14,F1,F2,F,F,F5,F6,F7,F8,F9,F10,F,F,F13,F14,E1,E2,E,E,E5,E6,E7,E8,E9,E10,E,E,E13,E14,D1,D2,D,D,D5,D6,D7,D8,D9,D10,D,D,D13,D14,C1,C2,C,C,C5,C6,C7,C8,C9,C10,C,C,C13,C14,B1,B2,B,B,B5,B6,B7,B8,B9,B10,B,B,B13,B14,A1,A2,A,A,A5,A6,A7,A8,A9,A10,A,A,A13,A14");

	function sala(asientos){
		var sillas=asientos.split(",");
			
		var fila = sillas[0].charAt(0);			
			
		var table = document.getElementById("asientosSala");
		var i = 0;
		while(i < sillas.length) {						
			var tr = document.createElement('tr');					
			while(i < sillas.length && sillas[i].charAt(0) == fila){		

				var td = document.createElement('td');
				var casilla = document.createTextNode('');
				var label = document.createElement('label');
				if(sillas[i].length>1){						
					casilla = document.createElement('input');
					casilla.setAttribute("type", 'checkbox');
    				casilla.setAttribute("value", sillas[i]);
    				casilla.setAttribute("name", 'asiento');
    				casilla.setAttribute("class","asiento");
   					td.appendChild(casilla);
   					td.appendChild(label);
				}else{
					td.appendChild(casilla)
				}					
				tr.appendChild(td);
				i++;
			}				
			table.appendChild(tr);
			
			if(sillas[i]!=undefined)			
				var fila = sillas[i].charAt(0);						
		};			
	}	
	
	$(".regreso").click(function(){
		 window.location = ("detalle.html"); 
	});
});