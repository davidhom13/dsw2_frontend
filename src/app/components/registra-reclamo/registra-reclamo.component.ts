import { Component, OnInit } from '@angular/core';
import { Reclamo } from 'src/app/models/reclamo.model';
import { TipoReclamo } from 'src/app/models/tipo-reclamo.model';
import { Cliente } from 'src/app/models/cliente.model';
import { Ubigeo } from 'src/app/models/ubigeo.model';
import { ReclamoService } from 'src/app/services/reclamo.service';
import { TipoReclamoService } from 'src/app/services/tipo-reclamo.service';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-registra-reclamo',
  templateUrl: './registra-reclamo.component.html',
  styleUrls: ['./registra-reclamo.component.css']
})
export class RegistraReclamoComponent implements OnInit {
  
  clientes: Cliente[] = [];
  tipoReclamos: TipoReclamo[] = [];

  reclamo: Reclamo = { 
    tipoReclamo:{
      idTipoReclamo: -1,
      descripcion:"-1",
      estado:-1
    },
    cliente:{
      idCliente: -1,
      nombres:"-1",
      apellidos:"-1", 
      fechaNacimiento:new Date(),
      dni:"-1", 
      correo:"-1",
      direccion: "-1", 
      estado:-1,
      ubigeo:new Ubigeo()
    }
  };

  constructor(private reclamoService:ReclamoService, private tipoReclamoService:TipoReclamoService, private clienteService:ClienteService) {
    this.tipoReclamoService.listaTipoReclamo().subscribe(
        response => this.tipoReclamos = response
    ); 
    this.clienteService.listaCliente().subscribe(
      response => this.clientes = response
  );            
  }

  registraReclamo(){
     this.reclamoService.registrar(this.reclamo).subscribe(
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

}
