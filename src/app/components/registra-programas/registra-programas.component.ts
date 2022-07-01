import { Component, OnInit } from "@angular/core";
import { CategoriaPrograma } from "src/app/models/tb_cateprogram.model";
import { Programa } from "src/app/models/tb_programa.model";
import { CategoriaService } from "src/app/services/categoria.service";
import { ProgramaService } from "src/app/services/programa.service";

@Component({
    selector: 'app-registra-programas',
    templateUrl: './registra-programas.component.html',
    styleUrls: ['./registra-programas.component.css']
  })

  export class RegistraProgramas implements OnInit{

    categoria: CategoriaPrograma [] = [];

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

    registraProgramas(){
      console.log(this.programaspc);
      this.programaService.registrar(this.programaspc).subscribe(
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