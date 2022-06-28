import { Component, OnInit } from '@angular/core';
import { Proveedor } from 'src/app/models/proveedor.model';
import { Ubigeo } from 'src/app/models/ubigeo.model';
import { ProveedorService } from 'src/app/services/proveedor.service';
import { UbigeoService } from 'src/app/services/ubigeo.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-crud-proveedor',
  templateUrl: './crud-proveedor.component.html',
  styleUrls: ['./crud-proveedor.component.css']
})

export class CrudProveedorComponent implements OnInit {
  departamentos: string[] = [];
  provincias: string[] = [];
  distritos: Ubigeo[] = [];
  filtro: String ="";
  proveedores: Proveedor [] = [];


 proveedor: Proveedor = { 
   ubigeo:{
     idUbigeo: -1,
     departamento:"-1",
     provincia:"-1",
     distrito:"-1",
   }
 };

 forms = new FormGroup({
  validaRazon : new FormControl('', [Validators.required,Validators.pattern('[a-zA-Z0-9 ]{3,40}')]),
  validaRUC: new FormControl('',[Validators.required, Validators.pattern('[0-9]{11}')]),
  validaDireccion: new FormControl('',[Validators.required,Validators.pattern('[a-zA-Z0-9 ]{10,200}')]),
  validaTelefono: new FormControl('',[Validators.required, Validators.pattern('[0-9]{7}')]),
  validaCelular: new FormControl('',[Validators.required, Validators.pattern('[0-9]{9}')]),
  validaContacto: new FormControl('',[Validators.required,Validators.pattern('[a-zA-Z ]{10,80}')]),
  validaDepartamento: new FormControl('', [Validators.min(1)]),
  validaProvincia: new FormControl('', [Validators.min(1)]),
  validaDistrito: new FormControl('', [Validators.min(1)]),
});

forms2 = new FormGroup({
  validaRazon : new FormControl('', [Validators.required,Validators.pattern('[a-zA-Z0-9]{3,40}')]),
  validaRUC: new FormControl('',[Validators.required, Validators.pattern('[0-9]{11}')]),
  validaDireccion: new FormControl('',[Validators.required,Validators.pattern('[a-zA-Z0-]{10,200}')]),
  validaTelefono: new FormControl('',[Validators.required, Validators.pattern('[0-9]{7}')]),
  validaCelular: new FormControl('',[Validators.required, Validators.pattern('[0-9]{9}')]),
  validaContacto: new FormControl('',[Validators.required,Validators.pattern('[a-zA-Z ]{10,80}')]),
  validaDepartamento: new FormControl('', [Validators.min(1)]),
  validaProvincia: new FormControl('', [Validators.min(1)]),
  validaDistrito: new FormControl('', [Validators.min(1)]),
});

submitted = false;

 constructor(private proveedorService:ProveedorService, private ubigeoService:UbigeoService) {
   this.ubigeoService.listarDepartamento().subscribe(
       response => this.departamentos = response
   );            
 }
 
 listaProvincia(){
   this.ubigeoService.listaProvincias(this.proveedor.ubigeo?.departamento).subscribe(
     response =>  this.provincias= response
   );
 }
 
 listaDistrito(){
   this.ubigeoService.listaDistritos(this.proveedor.ubigeo?.departamento, this.proveedor.ubigeo?.provincia).subscribe(
     response =>  this.distritos= response
   );
 }
 
 registra(){
  this.submitted = true;

  if(this.forms.invalid){
  return;
  }

  this.proveedorService.registraProveedor(this.proveedor).subscribe(
        (x) => {
          document.getElementById("btn_reg_cerrar")?.click();
          Swal.fire("Mensaje", x.mensaje, 'success');
          this.proveedorService.ConsultaProveedor(this.filtro==""?"todos":this.filtro).subscribe(
                  (x) => this.proveedores = x
          );
        } 
  );
  this.submitted = false;
   //limpiar los comobobox
  this.distritos = [];
  this.provincias = [];

  //limpiar los componentes del formulario a través de los ngModel

  this.proveedor = { 
      idProveedor:0,
      razonsocial:"",
      ruc:"",
      direccion:"",
      telefono:"",
      celular:"",
      contacto:"",

      estado:1,
      ubigeo:{
        idUbigeo: -1,
        departamento:"-1",
        provincia:"-1",
        distrito:"-1",
      }
  }
}

consulta(){
  this.proveedorService.ConsultaProveedor(this.filtro == ""?"todos":this.filtro).subscribe(
    (x) => this.proveedores = x
  )
}

busca(aux :Proveedor){
  this.proveedor = aux;

  this.ubigeoService.listaProvincias(this.proveedor.ubigeo?.departamento).subscribe(
    response =>  this.provincias= response
  );

  this.ubigeoService.listaDistritos(this.proveedor.ubigeo?.departamento, this.proveedor.ubigeo?.provincia).subscribe(
     response =>  this.distritos= response
  );
}

actualiza(){
  this.submitted = true;

  //finaliza el método si hay un error
  if (this.forms2.invalid){
   return;
  }

  this.submitted = false;

  this.proveedorService.actualizaProveedor(this.proveedor).subscribe(
        (x) => {
          document.getElementById("btn_act_cerrar")?.click();
          Swal.fire("Mensaje", x.mensaje, 'success');
          this.proveedorService.ConsultaProveedor(this.filtro==""?"todos":this.filtro).subscribe(
                  (x) => this.proveedores = x
          );
        } 
  );
this.submitted=false;
  //limpiar los comobobox
this.distritos = [];
this.provincias = [];

//limpiar los componentes del formulario a través de los ngModel

this.proveedor = { 
      idProveedor:0,
      razonsocial:"",
      ruc:"",
      direccion:"",
      telefono:"",
      celular:"",
      contacto:"",

      estado:1,
      ubigeo:{
        idUbigeo: -1,
        departamento:"-1",
        provincia:"-1",
        distrito:"-1",
      }
}
      }

actualizaEstado(aux : Proveedor){
  aux.estado = aux.estado == 0? 1 :0;
  this.proveedorService.actualizaProveedor(aux).subscribe();
}

elimina(aux:Proveedor){
  Swal.fire({
    title: '¿Estás Seguro?',
    text: "No se puede revertir los cambios",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: '¡Sí, elimínalo!'
  }).then((result) => {
          if (result.isConfirmed) {
             this.proveedorService.eliminaProveedor(aux.idProveedor).subscribe(
              (x) => {
                  Swal.fire("Mensaje", x.mensaje, 'success');
                  this.proveedorService.ConsultaProveedor(this.filtro==""?"todos":this.filtro).subscribe(
                          (x) => this.proveedores = x
                  );
                }
               );
          }
  })
}

 ngOnInit(): void {
 }

}

