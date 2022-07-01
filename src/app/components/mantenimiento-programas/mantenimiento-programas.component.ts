import { Component, OnInit } from "@angular/core";
import { CategoriaPrograma } from "src/app/models/tb_cateprogram.model";
import { Programa } from "src/app/models/tb_programa.model";
import { CategoriaService } from "src/app/services/categoria.service";
import { ProgramaService } from "src/app/services/programa.service";
import Swal from "sweetalert2";

@Component({
    selector: 'app-crud-producto',
    templateUrl: './mantenimiento-programas.component.html',
    styleUrls: ['./mantenimiento-programas.component.css']
  })

export class MantenimientoProgramas implements OnInit{

    categoria: CategoriaPrograma [] = [];
    idCatePrograma: String = "-1";
    programapc: Programa [] = [];

    programaspc: Programa = {
      idCatePrograma:{
        idCatePrograma: -1
      }
    };

    constructor(private categoriaService: CategoriaService, private programaService: ProgramaService){
      this.categoriaService.listaCategoria().subscribe(
        response => this.categoria = response
      )
    }

    consulta(){
      this.programaService.listaCategoria(this.idCatePrograma == ""?"-1":this.idCatePrograma).subscribe(
        (x) => this.programapc = x
      )
    }

    busca(aux :Programa){
      this.programaspc = aux;
    }

    actualiza(){
      this.programaService.actualizaPrograma(this.programaspc).subscribe(
        (x) => {
          document.getElementById("btn_act_cerrar")?.click();
          Swal.fire("Mensaje", x.mensaje, 'success');
          this.programaService.listaCategoria(this.idCatePrograma==""?"-1":this.idCatePrograma).subscribe(
            (x) => this.programaspc = x
          );
        }
      );
    }

    elimina(aux:Programa){
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
          this.programaService.eliminaPrograma(aux.id_programa).subscribe(
            (x) => {
              Swal.fire("Mensaje", x.mensaje, 'success');
              this.programaService.listaCategoria(this.idCatePrograma==""?"-1":this.idCatePrograma).subscribe(
                (x) => this.programaspc = x
              );
            }
          );
        }
      })
    }

    ngOnInit(): void {
    }
}