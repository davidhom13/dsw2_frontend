import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Proveedor } from '../models/proveedor.model';
import { AppSettings } from '../app.settings';

const baseUrlUtil = AppSettings.API_ENDPOINT+ '/util';
const baseUrlProveedor = AppSettings.API_ENDPOINT+ '/proveedor';
const baseUrlCrud = AppSettings.API_ENDPOINT+ '/crudProveedor';

@Injectable({
  providedIn: 'root'
})
export class ProveedorService {

  constructor(private http: HttpClient) { }
      
  registrar(data:Proveedor): Observable<any>{
    return this.http.post(baseUrlProveedor, data);
  }

  listaProveedor(razonsocial:string, ruc:string, idUbigeo:number,estado:number ):Observable<any> {
    const params = new HttpParams().set("razonsocial", razonsocial).set("ruc", ruc).set("idUbigeo", idUbigeo).set("estado",estado);  
    return this.http.get<any>(baseUrlProveedor + "/listaProveedorConParametros", {params});
 }

 ConsultaProveedor(filtro : any) : Observable<any>{
  return this.http.get(baseUrlCrud + "/listaProveedorPorRazonLike/" + filtro);
}

registraProveedor(aux: Proveedor): Observable<any>{
  return this.http.post(baseUrlCrud + "/registraProveedor", aux);
}

actualizaProveedor(aux: Proveedor): Observable<any>{
  return this.http.put(baseUrlCrud + "/actualizaProveedor", aux);
}

eliminaProveedor(id: any): Observable<any>{
  return this.http.delete(baseUrlCrud + "/eliminaProveedor/"+ id);
}

}
