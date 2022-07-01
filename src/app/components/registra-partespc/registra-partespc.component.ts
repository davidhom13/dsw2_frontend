import { Component, OnInit } from "@angular/core";
import { PartesPc } from "src/app/models/tb_partespc.model";
import { TipoPartes } from "src/app/models/tb_tipopartes.model";
import { PartesPcService } from "src/app/services/partespc.service";
import { TipoService } from "src/app/services/tipo.service";

@Component({
    selector: 'app-registra-partespc',
    templateUrl: './registra-partespc.component.html',
    styleUrls: ['./registra-partespc.component.css']
  })

  export class RegistraPartesPc implements OnInit{

    tipo: TipoPartes [] = [];

    partespc: PartesPc = {
      id_tipopartes:{
        id_tipopartes: -1
      }
    };
    
    constructor(private tipoService: TipoService, private partespcService: PartesPcService){
      this.tipoService.listaTipo().subscribe(
        (x) => this.tipo = x
      )
    }

    registraPartesPc(){
      console.log(this.partespc);
      this.partespcService.registrar(this.partespc).subscribe(
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