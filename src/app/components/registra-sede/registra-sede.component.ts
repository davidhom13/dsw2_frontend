import { Component, OnInit } from '@angular/core';
import { Pais } from 'src/app/models/pais.model';
import { Sede } from 'src/app/models/sede.model';
import { PaisService } from 'src/app/services/pais.service';
import { SedeService } from 'src/app/services/sede.service';

@Component({
  selector: 'app-registra-sede',
  templateUrl: './registra-sede.component.html',
  styleUrls: ['./registra-sede.component.css']
})
export class RegistraSedeComponent implements OnInit {


paises: Pais[] = [];

sede: Sede = { 
  idSede: -1,
  nombre:"",
  direccion:"",
  estado: -1,
  codigoPostal:"",
  pais: {
    idPais: -1,
    iso:"",
    nombre:""
  }
}

constructor(private sedeService:SedeService, private paisService:PaisService) { 
  this.paisService.listaPais().subscribe(
    response => this.paises = response
);      
}



registraSede(){
  console.log(this.sede);
   this.sedeService.registrar(this.sede).subscribe(
      response => {
          console.log(response.mensaje);
          alert(response.mensaje);
      },
      error => {
          console.log(error);
      },
   );
}

  ngOnInit(): void {
  }

};

