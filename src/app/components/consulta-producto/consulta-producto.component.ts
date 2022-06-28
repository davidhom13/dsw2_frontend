import { Component, OnInit } from '@angular/core';
import { Pais } from 'src/app/models/pais.model';
import { Marca } from 'src/app/models/marca.model';
import { Producto } from 'src/app/models/producto.model';
import { MarcaService } from 'src/app/services/marca.service';
import { PaisService } from 'src/app/services/pais.service';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-consulta-producto',
  templateUrl: './consulta-producto.component.html',
  styleUrls: ['./consulta-producto.component.css']
})
export class ConsultaProductoComponent implements OnInit {

  nombre: string = "";
  serie: string = "";
  selpais: number = -1;
  selmarca: number = -1;
  estados: boolean = true;

  Pais: string[] = [];
  paises: Pais[] = [];

  Marca: string[] = [];
  marcas: Marca[] = [];

  producto: Producto = {
    pais:{
      idPais: -1,
      iso: "-1",
      nombre: "-1",
    },
    marca:{
      idMarca: -1,
      nombre: "-1"
    }
  };
  productos: Producto[] = [];

  constructor(private productoService:ProductoService, private paisService:PaisService, private marcaService:MarcaService) {
      paisService.listaPais().subscribe(
        response => this.paises = response
      );
      marcaService.listaMarca().subscribe(
        response => this.marcas = response
      );
   }

   consultaProducto(){
     this.productoService.listaProducto(this.nombre, this.serie, this.selpais, this.selmarca, this.estados?1:0).subscribe(
        (x) => {
          this.productos = x.lista;
          alert(x.mensaje);
        }
     );
   }

  ngOnInit(): void {
  }

}
