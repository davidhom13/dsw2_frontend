import { Component, OnInit } from "@angular/core";
import { PartesPc } from "src/app/models/tb_partespc.model";
import { TipoPartes } from "src/app/models/tb_tipopartes.model";
import { PartesPcService } from "src/app/services/partespc.service";
import { TipoService } from "src/app/services/tipo.service";
import Swal from "sweetalert2";

@Component({
    selector: 'app-mantenimiento-partespc',
    templateUrl: './mantenimiento-partespc.component.html',
    styleUrls: ['./mantenimiento-partespc.component.css']
  })

  export class MantenimientoPartesPc implements OnInit{

    tipo: TipoPartes [] = [];
    id_tipopartes: String = "-1";
    partepc: PartesPc [] = [];

    partespc: PartesPc = {
      id_tipopartes:{
        id_tipopartes: -1
      }
    };

    constructor(private tipoService: TipoService, private partespcService: PartesPcService){
      this.tipoService.listaTipo().subscribe(
        response => this.tipo = response
      )
    }

    consulta(){
      this.partespcService.listaTipo(this.id_tipopartes == ""?"-1":this.id_tipopartes).subscribe(
        (x) => this.partepc = x
      )
    }

    busca(aux :PartesPc){
      this.partespc = aux;
    }

    actualiza(){
      this.partespcService.actualizaPartes(this.partespc).subscribe(
        (x) => {
          document.getElementById("btn_act_cerrar")?.click();
          Swal.fire("Mensaje", x.mensaje, 'success');
          this.partespcService.listaTipo(this.id_tipopartes==""?"-1":this.id_tipopartes).subscribe(
            (x) => this.partespc = x
          );
        }
      );

      //this.partespc = {
      //  id_partes:0,
      //  id_tipopartes:{
      //    id_tipopartes:0,
      //    desc_tipopartes:""
      //  },
      //  nom_partes:"",
      //  precio_partes:0
      //}
    }

    elimina(aux:PartesPc){
      Swal.fire({
        title: '¿Estás Seguro?',
        text: "No se puede revertir los cambios",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: '¡Sí, elimínalo!'
      }).then((result) => {
        if (result.isConfirmed){
          this.partespcService.eliminaPartes(aux.id_partes).subscribe(
            (x) => {
              Swal.fire("Mensaje", x.mensaje, 'success');
              this.partespcService.listaTipo(this.id_tipopartes==""?"-1":this.id_tipopartes).subscribe(
                (x) => this.partespc = x
              );
            }
          );
        }
      })
    }

    ngOnInit(): void {
    }
    
  }