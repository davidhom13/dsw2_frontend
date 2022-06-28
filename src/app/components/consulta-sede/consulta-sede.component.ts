import { Component, OnInit } from '@angular/core';
import { Pais } from 'src/app/models/pais.model';
import { Sede } from 'src/app/models/sede.model';
import { PaisService } from 'src/app/services/pais.service';
import { SedeService } from 'src/app/services/sede.service';

@Component({
  selector: 'app-consulta-sede',
  templateUrl: './consulta-sede.component.html',
  styleUrls: ['./consulta-sede.component.css']
})
export class ConsultaSedeComponent implements OnInit {

  nombre: string = "";
  codigoPostal: string = "";
  selpais: number = -1;
  estados:boolean=true;


  Pais: string[] = [];

  paises: Pais[] = [];

  sede: Sede = {
    pais:{
      idPais: -1,
      iso: "-1",
      nombre: "-1",
    }
  }

  sedes: Sede[] = [];

  constructor(private sedeService:SedeService, private paisService:PaisService) { 
    paisService.listaPais().subscribe(
      response => this.paises = response
    );
  }



  consultaSede(){
    this.sedeService.listaSede(this.nombre, this.codigoPostal, this.selpais,this.estados?1:0).subscribe(
          (x) => {
              this.sedes = x.lista;
              alert(x.mensaje);
          }
    );
  }

  ngOnInit(): void {
  }

}
