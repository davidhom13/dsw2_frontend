import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppSettings } from '../app.settings';
import { Cliente } from '../models/cliente.model';

const baseUrlUtil = AppSettings.API_ENDPOINT+ '/util';
const baseUrlCliente = AppSettings.API_ENDPOINT+ '/cliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  constructor(private http:HttpClient) { }



  

  insertaCliente(cliente:any): Observable<any>{
    return this.http.post(baseUrlCliente, cliente);
  }
//holamundo8

    listaCliente():Observable<Cliente[]>{
  return this.http.get<Cliente[]>(baseUrlUtil+"/listaCliente");
}

    listaCliente2(nombres: string, apellidos: string, dni: string, idUbigeo: number, estado:number):Observable<any>{
      const params = new HttpParams().set("nombres", nombres).set("apellidos", apellidos).set("dni", dni).set("idUbigeo", idUbigeo).set("estado",estado);
  return this.http.get<any>(baseUrlCliente+"/listaClienteConParametros",{params});

}

/////////crud////










ConusultaCliente(filtro:string):Observable<Cliente[]> {
  return this.http.get<Cliente[]>(baseUrlCliente + "/listaClientePorNombreLike/"+ filtro);
}  

registraCliente(obj: Cliente): Observable<any>{
  return this.http.post(baseUrlCliente+ "/registraCliente", obj);
}

actualizaCliente(obj: Cliente): Observable<any>{
return this.http.put(baseUrlCliente + "/actualizaCliente", obj);
}

eliminaCliente(id: any): Observable<any>{
  return this.http.delete(baseUrlCliente + "/eliminaCliente/" + id);
}

















}













