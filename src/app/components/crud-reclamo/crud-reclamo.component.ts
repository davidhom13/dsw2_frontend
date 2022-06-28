import { Component, OnInit } from '@angular/core';
import { TipoReclamo } from 'src/app/models/tipo-reclamo.model';
import { Cliente } from 'src/app/models/cliente.model';
import { Reclamo } from 'src/app/models/reclamo.model';
import { Ubigeo } from 'src/app/models/ubigeo.model';
import { TipoReclamoService } from 'src/app/services/tipo-reclamo.service';
import { ClienteService } from 'src/app/services/cliente.service';
import { ReclamoService } from 'src/app/services/reclamo.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-crud-reclamo',
  templateUrl: './crud-reclamo.component.html',
  styleUrls: ['./crud-reclamo.component.css']
})
export class CrudReclamoComponent implements OnInit {
  descripcion: string = "";
  idCliente: number = -1;
  idTipoReclamo: number = -1;
  estados:boolean=true;
  submitted = false;
  reclamos: Reclamo[] = [];

  reclamo: Reclamo = { 
    tipoReclamo:{
      idTipoReclamo: -1,
      descripcion:"-1",
      estado:-1
    },
    cliente:{
      idCliente: -1,
      nombres:"-1",
      apellidos:"-1", 
      fechaNacimiento:new Date(),
      dni:"-1", 
      correo:"-1",
      direccion: "-1", 
      estado:-1,
      ubigeo:new Ubigeo()
    }
  };


  filtro: string ="";
  clientes: Cliente[] = [];

  tiposReclamo: TipoReclamo[] = [];

  formsRegistra = new FormGroup({
    validaDescripcion: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]{3,30}')]),
    validaFechaCompra: new FormControl('', [Validators.required]),
    validaCliente: new FormControl('', [Validators.min(1)]),
    validaTipoReclamo: new FormControl('', [Validators.min(1)]),
});

formsActualiza = new FormGroup({
  validaDescripcion: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]{3,30}')]),
  validaFechaCompra: new FormControl('', [Validators.required]),
  validaCliente: new FormControl('', [Validators.min(1)]),
  validaTipoReclamo: new FormControl('', [Validators.min(1)]),
  validaEstado: new FormControl('', [Validators.min(1)]),
});


  constructor(private reclamoService:ReclamoService, private clienteService:ClienteService, private tipoReclamoService:TipoReclamoService) { 
    clienteService.listaCliente().subscribe(
      response => this.clientes = response
    );
    tipoReclamoService.listaTipoReclamo().subscribe(
      response => this.tiposReclamo = response
    );
  }
  consulta(){
    this.reclamoService.ConsultaReclamo(this.filtro==""?"todos":this.filtro).subscribe(
          (x) => {
            this.reclamos = x;
            console.log(this.reclamos);
          }
    );
  }
  buscar(aux :Reclamo){
    this.reclamo  = aux;
  }

  
  registraReclamo(){
  this.submitted = true;

   if (this.formsRegistra.invalid){
    return;
   }
   
   this.submitted = false;

   this.reclamoService.registrar(this.reclamo).subscribe(
         (x) => {
           document.getElementById("btn_reg_cerrar")?.click();
           alert(x.mensaje);
           this.reclamoService.ConsultaReclamo(this.filtro==""?"todos":this.filtro).subscribe(
                   (x) => this.reclamos = x
           );
         } 
   );
  
this.reclamo = { 
    tipoReclamo:{
      idTipoReclamo: -1,
      descripcion:"-1",
      estado:-1
    },
    cliente:{
      idCliente: -1,
      nombres:"-1",
      apellidos:"-1", 
      fechaNacimiento:new Date(),
      dni:"-1", 
      correo:"-1",
      direccion: "-1", 
      estado:-1,
      ubigeo:new Ubigeo()
    }
  };
}
  
actualiza(){
  this.submitted = true;

  //finaliza el método si hay un error
  if (this.formsActualiza.invalid){
   return;
  }

  this.submitted = false;

  this.reclamoService.actualizaReclamo(this.reclamo).subscribe(
        (x) => {
          document.getElementById("btn_act_cerrar")?.click();
          alert(x.mensaje);
          this.reclamoService.ConsultaReclamo(this.filtro==""?"todos":this.filtro).subscribe(
                  (x) => this.reclamos = x
          );
        } 
  );

  this.reclamo = { 
    tipoReclamo:{
      idTipoReclamo: -1,
      descripcion:"-1",
      estado:-1
    },
    cliente:{
      idCliente: -1,
      nombres:"-1",
      apellidos:"-1", 
      fechaNacimiento:new Date(),
      dni:"-1", 
      correo:"-1",
      direccion: "-1", 
      estado:-1,
      ubigeo:new Ubigeo()
    }
  };
}
  
elimina(aux:Reclamo){


  this.reclamoService.eliminaReclamo(aux.idReclamo).subscribe(

        (x) => {

          alert(x.mensaje);

          this.reclamoService.ConsultaReclamo(this.filtro==""?"todos":this.filtro).subscribe(

                  (x) => this.reclamos = x

          );

        }



  );

}
  ngOnInit(): void {
  }

}
