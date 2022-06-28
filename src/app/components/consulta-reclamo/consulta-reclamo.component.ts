import { Component, OnInit } from '@angular/core';
import { TipoReclamo } from 'src/app/models/tipo-reclamo.model';
import { Cliente } from 'src/app/models/cliente.model';
import { Reclamo } from 'src/app/models/reclamo.model';
import { TipoReclamoService } from 'src/app/services/tipo-reclamo.service';
import { ClienteService } from 'src/app/services/cliente.service';
import { ReclamoService } from 'src/app/services/reclamo.service';
@Component({
  selector: 'app-consulta-reclamo',
  templateUrl: './consulta-reclamo.component.html',
  styleUrls: ['./consulta-reclamo.component.css']
})
export class ConsultaReclamoComponent implements OnInit {

  descripcion: string = "";
  idCliente: number = -1;
  idTipoReclamo: number = -1;
  estados:boolean=true;

  reclamos: Reclamo[] = [];

  clientes: Cliente[] = [];

  tiposReclamo: TipoReclamo[] = [];

  constructor(private reclamoService:ReclamoService, private clienteService:ClienteService, private tipoReclamoService:TipoReclamoService) { 
    clienteService.listaCliente().subscribe(
      response => this.clientes = response
    );
    tipoReclamoService.listaTipoReclamo().subscribe(
      response => this.tiposReclamo = response
    );
  }



  consultaReclamos(){
    this.reclamoService.listaReclamo(this.descripcion, this.estados, this.idCliente,this.idTipoReclamo).subscribe(
          (x) => {
              this.reclamos = x.lista;
              alert(x.mensaje);
          }
    );
  }

  ngOnInit(): void {
  }

}
