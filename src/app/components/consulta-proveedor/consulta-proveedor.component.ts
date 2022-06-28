import { Component, OnInit } from '@angular/core';
import { Proveedor } from 'src/app/models/proveedor.model';
import { Ubigeo } from 'src/app/models/ubigeo.model';
import { ProveedorService } from 'src/app/services/proveedor.service';
import { UbigeoService } from 'src/app/services/ubigeo.service';

@Component({
  selector: 'app-consulta-proveedor',
  templateUrl: './consulta-proveedor.component.html',
  styleUrls: ['./consulta-proveedor.component.css']
})
export class ConsultaProveedorComponent implements OnInit {

  razon: string = "";
  rucs: string ="";
  seldepartamento:string= "-1";
  selprovincia:string= "-1";
  seldistrito:number= -1;
  estados:boolean=true;



  departamentos: string[] = [];
  provincias: string[] = [];
  distritos: Ubigeo[] = [];

 proveedor: Proveedor = { 
   ubigeo:{
     idUbigeo: -1,
     departamento:"-1",
     provincia:"-1",
     distrito:"-1",
   }
 };

 proveedores:Proveedor[]=[];

 constructor(private proveedorService:ProveedorService, private ubigeoService:UbigeoService) {
   ubigeoService.listarDepartamento().subscribe(
       response => this.departamentos = response
   );            
 }
 
 listaProvincia(){
   this.ubigeoService.listaProvincias(this.seldepartamento).subscribe(
     response =>  this.provincias= response
   );
   this.selprovincia ="-1";
   this.distritos=[];
   this.seldistrito=-1;
 }
 
 listaDistrito(){
   this.ubigeoService.listaDistritos(this.seldepartamento, this.selprovincia).subscribe(
     response =>  this.distritos= response
   );
   this.seldistrito=-1;
 }
 
 consultaProveedor(){
  this.proveedorService.listaProveedor(this.razon, this.rucs, this.seldistrito,this.estados?1:0).subscribe(
        (x) => {
            this.proveedores = x.lista;
            alert(x.mensaje);
        }
  );
}

  ngOnInit(): void {
  }

}
