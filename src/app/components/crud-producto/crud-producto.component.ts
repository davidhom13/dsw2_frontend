import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Marca } from 'src/app/models/marca.model';
import { Pais } from 'src/app/models/pais.model';
import { Producto } from 'src/app/models/producto.model';
import { MarcaService } from 'src/app/services/marca.service';
import { PaisService } from 'src/app/services/pais.service';
import { ProductoService } from 'src/app/services/producto.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crud-producto',
  templateUrl: './crud-producto.component.html',
  styleUrls: ['./crud-producto.component.css']
})
export class CrudProductoComponent implements OnInit {

  selpais: number = -1;
  selmarca: number = -1;

  Pais: string[] = [];
  paises: Pais[] = [];
  Marca: string[] = [];
  marcas: Marca[] = [];
  filtro: string = "";
  productos: Producto [] = [];

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

  forms = new FormGroup({
    validaNombre : new FormControl('', [Validators.required,Validators.pattern('[a-z A-Z 0-9]{2,45}')]),
    validaSerie : new FormControl('', [Validators.required,Validators.pattern('[a-zA-Z0-9]{2,45}')]),
    validaDurabilidad : new FormControl('', [Validators.required,Validators.pattern('[a-zA-Z0-9]{2,45}')]),
    validaPrecio : new FormControl('', [Validators.required,Validators.pattern('[0-9]+.?[0-9]{0,10}')]),
    validaStock : new FormControl('', [Validators.required,Validators.pattern('[0-9]{1,300}')]),
    validaMarca: new FormControl('', [Validators.min(1)]),
    validaPais: new FormControl('', [Validators.min(1)]),
  });

  forms2 = new FormGroup({
    validaNombre : new FormControl('', [Validators.required,Validators.pattern('[a-z A-Z 0-9]{2,45}')]),
    validaSerie : new FormControl('', [Validators.required,Validators.pattern('[a-zA-Z0-9]{2,45}')]),
    validaDurabilidad : new FormControl('', [Validators.required,Validators.pattern('[a-zA-Z0-9]{2,45}')]),
    validaPrecio : new FormControl('', [Validators.required,Validators.pattern('[0-9]+.?[0-9]{0,10}')]),
    validaStock : new FormControl('', [Validators.required,Validators.pattern('[0-9]{1,300}')]),
    validaMarca: new FormControl('', [Validators.min(1)]),
    validaPais: new FormControl('', [Validators.min(1)]),
  });

  submitted = false;

  constructor(private productoService: ProductoService, private paisService: PaisService, private marcaService: MarcaService) {
    this.paisService.listaPais().subscribe(
      response => this.paises = response
    );
    this.marcaService.listaMarca().subscribe(
      response => this.marcas = response
    );
  }

  registra(){
    this.submitted = true;
    if(this.forms.invalid){
      return;
    }
    this.productoService.registraProducto(this.producto).subscribe(
      (x) => {
        document.getElementById("btn_reg_cerrar")?.click();
        Swal.fire("Mensaje", x.mensaje, 'success');
        this.productoService.ConsultaProducto(this.filtro==""?"todos":this.filtro).subscribe(
          (x) => this.productos = x
        );
      }
    );
    this.submitted = false;
    this.paises = [];
    this.marcas = [];
    
    this.producto = {
      idProducto:0,
      nombre: "",
      serie: "",
      durabilidad: "",
      precio: 0,
      stock: 0,
      marca:{
        idMarca: -1,
        nombre: ""
      },
      pais:{
        idPais: -1,
        iso: "",
        nombre: "",
      },
      estado: 1
    }
  }

  consulta(){
    this.productoService.ConsultaProducto(this.filtro == ""?"todos":this.filtro).subscribe(
      (x) => this.productos = x
    )
  }

  busca(aux :Producto){
    this.producto = aux;
  }

  actualiza(){
    this.submitted = true;

    if (this.forms2.invalid){
      return;
    }

    //this.submitted = false;

    this.productoService.actualizaProducto(this.producto).subscribe(
      (x) => {
        document.getElementById("btn_act_cerrar")?.click();
        Swal.fire("Mensaje", x.mensaje, 'success');
        this.productoService.ConsultaProducto(this.filtro==""?"todos":this.filtro).subscribe(
          (x) => this.producto = x
        );
      }
    );
    this.submitted = false;
    this.paises = [];
    this.marcas = [];

    this.producto = {
      idProducto:0,
      nombre: "",
      serie: "",
      durabilidad: "",
      precio: 0,
      stock: 0,
      marca:{
        idMarca: -1,
        nombre: ""
      },
      pais:{
        idPais: -1,
        iso: "",
        nombre: "",
      },
      estado: 1
    }

  }

  actualizaEstado(aux : Producto){
    aux.estado = aux.estado == 0? 1 :0;
    this.productoService.actualizaProducto(aux).subscribe();
  }

  elimina(aux:Producto){
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
        this.productoService.eliminaProducto(aux.idProducto).subscribe(
          (x) => {
            Swal.fire("Mensaje", x.mensaje, 'success');
            this.productoService.ConsultaProducto(this.filtro==""?"todos":this.filtro).subscribe(
              (x) => this.producto = x
            );
          }
        );
      }
    })
  }

  ngOnInit(): void {
  }

}
