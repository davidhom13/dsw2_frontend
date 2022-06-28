import { Component, OnInit } from '@angular/core';
import { Marca } from 'src/app/models/marca.model';
import { Pais } from 'src/app/models/pais.model';
import { Producto } from 'src/app/models/producto.model';
import { MarcaService } from 'src/app/services/marca.service';
import { PaisService } from 'src/app/services/pais.service';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-registra-producto',
  templateUrl: './registra-producto.component.html',
  styleUrls: ['./registra-producto.component.css']
})
export class RegistraProductoComponent implements OnInit {

  marcas: Marca [] = [];
  pais: Pais [] = [];

  producto: Producto = {
    marca:{
      idMarca: -1
    },
    pais:{
      idPais: -1
    }
  };

  constructor(private productoService: ProductoService, private paisService: PaisService, private marcaService: MarcaService){
    this.marcaService.listaMarca().subscribe(
      (x) => this.marcas = x
    );
    this.paisService.listaPais().subscribe(
      (x) => this.pais = x
    );
  }

  registraProducto(){
    console.log(this.producto);
     this.productoService.registrar(this.producto).subscribe(
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
