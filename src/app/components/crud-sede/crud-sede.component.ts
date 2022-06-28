import { Component, OnInit } from '@angular/core';
import { Pais } from 'src/app/models/pais.model';
import { Sede } from 'src/app/models/sede.model';
import { SedeService } from 'src/app/services/sede.service';
import { PaisService } from 'src/app/services/pais.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crud-sede',
  templateUrl: './crud-sede.component.html',
  styleUrls: ['./crud-sede.component.css']
})
export class CrudSedeComponent implements OnInit {

  iso: string[] = [];
  nombre: string[] = [];
  paises: Pais[] = [];
  nompaises: string[] = [];
  filtro: String ="";
  sedes: Sede [] = [];


  sede: Sede = { 
    pais:{
      idPais: -1,
      iso:"-1",
      nombre:"-1",
    }
  };

  formsR = new FormGroup({
    validaNombre : new FormControl('', [Validators.required,Validators.pattern('[a-zñA-Z ]{3,45}')]),
    validaDireccion: new FormControl('',[Validators.required,Validators.pattern('[a-zñA-Z0-9 ]{3,30}')]),
    validaCodigoPostal: new FormControl('',[Validators.required, Validators.pattern('[0-9]{5}')]),
    validaPais: new FormControl('', [Validators.min(1)]),
  });

  formsA = new FormGroup({
    validaNombre : new FormControl('', [Validators.required,Validators.pattern('[a-zñA-Z ]{3,45}')]),
    validaDireccion: new FormControl('',[Validators.required,Validators.pattern('[a-zñA-Z0-9 ]{3,30}')]),
    validaCodigoPostal: new FormControl('',[Validators.required, Validators.pattern('[0-9]{5}')]),
    validaPais: new FormControl('', [Validators.min(1)]),
  });

  submitted = false;


  constructor(private sedeService:SedeService, private paisService:PaisService) { 
    this.paisService.listaPais().subscribe(
      response => this.paises = response
  );      
  }

  
  ngOnInit(): void {
  }

  registra(){
    this.submitted = true;

    //if(this.formsR.invalid){
     // return;
    //}
    
    //console.log(this.sede);
    this.sedeService.registraSede(this.sede).subscribe(
      (x) => {
       
        document.getElementById("btn_reg_cerrar")?.click();
        Swal.fire("Mensaje", x.mensaje, 'success')
        this.sedeService.ConsultaSede(this.filtro==""?"todos":this.filtro).subscribe(
          (x) => this.sedes = x
        );
      } 
    );

    this.submitted = false;
    //limpiar los comobobox
       
    //limpiar los componentes del formulario a través de los ngModel
    
    this.sede = { 
      idSede:0,
      nombre:"",
      direccion:"",
      estado: 1,
      codigoPostal:"",
      pais: {
        idPais: -1,
        iso:"-1",
        nombre:"-1"
      }
    }
  }

  consulta(){
    this.sedeService.ConsultaSede(this.filtro == ""?"todos":this.filtro).subscribe(
      (x) => this.sedes = x
    )
  }

  busca(aux :Sede){
    this.sede = aux;
  }

  actualiza(){
    this.submitted = true;
  
    //finaliza el método si hay un error
    if (this.formsA.invalid){
      return;
    }
  
    this.submitted = false;
  
    this.sedeService.actualizaSede(this.sede).subscribe(
          (x) => {
            document.getElementById("btn_act_cerrar")?.click();
            Swal.fire("Mensaje", x.mensaje, 'success');
            this.sedeService.ConsultaSede(this.filtro==""?"todos":this.filtro).subscribe(
              (x) => this.sedes = x
            );
          } 
    );

    this.submitted=false;

  
    //limpiar los componentes del formulario a través de los ngModel
  
    this.sede= { 
      idSede: 0,
      nombre:"",
      direccion:"",
      estado: 1,
      codigoPostal:"",
      pais: {
        idPais: -1,
        iso:"",
        nombre:""
      }
    }
  }

  actualizaEstado(aux : Sede){
    aux.estado = aux.estado == 0? 1 :0;
    this.sedeService.actualizaSede(aux).subscribe();
  }

  elimina(aux:Sede){
    Swal.fire({
      title: 'Estas seguro?',
      text: "No podras revertir los cambios",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminalo'
    }).then((result) => {
      if (result.isConfirmed) {
        this.sedeService.eliminaSede(aux.idSede).subscribe(
          (x) => {
            Swal.fire(
              "Mensaje",
              x.mensaje,
              'success'
            );         
            this.sedeService.ConsultaSede(this.filtro==""?"todos":this.filtro).subscribe(
              (x) => this.sedes = x
            );
          }
        );


      }
    })


  }


}
