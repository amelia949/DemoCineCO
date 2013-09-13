$(function () { 
	function ConfirmacionViewModel() {
		var self = this;		

		self.imagePath=localStorage.fondoImg;
		
		self.titulo = localStorage.pelicula;
		self.fecha = localStorage.hora;
		self.hora = localStorage.hora;
		self.genero = localStorage.genero;		
		self.clasificacion = localStorage.clasificacion;
		self.caracteristicas = localStorage.caracteristicas;

		self.docCliente = "1234567";
		self.nomCliente = "Eugene Alexander Echeverria";
		self.codSeguridad = "";
		self.tipoTarjeta = "Débito";
		self.localidad = "General";
		self.noBoletos = "2";
		self.asientos = "B12, B13";
		self.costoBoleto = "$ 00000";
		self.costoServicio = "$ 2.000";
		self.totalBoletos  = "$ 00000";
		self.totalServicio = "$ 00000";
		self.total = "$ 00000";		
	}

	// Activates knockout.js
	ko.applyBindings(new ConfirmacionViewModel());	
	sala("A,A,A,A,A15,A14,A13,A9,A8,A7,A6,A,A,A,B,B,B,B16,B15,B14,B13,B9,B8,B7,B6,B,B,B,C,C,C,C16,C15,C14,C13,C9,C8,C7,C6,C,C,C,D,D24,D,D16,D15,D14,D13,D9,D8,D7,D6,D,D,D,E25,E24,E,E16,E15,E14,E13,E9,E8,E7,E6,E,E2,E1,F25,F24,F,F16,F15,F14,F13,F9,F8,F7,F6,F,F2,F1,I25,I24,I,I16,I15,I14,I13,I9,I8,I7,I6,I,I2,I1,J25,J24,J,J16,J15,J14,J13,J9,J8,J7,J6,J,J2,J1,K25,K24,K,K16,K15,K14,K13,K9,K8,K7,K6,K,K2,K1,L25,L24,L,L16,L15,L14,L13,L9,L8,L7,L6,L,L2,L1,M25,M24,M,M16,M15,M14,M13,M9,M8,M7,M6,M,M2,M1,N25,N24,N,N16,N15,N14,N13,N9,N8,N7,N6,N5,N4,N1");

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
    				casilla.setAttribute("onClick","output()");
   					td.appendChild(casilla);
   					td.appendChild(label);
				}else{
					td.appendChild(casilla)
				}					
				tr.appendChild(td);					
				i++;
			}				
			table.appendChild(tr);				
			var fila = sillas[i].charAt(0);						
		};			
	}
});