import { Component, OnInit } from "@angular/core";
import { Marca } from "src/app/models/marca.model";
import { Pais } from "src/app/models/pais.model";
import { Producto } from "src/app/models/producto.model";

@Component({
    selector: 'app-crud-producto',
    templateUrl: './mantenimiento-programas.component.html',
    styleUrls: ['./mantenimiento-programas.component.css']
  })

export class MantenimientoProgramas implements OnInit{
  Pais: string[] = [];
  paises: Pais[] = [];
  Marca: string[] = [];
  marcas: Marca[] = [];
  filtro: string = "";
  productos: Producto [] = [];

    ngOnInit(): void {
    }
}