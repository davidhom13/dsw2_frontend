import { Component, OnInit } from '@angular/core';
import { Cliente } from 'src/app/models/cliente.model';
import { Ubigeo } from 'src/app/models/ubigeo.model';
import { ClienteService } from 'src/app/services/cliente.service';
import { UbigeoService } from 'src/app/services/ubigeo.service';

@Component({
  selector: 'app-registra-cliente',
  templateUrl: './registra-cliente.component.html',
  styleUrls: ['./registra-cliente.component.css']
})
export class RegistraClienteComponent implements OnInit {

  // variables para el ubigeo
  departamentos?:string[] = []; 
  provincias?:string[] = []; 
  distritos?:Ubigeo[] = [];

  //variable gloval del formulario
  cliente?:Cliente = {
    ubigeo: {
      idUbigeo: -1,
      departamento:"-1",
      provincia: "-1",
      distrito: "-1", 
    }
  }

  constructor(private ubigeoService:UbigeoService, private ClienteService:ClienteService) { 
    this.ubigeoService.listarDepartamento().subscribe(
      (x) => this.departamentos = x
    );
  }

  cargaProvincia(){
    console.log(">>> cargaProvincia >> departamento >> " + this.cliente?.ubigeo?.departamento);
    this.ubigeoService.listaProvincias(this.cliente?.ubigeo?.departamento).subscribe(
          (x) => this.provincias = x
    );
    this.distritos =[];
    this.cliente!.ubigeo!.idUbigeo = -1;
    this.cliente!.ubigeo!.provincia = "-1";
}

cargaDistritos(){
  console.log(">>> cargaDistritos >> departamento >> " + this.cliente?.ubigeo?.departamento);
  console.log(">>> cargaDistritos >> provincia >> " + this.cliente?.ubigeo?.provincia);
  this.ubigeoService.listaDistritos(this.cliente?.ubigeo?.departamento,this.cliente?.ubigeo?.provincia).subscribe(
        (x) => this.distritos = x
  );
  this.cliente!.ubigeo!.idUbigeo = -1;
}

insertado(){
  this.ClienteService.insertaCliente(this.cliente).subscribe(
    (x) => alert(x.mensaje)
  );
}

  ngOnInit(): void {
  }
}
